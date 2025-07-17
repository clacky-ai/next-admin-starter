'use server';

import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  User,
  users,
  activityLogs,
  type NewUser,
  type NewActivityLog,
  ActivityType
} from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUser } from '@/lib/db/queries';

async function logActivity(
  userId: number,
  type: ActivityType,
  ipAddress?: string
) {
  const newActivity: NewActivityLog = {
    userId,
    action: type,
    ipAddress: ipAddress || ''
  };
  await db.insert(activityLogs).values(newActivity);
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export async function signIn(prevState: any, formData: FormData) {
  const formDataEntries = Object.fromEntries(formData.entries());
  const result = signInSchema.safeParse(formDataEntries);
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }
  
  const { email, password } = result.data;

  const foundUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (foundUsers.length === 0) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  const foundUser = foundUsers[0];

  const isPasswordValid = await comparePasswords(
    password,
    foundUser.passwordHash
  );

  if (!isPasswordValid) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  await Promise.all([
    setSession(foundUser),
    logActivity(foundUser.id, ActivityType.SIGN_IN)
  ]);

  redirect('/admin/dashboard');
}

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function signUp(prevState: any, formData: FormData) {
  const formDataEntries = Object.fromEntries(formData.entries());
  const result = signUpSchema.safeParse(formDataEntries);
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }
  
  const { email, password } = result.data;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      error: 'Failed to create user. Please try again.',
      email,
      password
    };
  }

  const passwordHash = await hashPassword(password);

  const newUser: NewUser = {
    email,
    passwordHash,
    role: 'admin'
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return {
      error: 'Failed to create user. Please try again.',
      email,
      password
    };
  }

  await Promise.all([
    logActivity(createdUser.id, ActivityType.SIGN_UP),
    setSession(createdUser)
  ]);

  redirect('/admin/dashboard');
}

export async function signOut() {
  const user = (await getUser()) as User;
  if (user) {
    await logActivity(user.id, ActivityType.SIGN_OUT);
  }
  (await cookies()).delete('session');
}

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(100),
  newPassword: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100)
});

export async function updatePassword(prevState: any, formData: FormData) {
  const user = await getUser();
  if (!user) {
    return { error: 'User not authenticated' };
  }
  
  const formDataEntries = Object.fromEntries(formData.entries());
  const result = updatePasswordSchema.safeParse(formDataEntries);
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }
  
  const { currentPassword, newPassword, confirmPassword } = result.data;

  const isPasswordValid = await comparePasswords(
    currentPassword,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return {
      currentPassword,
      newPassword,
      confirmPassword,
      error: 'Current password is incorrect.'
    };
  }

  if (currentPassword === newPassword) {
    return {
      currentPassword,
      newPassword,
      confirmPassword,
      error: 'New password must be different from the current password.'
    };
  }

  if (confirmPassword !== newPassword) {
    return {
      currentPassword,
      newPassword,
      confirmPassword,
      error: 'New password and confirmation password do not match.'
    };
  }

  const newPasswordHash = await hashPassword(newPassword);

  await Promise.all([
    db
      .update(users)
      .set({ passwordHash: newPasswordHash })
      .where(eq(users.id, user.id)),
    logActivity(user.id, ActivityType.UPDATE_PASSWORD)
  ]);

  return {
    success: 'Password updated successfully.'
  };
}

const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100)
});

export async function deleteAccount(prevState: any, formData: FormData) {
  const user = await getUser();
  if (!user) {
    return { error: 'User not authenticated' };
  }
  
  const formDataEntries = Object.fromEntries(formData.entries());
  const result = deleteAccountSchema.safeParse(formDataEntries);
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }
  
  const { password } = result.data;

  const isPasswordValid = await comparePasswords(password, user.passwordHash);
  if (!isPasswordValid) {
    return {
      password,
      error: 'Incorrect password. Account deletion failed.'
    };
  }

  await logActivity(user.id, ActivityType.DELETE_ACCOUNT);

  // Soft delete
  await db
    .update(users)
    .set({
      deletedAt: sql`CURRENT_TIMESTAMP`,
      email: sql`CONCAT(email, '-', id, '-deleted')` // Ensure email uniqueness
    })
    .where(eq(users.id, user.id));

  (await cookies()).delete('session');
  redirect('/admin/login');
}

const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address')
});

export async function updateAccount(prevState: any, formData: FormData) {
  const user = await getUser();
  if (!user) {
    return { error: 'User not authenticated' };
  }
  
  const formDataEntries = Object.fromEntries(formData.entries());
  const result = updateAccountSchema.safeParse(formDataEntries);
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }
  
  const { name, email } = result.data;

  await Promise.all([
    db.update(users).set({ name, email }).where(eq(users.id, user.id)),
    logActivity(user.id, ActivityType.UPDATE_ACCOUNT)
  ]);

  return { name, success: 'Account updated successfully.' };
}