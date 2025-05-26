import { Route, Routes } from 'react-router'

import { App } from './app'
import { LinkPage } from './routes/link'
import { NotFoundPage } from './routes/not-found'

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:shortUrlSlug',
    element: <LinkPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

export function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}
