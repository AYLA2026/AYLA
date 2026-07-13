# 🏛️ Ayla Core

المستودع المرجعي المشترك لكل منصات **Ayla Digital Solutions**

## 📦 الحزم المتاحة

| الحزمة | الوصف | الاستخدام |
|--------|-------|-----------|
| `@ayla/design-tokens` | 🎨 الألوان، الخطوط، المسافات | `import { colors } from '@ayla/design-tokens'` |
| `@ayla/types` | 📐 أنواع TypeScript المشتركة | `import { User, AuthState } from '@ayla/types'` |
| `@ayla/utils` | 🛠️ دوال مساعدة | `import { formatDate, storage } from '@ayla/utils'` |
| `@ayla/auth-sdk` | 🔐 مصادقة JWT موحدة | `import { login, logout } from '@ayla/auth-sdk'` |
| `@ayla/api-client` | 🌐 HTTP Client | `import { api } from '@ayla/api-client'` |
| `@ayla/ui-kit` | 🧩 مكونات React | `import { Button, Card } from '@ayla/ui-kit'` |

## 🚀 التثبيت في أي منصة

### 1. إعداد GitHub Packages

أضف في `.npmrc` أو `~/.npmrc`:

```
@ayla:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN_HERE
```

أو في Terminal:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@ayla
```

### 2. تثبيت الحزم

```bash
npm install @ayla/design-tokens @ayla/types @ayla/utils @ayla/auth-sdk @ayla/api-client @ayla/ui-kit
```

أو في `package.json`:

```json
{
  "dependencies": {
    "@ayla/design-tokens": "^1.0.0",
    "@ayla/types": "^1.0.0",
    "@ayla/utils": "^1.0.0",
    "@ayla/auth-sdk": "^1.0.0",
    "@ayla/api-client": "^1.0.0",
    "@ayla/ui-kit": "^1.0.0"
  }
}
```

## 🎨 الهوية البصرية

| العنصر | القيمة |
|--------|--------|
| الخلفية الرئيسية | `#1a0f0a` (بني داكن) |
| الذهبي الأساسي | `#c9a227` |
| الذهبي الفاتح | `#e8d5a3` |
| النص الرئيسي | `#f5f0e8` (أبيض كريمي) |
| النص الثانوي | `#a89b8c` |

## 🏗️ التطوير

```bash
# تثبيت التبعيات
pnpm install

# بناء كل الحزم
pnpm run build

# وضع التطوير
pnpm run dev

# اختبار
pnpm run test
```

## 📁 هيكل المشروع

```
packages/
├── design-tokens/    ← الألوان، الخطوط، المسافات
├── types/            ← TypeScript interfaces
├── utils/            ← دوال مساعدة
├── auth-sdk/         ← مصادقة JWT
├── api-client/       ← HTTP Client
└── ui-kit/           ← مكونات React
```

## 🔗 الربط مع المنصات

كل منصة تستورد من `@ayla/*` مباشرة:

```tsx
// في أي منصة (مثلاً: ayla-maintenance)
import { AylaProvider, Button, Card } from '@ayla/ui-kit';
import { colors } from '@ayla/design-tokens';
import { api } from '@ayla/api-client';
import { login } from '@ayla/auth-sdk';

export default function App() {
  return (
    <AylaProvider platformId="maintenance">
      <Button variant="primary">بلاغ جديد</Button>
      <Card title="إحصائيات" glow>
        المحتوى هنا
      </Card>
    </AylaProvider>
  );
}
```

## 📝 الترخيص

Copyright © 2026 Ayla Digital Solutions
