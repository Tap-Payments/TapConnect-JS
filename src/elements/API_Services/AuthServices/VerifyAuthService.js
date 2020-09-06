import axios from 'axios';
const URL = '/auth';

class VerifyAuthService {
  static async verifyAuth(body, callback) {
    let reqBody = body;

    var res;
    await axios
      .put(axios.defaults.connectMW + URL, reqBody)
      .then(async function (response) {
        res = response.data;
        if (res.code == 200) {
        }
      })
      .catch(function (error) {
        // console.log(error);
        return { error: 'error' };
      });
    // console.log(res);

    await callback(res);
  }
}

export default VerifyAuthService;
