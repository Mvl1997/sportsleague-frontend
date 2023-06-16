import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const RegistrationPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://sportsleague-backend.ddev.site/user/register?_format=json',
        {
          name: [
            {
              value: username,
            },
          ],
          pass: [
            {
              value: password,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Assuming a successful registration
      console.log(response.data);
      // Redirect the user to the login page
      router.push('/login');
    } catch (error) {
      // Handle registration error
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegistration}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
