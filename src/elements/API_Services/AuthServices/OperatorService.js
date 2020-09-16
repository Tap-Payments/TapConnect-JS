import axios from 'axios';
const URL = '/operator';

class OperatorService {
  static async validateOperator(body, callback) {
    let reqBody = body;
    var res;

    await axios
      .post(axios.defaults.connectMW + URL, reqBody)
      .then(async function (response) {
        console.log('response');
        console.log(response);
        if (response) callback(response.data);
      })
      .catch(function (error) {
        callback({ error: 'error' });
      });
  }
}

export default OperatorService;
