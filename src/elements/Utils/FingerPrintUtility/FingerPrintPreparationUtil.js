function getDeviceType(userAgent) {
  if (userAgent.match(/Mobile/i)) {
    return 'Mobile';
  } else if (userAgent.match(/iPad|Android|Touch/i)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}
function getOSName(userAgent, platform) {
  var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os;
}
function getOSVersion(os, userAgent) {
  let osVersion;
  var nVer = navigator.appVersion;
  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
  }

  switch (os) {
    case 'Mac OS':
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(userAgent)[1];
      break;

    case 'Android':
      osVersion = /Android ([\.\_\d]+)/.exec(userAgent)[1];
      break;

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }
  return osVersion;
}
function getBrowserDetails(userAgent) {
  var N = navigator.appName,
    ua = userAgent,
    tem;
  var M = ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) {
    M[2] = tem[1];
  }
  M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
  return M;
}
function updateFingerPrints(navigator1) {
  let userAgent = navigator1.filter((value, index) => value.key === 'user_agent');
  let platform = navigator1.filter((value, index) => value.key === 'navigator_platform');

  let fingerPrint = this.fingerPrint;

  fingerPrint.device.type = this.isMobileDevice(userAgent[0].value) ? 'Mobile' : 'PC';
  fingerPrint.device.os.name = this.getOSName(userAgent[0].value, platform[0].value);
  fingerPrint.device.os.version = this.getOSVersion(fingerPrint.device.os.name, userAgent[0].value);
  fingerPrint.browser.user_agent = userAgent[0].value;

  let browserDetails = this.getBrowserDetails(userAgent[0].value);
  fingerPrint.browser.name = browserDetails[0];
  fingerPrint.browser.version = browserDetails[1];
  fingerPrint.browser.referrer = document.referrer;

  fingerPrint.app.name = this.defaults.service + '_Web';

  // console.log("Fingerprint2 UIStore",fingerPrint);
}

const FPEmptyObject = {
  source: 'browser',
  device: {
    name: '',
    type: '',
    brand: '',
    model: '',
    os: {
      name: '',
      version: '',
    },
  },
  browser: {
    name: '',
    brand: '',
    version: '',
    user_agent: '',
    browser_id: '',
  },
  app: {
    identifier: 'tap_dashboard_sandbox',
    name: 'Tap Dashboard Sandbox',
    version: 'V0.0.0',
    requirer: 'Dashboard',
    requirer_version: 'V0.0.0',
    app_locale: '',
    sdk_version: '',
    requirer_sim_network_name: '',
    requirer_sim_country_iso: '',
    universal_id: '',
  },
  connection: {
    ip: '',
    mac: '',
  },
  entry: {
    name: 'name',
    interface: 'interface',
    type: 'type',
    version: 'version',
  },
};

export default { getDeviceType, getOSName, getOSVersion, getBrowserDetails, updateFingerPrints, FPEmptyObject };
