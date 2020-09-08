import constants from './constants';
import axios from 'axios';
import constant_business_country_temp from './const_business_country_data.json';
import constant_country_temp from './constant_country_temp.json';
const URL = 'https://utilities.tap.company/api/v1/country/list';
class GetCountriesService {
  static async getStaticCountriesData(callback) {
    callback(constant_country_temp);
    return;

    var res;

    await axios
      .post(URL)
      .then(async function (response) {
        console.log(response);

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
  static async getCountriesData(callback) {
    //// call API, bring raw data

    await axios
      .post(URL)
      .then(async function (response) {
        callback(response.data);
      })
      .catch(function (error) {
        // console.log(error);
        return { error: 'error' };
      });
  }

  static async getStaticBusinessCountryData(callback) {
    callback(constant_business_country_temp);
  }
}

export default GetCountriesService;
