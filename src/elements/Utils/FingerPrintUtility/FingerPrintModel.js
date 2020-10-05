import { fetchBrowserFingerPrint } from './FingerPrint2Util';
import FingerPrintPreparationUtil from './FingerPrintPreparationUtil';
import IPService from '../../API_Services/AuthServices/IPService';
// ...

class FingerPrintModel {
  constructor(language, onReady) {
    this.FP = FingerPrintPreparationUtil.FPEmptyObject;
    this.operatorObject = null;
    this.language = language;
    this.updateLanguage = this.updateLanguage.bind(this);

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

      /// it will get updated by the Connect model
      this.FP.app.app_locale = this.language;

      this.operatorObject = {
        type: 'website',
        app_client_version: 'connect_JS_VERSION',
        requirer_browser: `${this.FP.browser.name} , ${this.FP.browser.version}`,
        os: `${this.FP.device.os.name} , ${this.FP.device.os.version}`,
        locale: this.language,
      };
      IPService.getIP((data) => {
        if (data == null) {
          if (onReady) onReady();
          return;
        }
        this.FP.connection.ip = data.ip;
        this.FP.ipObject = data;
        console.log('ip object');
        console.log(data);
        if (onReady) onReady();
      });
    });
  }

  updateLanguage(language) {
    if (!language) return;
    this.language = language;
    if (this.FP && this.FP.app && this.FP.app.app_locale) this.FP.app.app_locale = language;
    if (this.operatorObject && this.operatorObject.locale) this.operatorObject.locale = language;
  }
}
export default FingerPrintModel;
