import { createBrowserRouter } from 'react-router-dom';
import Homepage from '@client/features/reminders/pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
]);
