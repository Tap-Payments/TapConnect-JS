import axios from 'axios';

class ForgotPasswordService {
  constructor() {
    this.browserID = null;
    this.getHeaders = this.getHeaders.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.confirmOTP = this.confirmOTP.bind(this);
  }

  getHeaders() {
    return {
      headers: {
        browser_identifier: this.browserID,
        device_identifier: '',
      },
    };
  }

  async setPassword(body, callback) {
    // callback({ status: 'pending', auth_token: 'static_auth_token' });
    // return;
    let reqBody = JSON.parse(JSON.stringify(body));
    axios
      .post(axios.defaults.connectMW + '/password/reset', reqBody, this.getHeaders())
      .then(async function (response) {
        callback(response.data ? { ...response.data } : null);
      })
      .catch(function (error) {
        callback(null);
      });
  }
  async confirmOTP(body, callback) {
    // callback({ status: 'verified' });
    // return;
    let reqBody = JSON.parse(JSON.stringify(body));
    axios
      .put(axios.defaults.connectMW + '/password/reset', reqBody, this.getHeaders())
      .then(async function (response) {
        callback(response.data ? { ...response.data } : null);
      })
      .catch(function (error) {
        callback(null);
      });
  }
}

export default ForgotPasswordService;
