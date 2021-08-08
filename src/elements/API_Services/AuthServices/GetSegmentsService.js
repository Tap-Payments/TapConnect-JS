import axios from 'axios';
const URL = 'https://godata.sandbox.tap.company/api/v1/segmenttype/list';
class GetSegmentsService {
  static async getSegmentsData(callback) {
    //// call API, bring raw data
    await axios
      .get(URL)
      .then(async function (response) {
        callback(response.data);
      })
      .catch(function (error) {
        // console.log(error);
        return { error: 'error' };
      });
  }
}

export default GetSegmentsService;
