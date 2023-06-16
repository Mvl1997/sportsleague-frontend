// utils/withAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If the user is not authenticated, redirect to the login page
        router.push('/login');
      }
    }, [router]);

    // Render the protected component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
