# 📚 دليل إعداد Ayla Core مع المنصات

## الخطوة 1: إعداد GitHub Token

### 1.1 إنشاء Personal Access Token
1. اذهب إلى GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. انقر "Generate new token (classic)"
3. امنح الصلاحيات:
   - ✅ `read:packages`
   - ✅ `write:packages`
   - ✅ `delete:packages`
   - ✅ `repo` (لو تبي تدفع من CLI)
4. انسخ التوكن واحفظه (`ghp_xxxxxxxx`)

### 1.2 تسجيل الدخول في Terminal
```bash
npm login --registry=https://npm.pkg.github.com --scope=@ayla
# Username: YOUR_GITHUB_USERNAME
# Password: YOUR_TOKEN (ghp_xxxxxxxx)
# Email: your-email@example.com
```

---

## الخطوة 2: نشر Ayla Core (مرة واحدة)

```bash
cd 01-ayla-core

# تثبيت التبعيات
pnpm install

# بناء الحزم
pnpm run build

# رفع على GitHub
npm publish -r --access=restricted
```

أو تلقائياً عن طريق GitHub Actions:
```bash
# ارفع tag جديد
git tag v1.0.0
git push origin v1.0.0
# الـ CI/CD ينشر تلقائياً
```

---

## الخطوة 3: إنشاء منصة جديدة (مثال: الصيانة)

### 3.1 إنشاء المستودع
```bash
# في GitHub: New Repository → ayla-maintenance
```

### 3.2 إعداد الملفات
```bash
mkdir 02-ayla-maintenance
cd 02-ayla-maintenance

# نسخ قوالب الإعدادات
cp ../platform-template-package.json package.json
cp ../platform-template-.npmrc .npmrc
cp ../platform-template-next.config.ts next.config.ts
cp ../platform-template-tailwind.config.ts tailwind.config.ts
cp ../platform-template-tsconfig.json tsconfig.json
cp ../platform-template-globals.css src/app/globals.css
cp ../platform-template-layout.tsx src/app/layout.tsx

# تعديل package.json - استبدل PLATFORM-NAME
# تعديل layout.tsx - استبدل PLATFORM_ID_HERE بـ "maintenance"
```

### 3.3 تثبيت التبعيات
```bash
# أضف التوكن في .npmrc
echo "//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN" >> .npmrc

# تثبيت كل شيء
npm install
```

### 3.4 اختبار الاستيراد
```tsx
// src/app/page.tsx
import { Button, Card, AylaProvider } from '@ayla/ui-kit';
import { colors } from '@ayla/design-tokens';
import { api } from '@ayla/api-client';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold ayla-text-gradient mb-6">
        Ayla Maintenance
      </h1>

      <Card title="مرحباً" glow>
        <p className="text-ayla-text-secondary">
          منصة الصيانة الذكية
        </p>
        <Button variant="primary" glow>
          بلاغ جديد
        </Button>
      </Card>
    </main>
  );
}
```

### 3.5 رفع على GitHub
```bash
git init
git add .
git commit -m "feat: initialize ayla-maintenance platform"
git remote add origin https://github.com/YOUR_USERNAME/ayla-maintenance.git
git push -u origin main
```

---

## الخطوة 4: تكرار لباقي المنصات (13 منصة)

```bash
# نسخ القالب وتعديل الاسم فقط
for platform in food ride home-services fleet warehouse procurement hr projects bi smart-city medical clinic pharmacy; do
  echo "Creating ayla-$platform..."
  # نفس الخطوات 3.1 - 3.5 مع تغيير الاسم فقط
done
```

---

## 🔧 تحديث Ayla Core

لو عدلت في `ayla-core`:

```bash
cd 01-ayla-core

# تغيير الإصدار
npm version patch   # 1.0.0 → 1.0.1
# أو
npm version minor   # 1.0.0 → 1.1.0
# أو
npm version major   # 1.0.0 → 2.0.0

# رفع التحديث
git push origin main --tags

# الـ CI/CD ينشر تلقائياً
```

### تحديث المنصات:
```bash
cd 02-ayla-maintenance
npm update @ayla/ui-kit @ayla/auth-sdk @ayla/api-client @ayla/types @ayla/utils @ayla/design-tokens
```

---

## 📁 الهيكل النهائي في جهازك

```
ayla-digital-solutions/
├── 01-ayla-core/              ← المستودع المرجعي (GitHub Package)
│   ├── packages/
│   ├── .github/workflows/
│   └── .npmrc
│
├── 02-ayla-maintenance/       ← منصة منفصلة (GitHub Repo)
│   ├── src/
│   ├── package.json           ← يستورد @ayla/*
│   └── .npmrc
│
├── 03-ayla-food/              ← منصة منفصلة
├── 04-ayla-ride/              ← منصة منفصلة
├── ... (11 منصة أخرى)
│
└── platform-templates/          ← قوالب جاهزة
    ├── package.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── layout.tsx
    └── globals.css
```

---

## ⚡ نصائح مهمة

1. **لا تعدل في node_modules/@ayla/** - أي تعديل يروح مع `npm install`
2. **لو تحتاج تعديل** - عدل في `01-ayla-core` وانشر تحديث
3. **استخدم `npm link`** للتطوير المحلي:
   ```bash
   cd 01-ayla-core/packages/ui-kit
   npm link
   cd ../../../02-ayla-maintenance
   npm link @ayla/ui-kit
   ```
4. **الـ GitHub Token** يفضل تخزينه في GitHub Secrets للـ CI/CD

---

## 🆘 استكشاف الأخطاء

### خطأ: 401 Unauthorized
```bash
# الحل: أعد تسجيل الدخول
npm login --registry=https://npm.pkg.github.com --scope=@ayla
```

### خطأ: Package not found
```bash
# الحل: تأكد من نشر الحزمة
npm view @ayla/ui-kit
```

### خطأ: Cannot find module '@ayla/ui-kit'
```bash
# الحل: تأكد من .npmrc
npm install @ayla/ui-kit --save
```
