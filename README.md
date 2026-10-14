# CLB Developers — sitio web

React 19 + TypeScript + Vite 8, Tailwind CSS 4, react-router-dom 7 y prerender estático con
[vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg). Deploy en Vercel.

## Scripts

| Comando           | Qué hace                                                      |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo (solo frontend, sin `/api`)            |
| `npx vercel dev`  | Frontend + función `/api/contact` en local (usa `.env.local`) |
| `npm run build`   | Typecheck + build con prerender a HTML estático en `dist/`    |
| `npm run lint`    | ESLint (incluye reglas de accesibilidad `jsx-a11y`)           |
| `npm test`        | Vitest                                                        |

## Editar contenido

Todo el texto editable está en `src/data/`, sin tocar componentes:

- `site.ts`: nombre, email, ubicación, links del menú y redes.
- `services.ts`: las 4 tarjetas de servicios (íconos de `lucide-react`).
- `steps.ts`: los 4 pasos de "Cómo trabajamos".
- `team.ts`: integrantes del equipo (`photo` opcional, en `/public`).
- `projects.ts`: proyectos (`image` y `url` opcionales).

## Formulario de contacto

`src/components/Contact.tsx` hace `POST /api/contact` (`api/contact.ts`, función serverless de Vercel):

- Valida con las mismas reglas que el frontend (`src/lib/contact.ts`).
- Honeypot anti-spam, chequeo de `Origin`, límite de tamaño del cuerpo.
- Límite de **5 pedidos cada 10 minutos por IP**, en memoria. Es por instancia de la función:
  frena abusos casuales, pero no es estricto. Para algo estricto, usar un store compartido (p. ej. Upstash Redis).
- Envía el mail con la API transaccional de Brevo, con `replyTo` = email de quien escribe.

### Variables de entorno (Vercel → Settings → Environment Variables)

| Variable             | Descripción                                       |
| -------------------- | ------------------------------------------------- |
| `BREVO_API_KEY`      | API key de Brevo (nunca con prefijo `VITE_`)      |
| `CONTACT_TO_EMAIL`   | Casilla que recibe las consultas                  |
| `CONTACT_FROM_EMAIL` | Remitente **verificado** en Brevo                 |

Ver `.env.example`.

## Nota: parche de vite-react-ssg

vite-react-ssg 0.9.2 declara soporte para react-router-dom 6 e importa `react-router-dom/server.js`,
un subpath que no existe en la v7 (ahí esas APIs se exportan desde la raíz). `patches/` contiene un
parche de una línea que se aplica solo en `postinstall` con `patch-package`. Por eso la versión
está fijada exacta: si se actualiza vite-react-ssg, hay que revisar o regenerar el parche.
