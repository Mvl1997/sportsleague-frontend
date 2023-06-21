import { useEffect } from 'react';
import { Pane, Heading, Button } from 'evergreen-ui';
import Link from 'next/link';
import backgroundImage from '../images/background.jpeg'; // Import the image

const HomePage = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Check if the user is already authenticated
    if (token) {
      // Perform any necessary action for an authenticated user
    }
  }, []);

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      background={`url(${backgroundImage.src}) center/cover no-repeat`}
    >
      <Heading size={900} marginBottom={20} color="white">
        Welcome to Sportsleague
      </Heading>
      <Link href="/login" passHref>
        <Button appearance="primary" as="a">
          Login
        </Button>
      </Link>
      <Link href="/registration">
  <Button appearance="primary" marginTop={10} intent="success">
    Register
  </Button>
</Link>
    </Pane>
  );
};

export default HomePage;
