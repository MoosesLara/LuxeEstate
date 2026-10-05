# 🏡 Buenas Prácticas y Guía de Desarrollo para Luxu State (Next.js)

Guía condensada de arquitectura, rendimiento, SEO y UX para aplicaciones de Real Estate de alto nivel.

## 🏗️ 1. Arquitectura y Código
*   **Estructura Feature-First:** Agrupar código por funcionalidad (`/features/properties`, `/features/search`) en lugar de por tipo (`/components`, `/hooks`).
*   **Server Components (RSC) por defecto:** Mantener componentes en el servidor. Usar `'use client'` solo para interactividad específica (carruseles, botones de favoritos, mapas).
*   **Separación de Capas:** Mantener la lógica de base de datos (`PropertyService`) estrictamente separada de la UI.
*   **Tipado Estricto:** Usar TypeScript rigurosamente con los tipos generados por Supabase (`database.types.ts`).

## ⚡ 2. Rendimiento (Core Web Vitals)
*   **Paginación del Servidor (SSR/ISR):** Nunca cargar listados completos en el cliente. Usar límites y offsets (como ya se implementó).
*   **Optimización de Imágenes LCP:** 
    *   Usar `next/image` (WebP/AVIF).
    *   Aplicar `priority={true}` **solo** a la primera imagen visible (Hero o primera de la galería).
    *   Definir el atributo `sizes` correctamente para evitar descargas innecesariamente grandes.
*   **Lazy Loading:** Cargar dinámicamente (`next/dynamic`) mapas interactivos o tours 360 que no son visibles inmediatamente.
*   **Skeleton Loaders:** Usar esqueletos durante las transiciones de carga de datos en el cliente.

## 🔗 3. SEO y URLs Amigables (Slugs)
*   **URLs Descriptivas (Friendly Slugs):** La estructura de la URL es crítica para el SEO inmobiliario.
    *   ✅ **Bien:** `/properties/villa-esmeralda-beverly-hills-california`
    *   ❌ **Mal:** `/properties/12345` o `/properties/f0bd29a9-2328`
*   **Composición del Slug:** Debe incluir: `[Tipo]-[Nombre-o-Atributo]-[Ubicacion]`. Ej: `penthouse-azure-heights-vancouver`.
*   **Metadatos Dinámicos:** Usar `generateMetadata` en Next.js para inyectar títulos y descripciones únicas basadas en la propiedad y su ubicación.
*   **Schema.org (JSON-LD):** Insertar marcado estructurado tipo `RealEstateListing` para que Google muestre precio y detalles en los resultados.
*   **Open Graph (OG):** Configurar etiquetas sociales para previsualizaciones ricas en WhatsApp, Twitter y LinkedIn.

## 🎨 4. UX y Diseño Premium (Luxu State)
*   **Filtros sin Recarga:** Usar actualización superficial de URL (`?precio=...&tipo=...`) para que el usuario no sienta transiciones de página.
*   **Micro-animaciones:** Implementar hover states elegantes y transiciones suaves al hacer scroll (Framer Motion o CSS puro).
*   **Galerías Inmersivas:** La vista de fotos debe dominar la pantalla de detalles, soportar gestos táctiles (swipe) y full-screen.
*   **Estados Vacíos (Empty States):** Diseñar interfaces claras y amigables cuando una búsqueda o filtro no devuelve resultados.

## 💾 5. Base de Datos (Supabase)
*   **Soft Deletes:** Nunca borrar propiedades. Usar un estado (ej. `status = 'sold'`, `'archived'`) para preservar el histórico y no romper URLs indexadas por Google (evitar 404s).
*   **Índices Clave:** Mantener indexadas columnas de búsqueda frecuente: `slug`, `type`, `category`, `price`, `is_featured`.
*   **Geo-Localización (PostGIS):** A futuro, usar extensiones espaciales para consultas de radio ("A 5km a la redonda").

## 💡 6. Roadmap y Funciones Clave
*   **[ ] Comparador:** Herramienta para comparar 2-3 propiedades lado a lado.
*   **[ ] Calculadora Hipotecaria:** Widget en los detalles de la propiedad.
*   **[ ] Auth & Favoritos:** Sistema de usuarios para guardar listas de deseos.
*   **[ ] Landing por Zonas:** Páginas dedicadas por barrio (ej. `/neighborhoods/beverly-hills`) para atrapar búsquedas locales en Google.
*   **[ ] Dark Mode:** Soporte nativo para modo oscuro, ideal para destacar fotografía de lujo.
