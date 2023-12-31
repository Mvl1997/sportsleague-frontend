import { useState } from 'react';
import { Pane, Heading, TextInput, Button, Text, Link, toaster, RadioGroup } from 'evergreen-ui';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../css/radiobutton.module.scss';


const RegistrationPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [gender, setGender] = useState('male');
  const [ranking, setRanking] = useState('single');
  const [error, setError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.DRUPAL_API_BASE_URL}/user/register?_format=json`,
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
          mail: [
            {
              value: email,
            },
          ],
          field_birthday: [
            {
              value: birthday,
            },
          ],
          field_e_mail: [
            {
              value: email,
            },
          ],
          field_name: [
            {
              value: name,
            },
          ],
          field_telephone_number: [
            {
              value: telephoneNumber,
            },
          ],
          field_gender: [
            {
              value: gender === 'male', // Convert to boolean
            },
          ],
          field_ranking: [
            {
              value: ranking === 'single', // Convert to boolean
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
      toaster.success('Your registration was succesful!')
      // Redirect the user to the login page
      router.push('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        const responseData = error.response.data;
    
        if (responseData && responseData.message) {
          setError(responseData.message);
          toaster.danger('Registration failed. Please try again.');
        } else {
          setError('Registration failed. Please try again.');
          toaster.danger('Registration failed. Please try again.');
        }
      } else {
        setError('Registration failed. Please try again.');
        toaster.danger('Registration failed. Please try again.');
      }
    }
    
    
  };

  return (
    <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" height="100vh">
      <Link href="/">
        <Button appearance="primary" position="absolute" top={10} right={10} zIndex={1} intent="success">
          Back to Home
        </Button>
      </Link>
      <Pane background="white" padding={40} maxWidth={400}>
        <Heading size={900} marginBottom={20}>
          Registration
        </Heading>
        {error && <Text color="danger">{error}</Text>}
        <form onSubmit={handleRegistration}>
          <Pane marginBottom={16}>
            <Text>Username:</Text>
            <TextInput
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Pane>
          <Pane marginBottom={16}>
            <Text>Password:</Text>
            <TextInput
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Pane>
          <Pane marginBottom={16}>
            <Text>Name:</Text>
            <TextInput
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Pane>
          <Pane marginBottom={16}>
            <Text>Email:</Text>
            <br/>
            <TextInput
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Pane>
          <Pane marginBottom={16}>
            <Text>Birthday: (yyyy-mm-dd)</Text>
            <TextInput
              name="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Pane>
          <Pane marginBottom={16}>
            <Text>Telephone Number:</Text>
            <TextInput
              name="telephoneNumber"
              value={telephoneNumber}
              onChange={(e) => setTelephoneNumber(e.target.value)}
            />
          </Pane>
          <Pane marginBottom={16}>
            <RadioGroup
              name="registration-gender"
              label="Gender"
              size={16}
              value={gender}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              onChange={(value) => setGender(value)}
              marginBottom={8}
              className={styles['custom-radio-group']}
            />
          </Pane>
          <Pane marginBottom={16}>
            <RadioGroup
              name="registration-ranking"
              label="Ranking"
              size={16}
              value={ranking}
              options={[
                { label: 'Single Ranking', value: 'single' },
                { label: 'Double Ranking', value: 'double' },
              ]}
              onChange={(value) => setRanking(value)}
              marginBottom={8}
              className={styles['custom-radio-group']}
            />
          </Pane>
          <Button type="submit" appearance="primary" marginTop={8}>
            Register
          </Button>
        </form>
      </Pane>
      <Pane background="white" padding={20} textAlign="center">
        <Text size={300} color="muted">
          &copy; SportsLeague 2023. All rights reserved. |{' '}
          <Link href="/privacy" target="_blank">
            Privacy Statement
          </Link>
        </Text>
      </Pane>
     
    </Pane>
    
  );
};

export default RegistrationPage;
