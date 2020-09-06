import Fingerprint2 from 'fingerprintjs2';
export function fetchBrowserFingerPrint(cb) {
  if (window.requestIdleCallback) {
    requestIdleCallback(function () {
      Fingerprint2.getV18(function (result, components) {
        if (cb) cb(result, components);
      });
    });
  } else {
    setTimeout(function () {
      Fingerprint2.getV18(function (result, components) {
        if (cb) cb(result, components);
      });
    }, 500);
  }
}
