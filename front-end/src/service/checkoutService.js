import axios from 'axios';

export const postCheckout = (callback) => {
  axios
    .post('http://localhost:5000/api/order')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
