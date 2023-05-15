import { createBrowserRouter, redirect } from 'react-router-dom';
import Root, { configurationLoader } from './Root';
import SearchResult, { resultLoader } from './SearchResult';
import Inpector from './Inspector';
import Search, { searchAction } from './Search';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/mainnet'),    
  },
  {
    path: '/:network',
    element: <Root />,
    loader: configurationLoader,
    id: 'root',
    children: [
      {
        index: true,
        element: <Search />,
        action: searchAction
      },
      {
        path: 'inspector',
        element: <Inpector />
      },
      {
        path: 'inspector/:vaa',
        element: <Inpector />
      }
    ],
    errorElement: <ErrorPage />
  }
  
], {
  basename: process.env.PUBLIC_URL
});

export default router;