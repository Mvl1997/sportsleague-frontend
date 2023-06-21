import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Pane, Heading, Text, TextInput, Button, Link, toaster } from 'evergreen-ui';
import backgroundImage from '../images/background.jpeg';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const csrfToken = await fetchCSRFToken();
  
      const response = await axios.post(
        'https://staging.sportsleague.be/user/login?_format=json',
        {
          name: username,
          pass: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-Token': csrfToken,
          },
        }
      );
  
      // Assuming a successful login
      const { csrf_token: token } = response.data;
  
      // Store the authentication token and UID in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
  
      // Retrieve and store the cookie
      const cookie = response.headers['set-cookie'];
      localStorage.setItem('cookie', cookie);
  
      // Redirect the user to a protected page
      router.push('/user');
    } catch (error) {
      // Handle login error
      setError('Login failed. Please check your credentials.');
      toaster.danger("Login Failed! Please check your credentials.")
    }
  };
  

  // Function to retrieve the CSRF token from the backend
  const fetchCSRFToken = async () => {
    const response = await axios.get(
      'https://staging.sportsleague.be/session/token',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      background={`url(${backgroundImage.src}) center/cover no-repeat`}
      color="white"
    >
      <Heading size={900} marginBottom={20} fontWeight="bold" color="white">
        Login
      </Heading>
      {error && <Text color="danger">{error}</Text>}
      <form onSubmit={handleLogin}>
        <Pane display="flex" flexDirection="column" marginBottom={10} alignItems="center">
          <label>
            <Text
              size={500}
              fontFamily="Arial, sans-serif"
              marginBottom={5}
              fontWeight="bold"
              color="white"
            >
              Username:
            </Text>
            <TextInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </Pane>
        <Pane display="flex" flexDirection="column" marginBottom={10} alignItems="center">
          <label>
            <Text
              size={500}
              fontFamily="Arial, sans-serif"
              marginBottom={5}
              fontWeight="bold"
              color="white"
            >
              Password:
            </Text>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </Pane>
        <Pane display="flex" justifyContent="center">
          <Button type="submit" appearance="primary" fontWeight="bold">
            Login
          </Button>
        </Pane>
      </form>
      <Link href="/">
        <Button appearance="primary" marginTop={10} intent="success">
          Back to Home
        </Button>
      </Link>
    </Pane>
  );
};

export default LoginPage;
