import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pane, Heading, Text, Spinner, Button , UnorderedList , Badge , ListItem } from 'evergreen-ui';
import Link from 'next/link';

const ClubInfo = () => {
  const [clubData, setClubData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = localStorage.getItem('token');
        const clubResponse = axios.get(`${process.env.DRUPAL_API_BASE_URL}/clubpage?_format=json`);
        const userResponse = axios.get(`${process.env.DRUPAL_API_BASE_URL}/user/club1?_format=json`,
        {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': sessionToken,
              
              
               
            },
          });

        const [club, user] = await Promise.all([clubResponse, userResponse]);
        setClubData(club.data);
        setUserData(user.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (!clubData || !userData) {
    return (
      <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner />
      </Pane>
    );
  }

  return (
    <Pane padding={40} background="white" maxWidth={600} marginX="auto">
      <Link href="/user">
        <Button appearance="primary" position="absolute" top={10} right={10} zIndex={1} intent="success">
          Back to Profile
        </Button>
      </Link>
      <Heading size={800} marginBottom={20}>
        {clubData.title[0].value}
      </Heading>
      <Pane marginBottom={20}>
        <Text>
          <strong> SEASON {clubData.field_name_season[0].value} </strong>
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Season Date:</strong> {clubData.field_season_date[0].value} - {clubData.field_season_date[0].end_value}
        </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Telephone Number:</strong>{userData.field_telephone_number[0].value}
         </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Email:</strong>{userData.mail[0].value}
          </Text>
      </Pane>
      <Pane marginBottom={20}>
        <Text>
          <strong>Address:</strong>{userData.field_address[0].value}
          </Text>
      </Pane>
      <Pane background="tint1" padding={10} marginTop={10}>
        <Text><strong>Opening Hours:</strong></Text>
          <UnorderedList>
            {userData.field_opening_hours.map((openinghours, index) => (
              <ListItem key={index} marginBottom={5}>
                <Badge color="green" marginRight={5}>
                 
                </Badge>
                {openinghours.value}
              </ListItem>
            ))}
          </UnorderedList>
        </Pane>
    </Pane>
  );
};

export default ClubInfo;
