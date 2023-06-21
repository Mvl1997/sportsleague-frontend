import { useState } from 'react';
import { Pane, Heading, TextInput, Button, Text, Link, Radio, RadioGroup } from 'evergreen-ui';
import { useRouter } from 'next/router';
import axios from 'axios';

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
        'https://staging.sportsleague.be/user/register?_format=json',
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
      // Redirect the user to the login page
      router.push('/login');
    } catch (error) {
      // Handle registration error
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
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
            <br />
            <TextInput
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Pane>
          <Pane marginBottom={16}>
            <Text>Birthday:</Text>
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
              label="Gender"
              size= {16}
              value={gender}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              onChange={(value) => setGender(value)}
              marginBottom={8}
            />
          </Pane>
          <Pane marginBottom={16}>
            <RadioGroup
              label="Ranking"
              size={16}
              value={ranking}
              options={[
                { label: 'Single Ranking', value: 'single' },
                { label: 'Double Ranking', value: 'double' },
              ]}
              onChange={(value) => setRanking(value)}
              marginBottom={8}
            />
          </Pane>
          <Button type="submit" appearance="primary" marginTop={8}>
            Register
          </Button>
        </form>
      </Pane>
    </Pane>
  );
};

export default RegistrationPage;
