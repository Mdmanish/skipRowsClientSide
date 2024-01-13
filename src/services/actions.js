import axios from 'axios';


// const csrftoken = getCookie('csrftoken');

// Include CSRF token in the headers
// const headers = {
//   'Content-Type': 'application/json',
//   'X-CSRFToken': csrftoken,
// };

export const fetchData = (api, data = null) => {
  return new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:8000/' + api, {params: data})
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
    axios.post('http://127.0.0.1:8000/' + api, data)
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