import axios from 'axios';

export const getUseData = (callback) => {
  axios
    .get('http://localhost:5000/api/auth/')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
