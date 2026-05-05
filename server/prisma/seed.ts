import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // 1. Create Default Users
  await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      name: 'المدير العام',
      email: 'admin@school.com',
      password: '123456',
      role: 'system_admin',
    },
  });

  await prisma.user.upsert({
    where: { email: 'cashier@school.com' },
    update: {},
    create: {
      name: 'فاطمة حسن عمر',
      email: 'cashier@school.com',
      password: '123456',
      role: 'accountant',
    },
  });

  // 2. Create Sample Students
  const studentsData = [
    {
      nationalId: '30001010112345',
      name: 'يوسف أحمد إبراهيم',
      stage: 'kg',
      grade: 'KG1',
      className: 'KG1-أ',
      guardianName: 'أحمد إبراهيم محمود',
      guardianPhone: '01001234567',
      address: 'المعادي - القاهرة',
      enrollmentDate: '2024-09-01',
      totalFees: 15000,
      paidAmount: 15000,
    },
    {
      nationalId: '30002020223456',
      name: 'مريم خالد العتيبي',
      stage: 'kg',
      grade: 'KG2',
      className: 'KG2-ب',
      guardianName: 'خالد العتيبي سعد',
      guardianPhone: '01012345678',
      address: 'مدينة نصر - القاهرة',
      enrollmentDate: '2024-09-01',
      totalFees: 15000,
      paidAmount: 10000,
    },
  ];

  for (const s of studentsData) {
    await prisma.student.upsert({
      where: { nationalId: s.nationalId },
      update: {},
      create: s,
    });
  }

  // Seed Inventory
  await prisma.inventoryItem.createMany({
    data: [
      { name: 'كتاب اللغة العربية - الصف الأول', category: 'books', quantity: 150, minQuantity: 20, unitPrice: 45, grade: '1', lastUpdated: new Date().toISOString() },
      { name: 'زي مدرسي - مقاس صغير', category: 'uniform', quantity: 15, minQuantity: 10, unitPrice: 250, grade: 'الكل', lastUpdated: new Date() .toISOString() },
      { name: 'أقلام حبر زرقاء (صندوق)', category: 'tools', quantity: 50, minQuantity: 5, unitPrice: 120, grade: 'الكل', lastUpdated: new Date().toISOString() },
    ]
  });

  // Seed Bus Routes
  await prisma.busRoute.createMany({
    data: [
      { name: 'خط المهندسين / الدقي', busNumber: 'باص 101', driverName: 'محمد أحمد', driverPhone: '01012345678', capacity: 25, monthlyFee: 800, annualFee: 7500, stops: ['المهندسين', 'جامعة الدول', 'البطل أحمد عبدالعزيز', 'ميدان الدقي'] },
      { name: 'خط المعادي', busNumber: 'باص 202', driverName: 'سيد علي', driverPhone: '01122334455', capacity: 20, monthlyFee: 1000, annualFee: 9000, stops: ['زهراء المعادي', 'دجلة', 'كورنيش المعادي'] },
    ]
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
