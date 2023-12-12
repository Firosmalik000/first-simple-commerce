import axios from 'axios';

export const getProducts = (callback) => {
  axios
    .get('http://localhost:5000/api/product')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDrinkCategory = (callback) => {
  axios
    .get('http://localhost:5000/api/product?category=drink')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getFoodCategory = (callback) => {
  axios
    .get('http://localhost:5000/api/product?category=food')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getCamilanCategory = (callback) => {
  axios
    .get('http://localhost:5000/api/product?category=camilan')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getNagihTag = (callback) => {
  axios
    .get('http://localhost:5000/api/product?tag=sedap')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getPedesTag = (callback) => {
  axios
    .get('http://localhost:5000/api/product?tag=pedas')
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
//
//
//
// untuk memanggil react router DOM
export const getDetailProduct = (_id, callback) => {
  axios
    .get(`http://localhost:5000/api/product/${_id}`)
    .then((res) => {
      console.log('Detail Product:', data);
      callback(res.data);
    })
    .catch((err) => {
      console.log('Kesalahan dari server:', err);
    });
};
