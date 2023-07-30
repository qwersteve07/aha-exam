import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import RootPage from './pages/root';
import HomePage from './pages/root/home';
import SearchResultsPage from './pages/root/search-results';
import TagsPage from './pages/tags';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <RootPage />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: 'search',
            element: <SearchResultsPage />,
          },
        ],
      },
      {
        path: 'tags',
        element: <TagsPage />,
      },
    ],
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
