# 🌍 Guía para Agregar Nuevos Idiomas a LuxeEstate

El sistema de internacionalización está diseñado de forma modular y estandarizada para permitir añadir nuevos idiomas en solo 3 pasos:

---

### Paso 1: Registrar el nuevo idioma en `config/i18n.config.ts`

Añade el código del idioma al array `LOCALES` y a la constante `SUPPORTED_LOCALES`.

Ejemplo para **Italiano (`it`)**:
```typescript
export const LOCALES = ['es', 'en', 'fr', 'it'] as const;

export const SUPPORTED_LOCALES: Record<Locale, LocaleConfig> = {
  // ... existentes
  it: {
    code: 'it',
    name: 'Italian',
    localName: 'Italiano',
    flag: '🇮🇹',
  },
};
```

---

### Paso 2: Crear el archivo de traducción en `locales/[código].json`

Copia el archivo base `locales/template.json` a `locales/it.json` y traduce los valores de cada clave:

```bash
cp locales/template.json locales/it.json
```

---

### Paso 3: Registrar el diccionario en `lib/i18n/dictionaries.ts`

Importa el nuevo archivo JSON y agrégalo a la constante `DICTIONARIES`:

```typescript
import it from '@/locales/it.json';

export const DICTIONARIES: Record<Locale, Dictionary> = {
  es: es as unknown as Dictionary,
  en: en as unknown as Dictionary,
  fr: fr as unknown as Dictionary,
  it: it as unknown as Dictionary, // <--- Nuevo idioma
};
```

---

### ✨ Resultado Automático
Una vez completados los 3 pasos:
1. El selector de idiomas (`LanguageSelector`) mostrará automáticamente la nueva bandera y nombre (`🇮🇹 Italiano`).
2. La cookie `NEXT_LOCALE=it` se guardará automáticamente al seleccionarlo.
3. Toda la aplicación se traducirá en tiempo real sin necesidad de recargar la página.
