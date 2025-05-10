import { RouterProvider, createBrowserRouter } from 'react-router';
import Layout from '@/pages/_Layout';
import RootPage from '@/pages/RootPage';

export default function Routers() {
  const router = createBrowserRouter([
    {path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <RootPage /> },
      ],
    },
    {
      path: '*',
      element: (
        <h3>
          <b>NOT FOUND PAGE</b>
        </h3>
      ),
    },
  ])
  return <RouterProvider router={router} />
}