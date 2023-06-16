import { useRouter } from 'next/router';
import withAuth from '../utils/withAuth';

const ProtectedPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');

    // Redirect the user to the login page or any other desired location
    router.push('/login');
  };

  const handleRegistration = () => {
    // Redirect the user to the registration page
    router.push('/registration');
  };

  return (
    <div>
      <h1>Protected Page</h1>
      {/* Page content */}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default withAuth(ProtectedPage);
