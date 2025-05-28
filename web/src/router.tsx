import { Route, Routes } from 'react-router'

import { App } from './app'
import { NotFoundPage } from './routes/not-found'
import { RedirectPage } from './routes/redirect-page'

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:shortUrlSlug',
    element: <RedirectPage />,
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
