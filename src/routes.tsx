import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      { index: true, element: <Home />, entry: 'src/pages/Home.tsx' },
      // Se prerenderiza como dist/404.html, que Vercel sirve para rutas inexistentes.
      { path: '404', element: <NotFound />, entry: 'src/pages/NotFound.tsx' },
      { path: '*', element: <NotFound /> },
    ],
  },
]
