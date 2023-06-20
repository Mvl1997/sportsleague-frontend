import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pane, Heading, Text, Spinner, UnorderedList, ListItem, Badge, Button, TextInput } from 'evergreen-ui';
import { useRouter } from 'next/router';

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInPlayerUsername = localStorage.getItem('username');
        const sessionToken = localStorage.getItem('token');
        const response = await axios.get(
          `https://staging.sportsleague.be/user/${loggedInPlayerUsername}?_format=json`,
          
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': sessionToken,
              
              
               
            },
          }
        );
        const user = response.data;
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cookie');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `https://staging.sportsleague.be/user/${userData.name[0].value}?_format=json`,
        userData,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
          },
          
        }
      );
      const updatedUser = response.data;
      setUserData(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  if (!userData) {
    return (
      <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner />
      </Pane>
    );
  }

  return (
    <Pane padding={40} background="white" maxWidth={600} marginX="auto">
      <Button
        appearance="primary"
        onClick={handleLogout}
        position="absolute"
        top={10}
        right={10}
        zIndex={1}
      >
        Logout
      </Button>
      <Heading size={800} marginBottom={20}>
        Welcome, {userData.name[0].value}
      </Heading>
      <Pane marginBottom={20}>
        <Text>
          <strong>Name:</strong>
          {editMode ? (
            <TextInput
              name="field_name"
              value={userData.field_name[0].value}
              onChange={handleInputChange}
            />
          ) : (
            userData.field_name[0].value
          )}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Birthday:</strong>
          {editMode ? (
            <TextInput
              name="field_birthday"
              value={userData.field_birthday[0].value}
              onChange={handleInputChange}
            />
          ) : (
            userData.field_birthday[0].value
          )}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Telephone Number:</strong>
          {editMode ? (
            <TextInput
              name="field_telephone_number"
              value={userData.field_telephone_number[0].value}
              onChange={handleInputChange}
            />
          ) : (
            userData.field_telephone_number[0].value
          )}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Email:</strong>
          {editMode ? (
            <TextInput
              name="mail"
              value={userData.mail[0].value}
              onChange={handleInputChange}
            />
          ) : (
            userData.mail[0].value
          )}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Member Since:</strong> {userData.created[0].value}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Changed:</strong> {userData.changed[0].value}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Gender:</strong> {userData.field_gender[0].value ? 'Male' : 'Female'}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Ranking:</strong> {userData.field_ranking[0].value ? 'Single Ranking' : 'Double Ranking'}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Availability:</strong>
        </Text>
        <Pane background="tint1" padding={10} marginTop={10}>
          <UnorderedList>
            {userData.field_availability.map((availability, index) => (
              <ListItem key={index} marginBottom={5}>
                <Badge color="green" marginRight={5}>
                  {index + 1}
                </Badge>
                {availability.value}
              </ListItem>
            ))}
          </UnorderedList>
        </Pane>
      </Pane>
      {editMode ? (
        <Button appearance="primary" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button appearance="primary" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </Pane>
  );
};

export default UserPage;
