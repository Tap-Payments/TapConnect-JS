import constants from './constants';
import axios from 'axios';
import constant_business_country_temp from './const_business_country_data.json';
const URL = 'https://utilities.tap.company/api/v1/country/list';
const URL_TAP_COUNTRIES = 'https://godatasandbox.payments.tap.company/api/v1/business/country/list';
class GetCountriesService {
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
    await axios
      .get(URL_TAP_COUNTRIES)
      .then(async function (response) {
        callback(response.data);
      })
      .catch(function (error) {
        // console.log(error);
        return { error: 'error' };
      });
  }
}

export default GetCountriesService;
