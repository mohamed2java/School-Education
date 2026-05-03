import{c as e,m as n,p as d,h as a,f as s}from"./index-BCJvp-lm.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=e("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=e("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);function r(i){const o=window.open("","_blank","width=420,height=600");if(!o)return;const t=`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>إيصال دفع - ${i.receiptNumber}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Tajawal', sans-serif;
      background: #fff;
      color: #1a1a2e;
      padding: 0;
    }
    .receipt {
      width: 380px;
      margin: 0 auto;
      padding: 24px 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 16px;
      border-bottom: 3px double #0d9488;
      margin-bottom: 16px;
    }
    .logo-circle {
      width: 56px; height: 56px;
      background: linear-gradient(135deg, #0d9488, #115e59);
      border-radius: 50%;
      margin: 0 auto 10px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 22px; font-weight: 700;
      font-family: 'Noto Kufi Arabic', sans-serif;
    }
    .school-name {
      font-family: 'Noto Kufi Arabic', sans-serif;
      font-size: 20px; font-weight: 700;
      color: #0d9488;
      margin-bottom: 2px;
    }
    .school-sub {
      font-size: 11px; color: #6b7280;
    }
    .receipt-title {
      text-align: center;
      background: #f0fdfa;
      border: 1px solid #ccfbf1;
      border-radius: 8px;
      padding: 8px;
      margin-bottom: 16px;
    }
    .receipt-title h2 {
      font-family: 'Noto Kufi Arabic', sans-serif;
      font-size: 16px; font-weight: 700;
      color: #115e59;
    }
    .receipt-title .rec-num {
      font-size: 13px; color: #0d9488;
      font-weight: 600;
      margin-top: 2px;
      direction: ltr; display: inline-block;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 16px;
    }
    .info-item {
      background: #f8fafc;
      border-radius: 6px;
      padding: 10px;
    }
    .info-item.full { grid-column: 1 / -1; }
    .info-label {
      font-size: 10px; color: #9ca3af;
      font-weight: 500;
      margin-bottom: 3px;
    }
    .info-value {
      font-size: 13px; font-weight: 600;
      color: #1a1a2e;
    }
    .amount-box {
      text-align: center;
      background: linear-gradient(135deg, #f0fdfa, #ccfbf1);
      border: 2px solid #0d9488;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .amount-label {
      font-size: 12px; color: #115e59;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .amount-value {
      font-family: 'Noto Kufi Arabic', sans-serif;
      font-size: 28px; font-weight: 700;
      color: #0d9488;
      direction: ltr; display: inline-block;
    }
    .notes {
      background: #fffbeb;
      border-radius: 6px;
      padding: 10px;
      font-size: 12px;
      color: #92400e;
      margin-bottom: 16px;
    }
    .notes strong { font-weight: 600; }
    .divider {
      border: none;
      border-top: 1px dashed #d1d5db;
      margin: 16px 0;
    }
    .signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
      padding-top: 8px;
    }
    .sig-block {
      text-align: center;
      width: 45%;
    }
    .sig-line {
      border-top: 1px solid #9ca3af;
      margin-bottom: 4px;
      margin-top: 32px;
    }
    .sig-label {
      font-size: 11px; color: #6b7280;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      padding-top: 12px;
      border-top: 3px double #0d9488;
    }
    .footer p {
      font-size: 10px; color: #9ca3af;
    }
    .footer .stamp {
      font-size: 11px;
      color: #0d9488;
      font-weight: 600;
      margin-bottom: 4px;
    }
    @media print {
      body { padding: 0; }
      .receipt { width: 100%; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div class="logo-circle">م</div>
      <div class="school-name">مدرسة مدرستي</div>
      <div class="school-sub">نظام الإدارة المدرسية المتكامل</div>
    </div>

    <div class="receipt-title">
      <h2>إيصال دفع</h2>
      <div class="rec-num">${i.receiptNumber}</div>
    </div>

    <div class="info-grid">
      <div class="info-item full">
        <div class="info-label">اسم الطالب</div>
        <div class="info-value">${i.studentName}</div>
      </div>
      ${i.grade?`
      <div class="info-item">
        <div class="info-label">الصف</div>
        <div class="info-value">${i.grade}</div>
      </div>`:""}
      ${i.guardianName?`
      <div class="info-item">
        <div class="info-label">ولي الأمر</div>
        <div class="info-value">${i.guardianName}</div>
      </div>`:""}
      <div class="info-item">
        <div class="info-label">التاريخ</div>
        <div class="info-value">${n(i.date)}</div>
      </div>
      <div class="info-item">
        <div class="info-label">نوع الدفع</div>
        <div class="info-value">${d[i.type]||i.type}</div>
      </div>
      <div class="info-item">
        <div class="info-label">طريقة الدفع</div>
        <div class="info-value">${a[i.method]||i.method}</div>
      </div>
      <div class="info-item">
        <div class="info-label">المحصّل</div>
        <div class="info-value">${i.collectedBy}</div>
      </div>
    </div>

    <div class="amount-box">
      <div class="amount-label">المبلغ المدفوع</div>
      <div class="amount-value">${s(i.amount)}</div>
    </div>

    ${i.notes?`
    <div class="notes">
      <strong>ملاحظات:</strong> ${i.notes}
    </div>`:""}

    <div class="signatures">
      <div class="sig-block">
        <div class="sig-line"></div>
        <div class="sig-label">توقيع المحصّل</div>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <div class="sig-label">توقيع ولي الأمر</div>
      </div>
    </div>

    <div class="footer">
      <p class="stamp">هذا الإيصال صادر إلكترونياً من نظام مدرستي</p>
      <p>تاريخ الطباعة: ${new Date().toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
    </div>
  </div>

  <div class="no-print" style="text-align:center; margin-top:16px;">
    <button onclick="window.print()" style="background:#0d9488; color:#fff; border:none; padding:10px 32px; border-radius:8px; font-size:14px; font-family:Tajawal; cursor:pointer; font-weight:600;">
      🖨️ طباعة الإيصال
    </button>
    <button onclick="window.close()" style="background:#e5e7eb; color:#374151; border:none; padding:10px 32px; border-radius:8px; font-size:14px; font-family:Tajawal; cursor:pointer; margin-right:8px; font-weight:600;">
      إغلاق
    </button>
  </div>

  <script>
    window.onafterprint = function() {};
  <\/script>
</body>
</html>`;o.document.write(t),o.document.close()}function f(i,o){r({receiptNumber:i.receiptNumber,studentName:i.studentName,amount:i.amount,date:i.date,type:i.type,method:i.method,collectedBy:i.collectedBy,notes:i.notes,grade:o==null?void 0:o.grade,guardianName:o==null?void 0:o.guardianName})}export{c as C,p as P,f as p};
