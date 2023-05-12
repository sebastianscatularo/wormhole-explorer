import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import Result, { resultLoader } from './result';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/:id',
    element: <Result />,
    loader: resultLoader
  }
]);

export default router;