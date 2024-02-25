import { Navigate } from 'react-router-dom';
import routes from '../constants/routes';
import useAuthStore from '../store/authStore';

export default function ProtectedRoute({ children }: any) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to={routes.login} />;
  }
  return children;
}
