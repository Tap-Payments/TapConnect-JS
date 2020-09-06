import axios from 'axios';

const URL = '/auth';

class CreateAuthService {
  static async getLoginFormData(callback) {
    setTimeout(() => {
      callback({ data: 'no data' });
    }, 200);
  }
  static async createAuth(body, callback) {
    let reqBody = body;

    var res;
    await axios
      .post(axios.defaults.connectMW + URL, reqBody)
      .then(async function (response) {
        if (response.status == 200) {
          res = response.data;
        } else res = { errors: [{ description: 'login_invalid_credentials' }] };
      })
      .catch(function (error) {
        // console.log(error);
        return { error: 'error' };
      });
    // console.log(res);

    await callback(res);
  }
}

export default CreateAuthService;
