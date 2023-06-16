import axios from 'axios';

export const fetchData = async (path) => {
  const apiUrl = process.env.DRUPAL_API_BASE_URL + path;
  const response = await axios.get(apiUrl);
  return response.data;
};
 