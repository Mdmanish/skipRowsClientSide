import axios from 'axios';


// const csrftoken = getCookie('csrftoken');

// Include CSRF token in the headers
// const headers = {
//   'Content-Type': 'application/json',
//   'X-CSRFToken': csrftoken,
// };

// const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_URL = 'https://skiprows.onrender.com/';

export const fetchData = (api, data = null) => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL + api, {params: data})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postBooking = (api, data) => {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL + api, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// function getCookie(name) {
//   const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//   return cookieValue ? cookieValue.pop() : null;
// }