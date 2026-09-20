import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function seed() {
  await prisma.user.updateMany({
    where: { username: 'worker_karan' },
    data: { name: 'Karan Kumar', phone: '9847123450', workerStatus: 'AVAILABLE' },
  });
  await prisma.user.updateMany({
    where: { username: 'worker_ajsal' },
    data: { name: 'Ajsal Rahman', phone: '9847123451', workerStatus: 'AVAILABLE' },
  });
  await prisma.user.updateMany({
    where: { username: 'worker_1788785133617' },
    data: { name: 'Ratheesh V.', phone: '9847123452', workerStatus: 'AVAILABLE' },
  });
  await prisma.user.updateMany({
    where: { username: 'asees' },
    data: { workerStatus: 'AVAILABLE' },
  });

  const existingCount = await prisma.serviceEnquiry.count();
  if (existingCount <= 1) {
    const karan = await prisma.user.findFirst({ where: { username: 'worker_karan' } });
    const ajsal = await prisma.user.findFirst({ where: { username: 'worker_ajsal' } });
    const staff = await prisma.user.findFirst({ where: { role: 'OFFICE_STAFF' } });

    await prisma.serviceEnquiry.createMany({
      data: [
        {
          trackingNumber: 'ENQ-2026-104820',
          serviceName: 'Cococare - Palm Tree Harvesting & Maintenance',
          customerName: 'Mathew Thomas',
          customerPhone: '9847234567',
          customerEmail: 'mathew.estate@gmail.com',
          location: 'Kottayam Rubber Estate, Zone 3',
          preferredDate: new Date('2026-09-24T09:00:00Z'),
          message: 'Need 45 high coconut palms harvested and crowned. Safety harness equipment needed.',
          status: 'PENDING',
          notes: 'Customer requested morning slot before 11 AM.',
        },
        {
          trackingNumber: 'ENQ-2026-104821',
          serviceName: 'JCB Heavy Machinery & Earth Excavation',
          customerName: 'Priya Nambiar',
          customerPhone: '9745123890',
          customerEmail: 'priya.nambiar@yahoo.com',
          location: 'Palakkad Agricultural Plot, Block B',
          preferredDate: new Date('2026-09-22T08:30:00Z'),
          message: 'Leveling 1.5 acres of farmland and drainage trench clearing for irrigation canal.',
          status: 'ASSIGNED',
          notes: 'Assigned operator Karan Kumar with excavator unit #04.',
          officeStaffId: staff?.id,
          workerId: karan?.id,
          assignedAt: new Date(),
        },
        {
          trackingNumber: 'ENQ-2026-104822',
          serviceName: 'Master Masonry & Exterior Plastering',
          customerName: 'Anand Varma',
          customerPhone: '9447890123',
          customerEmail: 'anand.varma@outlook.com',
          location: 'Thiruvalla Riverside Villa',
          preferredDate: new Date('2026-09-20T08:00:00Z'),
          message: 'Weatherproof exterior plastering and structural masonry repair on two-story villa perimeter wall.',
          status: 'IN_PROGRESS',
          notes: 'Scaffolding set up. Work underway.',
          officeStaffId: staff?.id,
          workerId: ajsal?.id,
          assignedAt: new Date(Date.now() - 86400000),
        },
        {
          trackingNumber: 'ENQ-2026-104823',
          serviceName: 'Floor Tiling & Granite Installation',
          customerName: 'Sujatha Pillai',
          customerPhone: '9895671234',
          customerEmail: 'sujatha.pillai@gmail.com',
          location: 'Ernakulam West Apartment Complex',
          preferredDate: new Date('2026-09-18T10:00:00Z'),
          message: 'Living room vitrified tile laying (1200 sq.ft) with Italian finish spacers.',
          status: 'COMPLETED',
          notes: 'Client inspected and signed off. Final payment settled.',
          officeStaffId: staff?.id,
          completedAt: new Date(Date.now() - 43200000),
        },
      ],
    });
    console.log('Successfully seeded rich KK Group enquiries!');
  } else {
    console.log(`Already have ${existingCount} enquiries in DB.`);
  }
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
