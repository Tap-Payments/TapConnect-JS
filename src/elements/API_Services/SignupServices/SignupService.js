import axios from 'axios';

class SignupService {
  constructor() {
    this.browserID = null;
    this.leadID = null;
    this.updateLead = this.updateLead.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.signUp = this.signUp.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
  }

  getHeaders() {
    return {
      headers: {
        device_identifier: '',
        lead_id: this.leadID,
      },
    };
  }
  async updateLead(body, callback) {
    let reqBody = JSON.parse(JSON.stringify(body));
    delete reqBody.step_type;
    axios
      .post(axios.defaults.connectMW + '/lead', reqBody, this.getHeaders())
      .then(async function (response) {
        console.log(body.step_type);
        let nextStepType = body.step_type++ == 7 ? null : body.step_type++;

        callback(response.data ? { step_type: nextStepType, ...response.data } : null);
      })
      .catch(function (error) {
        callback(null);
      });
  }

  async createAccount(body, callback) {
    let reqBody = JSON.parse(JSON.stringify(body));
    delete reqBody.step_type;
    axios
      .post(axios.defaults.connectMW + '/account', reqBody, this.getHeaders())
      .then(async function (response) {
        let nextStepType = body.step_type++ == 7 ? null : body.step_type++;
        callback(response.data ? { step_type: nextStepType, ...response.data } : null);
      })
      .catch(function (error) {
        callback(null);
      });
  }

  async signUp(body, callback) {
    let reqBody = JSON.parse(JSON.stringify(body));
    delete reqBody.step_type;
    axios
      .post(axios.defaults.connectMW + '/signup', reqBody, this.getHeaders())
      .then(async function (response) {
        let nextStepType = body.step_type++ == 7 ? null : body.step_type++;
        callback(response.data ? { step_type: nextStepType, ...response.data } : null);
      })
      .catch(function (error) {
        callback(null);
      });
  }
}

export default SignupService;
