# نشر موقع نسيم الظل — GitHub + Cloudflare Pages

## 1) دمج الملفات مع مستودع الصور الموجود لديكم
هذه الصفحات تستدعي الصور بمسارات محلية نسبية (مثل `images/mizalats/...webp`)
بدل الروابط الخارجية، لأن مستودعكم على GitHub
(`fakhr-almamlaka-mizalat-jeddah/mizalat-nasim-alzill-jeddah`) يحتوي أصلًا على
مجلد `images/` بنفس هذا الترتيب.

الخطوات:
1. افتحوا نسخة محلية من المستودع (أو انسخوا مجلد `images/` منه).
2. ضعوا كل ملفات هذا التسليم في **جذر** المستودع نفسه، بجانب مجلد `images/`
   مباشرة (وليس داخل مجلد فرعي):
   - `index.html`
   - `mizalat.html`, `sawaters.html`, `shabaks.html`, `byout-shaar.html`,
     `pergolas.html`, `hangars.html`, `sandwich-panel.html`, `qarmids.html`
   - `style.css` (نسخة قابلة للقراءة والتعديل لاحقًا)
   - `style.min.css` (النسخة المضغوطة التي تستدعيها الصفحات فعليًا)
   - `logo.svg`
   - `robots.txt`, `sitemap.xml`
3. ارفعوا (commit + push) هذه الملفات إلى فرع `main`.

## 2) ربط المستودع بـ Cloudflare Pages
1. من لوحة Cloudflare → **Workers & Pages** → **Create application** → **Pages**
   → **Connect to Git**.
2. اختاروا مستودع `mizalat-nasim-alzill-jeddah`.
3. إعدادات البناء: لا حاجة لأمر بناء (Build command فارغ) لأن الموقع HTML/CSS
   ثابت بالكامل — فقط اضبطوا **Output directory** على `/` (الجذر).
4. بعد أول نشر، اربطوا دومينكم الفعلي (مثل `nasim-alzill.com`) من تبويب
   **Custom domains**، وحدّثوا الروابط التالية لتطابق الدومين الحقيقي بدل
   `nasim-alzill.com` التجريبي المستخدم حاليًا في:
   - وسم `<link rel="canonical">` في كل صفحة
   - ملف `sitemap.xml`
   - حقل `url` داخل بيانات Schema.org في `index.html`

## 3) بعد النشر: افحصوا الأداء فعليًا
شغّلوا PageSpeed Insights على الرابط المباشر بعد التفعيل، وأرسلوا لي النتائج
والأخطاء إن وُجدت (خصوصًا أي تحذير Console) لنُعالجها بدقة على الكود الفعلي
بدل التخمين.

## ملاحظة مهمة
الأخطاء التالية التي وردت في طلبكم **لا علاقة لها بملفات هذا الموقع**:
- طلبات `api.alsiyadamazallatjeddah.workers.dev/api/ads` و `/api/reviews`
  (Cloudflare Workers API)
- خطأ صيغة ملف `ai-catalog.json`

هذه تخص مشروعًا آخر (يبدو أنه "الصياد مظلات جدة"). إذا كان هذا فعلًا مشروعكم
وتريدون إصلاحه، أرسلوا ملفات ذلك المستودع تحديدًا وسأعالجها بشكل منفصل ودقيق.
