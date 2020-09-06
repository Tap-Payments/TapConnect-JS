import axios from 'axios';
import constant_sectors_temp from './const_sector_data.json';
import constant_sectors_temp_updated from './const_sector_data_updated.json';
import constant_types_temp from './const_type_data.json';

const URL = '/sector/list';
class GetSectorsService {
  static async getStaticSectorsData(callback) {
    let sectors = constant_sectors_temp_updated;
    console.log(sectors);
    callback(sectors);
    return;
  }

  static async getSectorsData(page, callback) {
    axios
      .post(axios.defaults.connectMW + URL, {
        limit: 100,
        page: page || 1,
      })
      .then(async function (response) {
        callback(response.data ? response.data : null);
        return;
      })
      .catch(function (error) {
        callback(null);
        return;
      });
  }

  static async getStaticBusinessTypesData(callback) {
    let types = constant_types_temp;
    console.log(types);
    callback(types);
    return;

    var res;

    await axios
      .get(URL)
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
}

export default GetSectorsService;
