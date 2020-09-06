import { action, observable, decorate, computed } from 'mobx';

import { fetchBrowserFingerPrint } from './FingerPrint2Util';
import FingerPrintPreparationUtil from './FingerPrintPreparationUtil';
import IPService from '../../API_Services/AuthServices/IPService';
// ...

class FingerPrintModel {
  constructor(props) {
    console.log(props);
    this.FP = FingerPrintPreparationUtil.FPEmptyObject;
    IPService.getIP((data) => {
      if (data == null) return;
      this.FP.connection.ip = data.ip;
      this.FP.ipObject = data;
      console.log('ip object');
      console.log(data);
    });
    fetchBrowserFingerPrint((result, components) => {
      /// result (browser id)
      if (result != null) this.FP.browser.browser_id = result;

      var userAgent = components.filter((value) => value.key === 'userAgent');
      if (userAgent.length != 1) return;
      userAgent = userAgent[0].value;
      var platform = components.filter((value) => value.key === 'platform');
      if (platform.length != 1) return;
      platform = platform[0].value;
      this.FP.device.type = FingerPrintPreparationUtil.getDeviceType(userAgent);
      this.FP.device.os.name = FingerPrintPreparationUtil.getOSName(userAgent, platform);
      this.FP.device.os.version = FingerPrintPreparationUtil.getOSVersion(this.FP.device.os.name, userAgent);
      this.FP.browser.user_agent = userAgent;

      let browserDetails = FingerPrintPreparationUtil.getBrowserDetails(userAgent);
      this.FP.browser.name = browserDetails[0];
      this.FP.browser.version = browserDetails[1];

      this.FP.app.app_locale = props.language;
    });
  }
}
decorate(FingerPrintModel, {});

export default FingerPrintModel;
