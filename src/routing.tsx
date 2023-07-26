import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import RootPage from './pages/root';
import HomePage from './pages/root/home';
import SearchResultsPage from './pages/root/search-results';
import TagsPage from './pages/tags';
import api from './services/api-source';

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
          }
        ]
      },
      {
        path: 'tags',
        element: <TagsPage />,
        loader: async () => api.fetchTags(),
      },
    ],
  },
]);

function Routing() {
  return <RouterProvider router={router} />;
}

export default Routing;
