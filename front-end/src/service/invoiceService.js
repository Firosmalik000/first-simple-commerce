import axios from 'axios';

export const postInvoice = (callback) => {
  axios
    .post('http://localhost:5000/api/invoice')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
