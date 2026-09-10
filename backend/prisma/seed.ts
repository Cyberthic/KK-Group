import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is missing in environment variables.');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding initial Super Admin...');

  const email = (
    process.env.SUPER_ADMIN_EMAIL || 'admin@kkgroup.com'
  ).toLowerCase();
  const username = process.env.SUPER_ADMIN_USERNAME || 'superadmin';
  const rawPassword = process.env.SUPER_ADMIN_PASSWORD || 'AdminPassword@123';

  // Check if super admin exists by role or email or username
  const existingAdmin = await prisma.user.findFirst({
    where: {
      OR: [
        { role: 'SUPER_ADMIN' },
        { email },
        { username },
      ],
    },
  });

  if (existingAdmin) {
    console.log(
      `Super Admin already exists with ID: ${existingAdmin.id} (username: ${existingAdmin.username}, email: ${existingAdmin.email}). Skipping creation.`,
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
      isActive: true,
    },
  });

  console.log('--------------------------------------------------');
  console.log('Super Admin successfully seeded!');
  console.log(`ID:       ${admin.id}`);
  console.log(`Email:    ${admin.email}`);
  console.log(`Username: ${admin.username}`);
  console.log(`Password: ${rawPassword}`);
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
