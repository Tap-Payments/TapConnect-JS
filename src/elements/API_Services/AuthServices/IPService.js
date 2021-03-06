import axios from 'axios';
const URL = '/ip';
const TAP_COMPANY_URL = 'https://www.tap.company/iplocation?ip=';

import { SANDBOX_MW_URL, LIVE_MW_URL } from '../index';

class IPService {
  static async getIP(callback) {
    var res;
    await axios
      .get((axios.defaults.connectMW ? axios.defaults.connectMW : LIVE_MW_URL) + URL)
      .then(async function(response) {
        res = response.data;
      })
      .catch(function (error) {
        // console.log(error);
        return { error: 'error' };
      });
    // console.log(res);

    await callback(res);
  }
  static async getCountry(ip, callback) {
    // if (!ip || ip == '') {
    //   callback(null);
    //   return;
    // }
    var res;
    await axios
      .get(TAP_COMPANY_URL + ip)
      .then(async function (response) {
        res = response.data;
      })
      .catch(function (error) {
        // console.log(error);
        return { error: 'error' };
      });
    // console.log(res);

    await callback(res);
  }
}

export default IPService;
