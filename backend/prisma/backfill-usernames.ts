import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { resolveUniqueUsername } from '../src/common/utils/username.util';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is missing in environment variables.');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Backfilling Missing Usernames from Emails ---');

  // Find all users who either have null username or empty string username
  const usersToUpdate = await prisma.user.findMany({
    where: {
      OR: [
        { username: null },
        { username: '' },
      ],
      email: {
        not: null,
      },
    },
  });

  console.log(`Found ${usersToUpdate.length} user(s) needing a username.`);

  let updatedCount = 0;
  for (const user of usersToUpdate) {
    if (!user.email) continue;

    const newUsername = await resolveUniqueUsername(user.email, async (candidate) => {
      const existing = await prisma.user.findUnique({
        where: { username: candidate },
      });
      return !!existing && existing.id !== user.id;
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { username: newUsername },
    });

    console.log(
      `✓ Updated User ID: ${user.id} | Email: ${user.email} -> Assigned Username: @${newUsername}`,
    );
    updatedCount++;
  }

  console.log(`Successfully backfilled ${updatedCount} user(s).`);
}

main()
  .catch((e) => {
    console.error('Backfill failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
