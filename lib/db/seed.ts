import { db } from './drizzle';
import { users } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function seed() {
  const email = 'admin@admin.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: "admin",
        name: "Administrator",
      },
    ])
    .returning();

  console.log('Admin user created with email:', email);
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });