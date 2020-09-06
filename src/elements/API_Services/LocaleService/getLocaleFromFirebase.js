import axios from 'axios';
const URL = 'https://godashboard-9c8a8.firebaseio.com/testing/locale.json';

export async function getLocaleFromFirebase(callback) {
  var res;

  await axios
    .get(URL)
    .then(async function (response) {
      console.log(response);
      res = response.data;
    })
    .catch(function (error) {
      // console.log(error);
      return { error: 'error' };
    });

  await callback(res);
}
