import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/home';
import Tags from './pages/tags';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'tags',
        element: <Tags />,
      },
    ],
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
