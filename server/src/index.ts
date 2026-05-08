import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // السماح لجميع المصادر بالاتصال
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Students API ---

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        yearlyFinance: {
          orderBy: { academicYear: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Create a new student
app.post('/api/students', async (req, res) => {
  try {
    const student = await prisma.student.create({
      data: req.body
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create student' });
  }
});

// Update student
app.patch('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.update({
      where: { id },
      data: req.body,
      include: {
        yearlyFinance: {
          orderBy: { academicYear: 'asc' }
        }
      }
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update student' });
  }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete student' });
  }
});

// --- Payments API ---
app.get('/api/payments', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// --- Auth API (Simple mock for now) ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`🔑 محاولة دخول: ${email}`);
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      console.log(`❌ المستخدم غير موجود: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.active) {
      console.log(`⚠️ محاولة دخول مستخدم معطل: ${email}`);
      return res.status(403).json({ error: 'Account is disabled' });
    }

    if (user.password === password) {
      console.log(`✅ دخول ناجح: ${user.name}`);
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      console.log(`❌ كلمة مرور خاطئة للمستخدم: ${email}`);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// --- Users API ---

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// Update user
app.patch('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`📝 محاولة تحديث بيانات المستخدم: ${id}`);
  try {
    const user = await prisma.user.update({
      where: { id },
      data: req.body
    });
    console.log('✅ تم تحديث المستخدم بنجاح');
    res.json(user);
  } catch (error) {
    console.error('❌ فشل تحديث المستخدم:', error);
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// --- Payments API ---
app.get('/api/payments', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

app.post('/api/payments', async (req, res) => {
  const { studentId, studentName, amount, type, method, date, receiptNumber, collectedBy, notes, academicYear } = req.body;
  
  try {
    // 1. Fetch student's yearly finance records ordered by year (oldest first)
    const yearlyFinances = await prisma.studentYearlyFinance.findMany({
      where: { studentId },
      orderBy: { academicYear: 'asc' }
    });

    let remainingAmount = amount;
    const updates = [];

    // 2. Allocate payment to oldest years first
    for (const finance of yearlyFinances) {
      if (remainingAmount <= 0) break;
      
      const balance = finance.totalFees - finance.paidAmount;
      if (balance > 0) {
        const paymentToThisYear = Math.min(remainingAmount, balance);
        updates.push(
          prisma.studentYearlyFinance.update({
            where: { id: finance.id },
            data: { paidAmount: { increment: paymentToThisYear } }
          })
        );
        remainingAmount -= paymentToThisYear;
      }
    }

    // 3. Execute transaction: Create payment, update yearly records, update student summary
    const [payment] = await prisma.$transaction([
      prisma.payment.create({
        data: { studentId, studentName, amount, type, method, date, receiptNumber, collectedBy, notes, academicYear }
      }),
      ...updates,
      prisma.student.update({
        where: { id: studentId },
        data: { 
          paidAmount: { increment: amount },
          // If all remaining is used, clear any pending request
          pendingPaymentAmount: null,
          pendingPaymentType: null,
          paymentRequestStatus: null
        }
      })
    ]);

    res.status(201).json(payment);
  } catch (error) {
    console.error('Payment error:', error);
    res.status(400).json({ error: 'Failed to record payment' });
  }
});

// --- Inventory API ---
app.get('/api/inventory', async (req, res) => {
  try {
    const items = await prisma.inventoryItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// --- Bus Routes API ---
app.get('/api/bus-routes', async (req, res) => {
  try {
    const routes = await prisma.busRoute.findMany();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bus routes' });
  }
});

app.post('/api/bus-routes', async (req, res) => {
  console.log('🚌 محاولة إنشاء خط باص جديد:', req.body.name);
  try {
    const route = await prisma.busRoute.create({
      data: req.body
    });
    console.log('✅ تم إنشاء الخط بنجاح:', route.id);
    res.json(route);
  } catch (error) {
    console.error('❌ فشل إنشاء الخط:', error);
    res.status(500).json({ error: 'Failed to create bus route' });
  }
});

app.patch('/api/bus-routes/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`📝 محاولة تعديل الخط: ${id}`, req.body);
  try {
    const route = await prisma.busRoute.update({
      where: { id },
      data: req.body
    });
    console.log('✅ تم التعديل بنجاح');
    res.json(route);
  } catch (error) {
    console.error('❌ فشل التعديل:', error);
    res.status(500).json({ error: 'Failed to update bus route' });
  }
});

// --- Stage Fees API (Director) ---
app.get('/api/stage-fees', async (req, res) => {
  try {
    const fees = await prisma.stageFee.findMany();
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stage fees' });
  }
});

app.post('/api/stage-fees', async (req, res) => {
  console.log('📬 طلب إضافة رسوم جديد:', req.body);
  const { stage, grade, track, academicYear, tuitionFees, booksFees, uniformFees, applicationFees, additionalFees } = req.body;
  
  if (!stage || !grade || !academicYear) {
    return res.status(400).json({ error: 'بيانات غير مكتملة (المرحلة، الصف، السنة الدراسية مطلوبة)' });
  }

  try {
    // Check if exists using findFirst instead of findUnique to avoid unique name issues
    const existing = await prisma.stageFee.findFirst({
      where: { stage, grade, track, academicYear }
    });

    if (existing) {
      console.log('⚠️ الرسوم مسجلة بالفعل');
      return res.status(409).json({ error: 'الرسوم مسجلة بالفعل لهذه المرحلة والسنة الدراسية' });
    }

    const fee = await prisma.stageFee.create({
      data: { 
        stage, grade, track, academicYear, 
        tuitionFees, tuitionMandatory: req.body.tuitionMandatory,
        booksFees, booksMandatory: req.body.booksMandatory,
        uniformFees, uniformMandatory: req.body.uniformMandatory,
        applicationFees, applicationMandatory: req.body.applicationMandatory,
        additionalFees 
      }
    });
    console.log('✅ تم الحفظ في قاعدة البيانات:', fee);
    res.status(201).json(fee);
  } catch (error) {
    console.error('❌ خطأ في قاعدة البيانات:', error);
    res.status(400).json({ error: 'فشل الحفظ في قاعدة البيانات' });
  }
});

app.patch('/api/stage-fees/:id', async (req, res) => {
  console.log('📬 طلب تعديل رسوم:', req.params.id, req.body);
  const { id } = req.params;
  try {
    const fee = await prisma.stageFee.update({
      where: { id },
      data: req.body
    });
    console.log('✅ تم التعديل بنجاح');
    res.json(fee);
  } catch (error) {
    console.error('❌ خطأ في التعديل:', error);
    res.status(400).json({ error: 'فشل تعديل البيانات' });
  }
});

app.delete('/api/stage-fees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.stageFee.delete({
      where: { id }
    });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete' });
  }
});

// --- Admission Workflow API ---

// 1. Initial Application
app.post('/api/admission/apply', async (req, res) => {
  try {
    const student = await prisma.student.create({
      data: {
        ...req.body,
        status: 'applied'
      }
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: 'Failed to apply' });
  }
});

// 2. Set Test Result
app.patch('/api/admission/test-result/:id', async (req, res) => {
  const { id } = req.params;
  const { result } = req.body;
  try {
    const student = await prisma.student.update({
      where: { id },
      data: {
        testResult: result,
        status: result === 'pass' ? 'fee_setup' : result === 'fail' ? 'failed' : 'under_testing'
      }
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update test result' });
  }
});

// 3. Setup Fees & Discount
app.patch('/api/admission/setup-fees/:id', async (req, res) => {
  const { id } = req.params;
  const { tuitionFees, tuitionMandatory, booksFees, booksMandatory, uniformFees, uniformMandatory, otherFees, discountAmount, discountApprovedBy, busFees, busRouteId, additionalFees } = req.body;
  
  const totalFees = Number(tuitionFees || 0) + Number(booksFees || 0) + Number(uniformFees || 0) + Number(busFees || 0) + Number(otherFees || 0) + (additionalFees || []).reduce((s: number, f: any) => s + (f.selected ? f.amount : 0), 0) - Number(discountAmount || 0);

  try {
    const student = await prisma.student.update({
      where: { id },
      data: {
        tuitionFees, tuitionMandatory,
        booksFees, booksMandatory,
        uniformFees, uniformMandatory,
        busFees, busRouteId, otherFees, discountAmount, discountApprovedBy,
        totalFees,
        additionalFees,
        status: 'pending_approval'
      }
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: 'Failed to setup fees' });
  }
});

// 4. Final Approval
app.patch('/api/admission/approve/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.update({
      where: { id },
      data: {
        status: 'admitted',
        enrollmentDate: new Date().toISOString().split('T')[0]
      }
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: 'Failed to approve' });
  }
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server ready at: http://0.0.0.0:${PORT}`);
});
