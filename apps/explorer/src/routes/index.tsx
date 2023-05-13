import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import Result, { resultLoader } from './result';
import { Inpector } from './Inspector';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/:id',
    element: <Result />,
    loader: resultLoader
  },
  {
    path: '/inspector',
    element: <Inpector />
  }
], {
  basename: process.env.PUBLIC_URL
});

export default router;