import React from 'react';
import PropTypes from 'prop-types';
import querystring from 'querystring';

const LINKEDIN_MW = '/linkedin';
import axios from 'axios';
export const errors = {
  POPUP_CLOSED: 'popup closed',
  UNKNOWN: 'unknown',
};

/**
 * Documentation for linkedin authorization flow
 * @url https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context
 */
class LinkedinLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this._openPopup = this._openPopup.bind(this);
    this.popup = null;
    this.timer = null;
    this.stateKey = Math.random().toString(36).substring(7);

    this._proceedWithTapsMiddleware = this._proceedWithTapsMiddleware.bind(this);
  }

  /**
   * Automatically close the popup and clear monitor timer
   * to prevent bad behaviors and optimize code execution
   */
  componentWillUnmount() {
    try {
      this.popup.close();
      clearInterval(this.timer);
    } catch (e) {}
  }

  /**
   * Monitor popup to retrieve linkedin signin code
   * We need to catch croos-origin error (from different browsers) to prevent errors to be fired
   */
  _startWatchingCode() {
    const { onSuccess, onError } = this.props;
    this.timer = setInterval(() => {
      try {
        if (!this.popup) {
          clearInterval(this.timer);
        }
        if (this.popup.closed) {
          onError(errors.POPUP_CLOSED);
          clearInterval(this.timer);
          return;
        }
        if (this.popup.location && this.popup.location.search) {
          const search = this.popup.location.search;

          if (search.indexOf('code') !== -1) {
            clearInterval(this.timer);
            const paramsString = search.split('?')[1];
            const params = paramsString ? querystring.parse(paramsString) : {};
            this.popup.close();
            if (params.state === this.stateKey) {
              this._proceedWithTapsMiddleware(params.code);
            }
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-undef
        if (e instanceof DOMException) {
          // If there's a CORS warning => we cannot access the DOM
          // We assume here the user is still on the linkedin page to authorize.
          // Browsers will fire CORS error that are safe to ignore.
          return;
        }
        if (e && e.number && (e.number === -2146828218 || e.number === -2147467259)) {
          // Because IE and Edge do nothing like everbody else
          // => there's an error while waiting for the user is on linkedin (-2146828218)
          // => AND when the popup closes another error is fired (-2147467259)
          return;
        }
        if (typeof onError === 'function') {
          onError(errors.UNKNOWN, e);
        }
      }
    }, 200);
  }
  _proceedWithTapsMiddleware(code) {
    var thiz = this;
    axios
      .post(axios.defaults.connectMW + LINKEDIN_MW, {
        code: code,
        redirect_uri: this.props.redirectUrl,
      })
      .then(async function (response) {
        if (response && response.data && thiz.props.onSuccess) thiz.props.onSuccess(response.data);
        return;
      })
      .catch(function (error) {
        if (thiz.props.onError) thiz.props.onError(error);
        return;
      });
  }
  /**
   * Method to open linkedin popup
   * Requires valid clientId/redirectUrl
   */
  _openPopup() {
    const { clientId, redirectUrl, preventFromOpeningPopup, popupConfig, scopes } = this.props;
    if (typeof preventFromOpeningPopup === 'function' && preventFromOpeningPopup()) {
      return;
    }
    if (!clientId || !redirectUrl) {
      throw new Error('You must provide a client ID and a redirectUrl !');
    }
    if (!Array.isArray(scopes)) {
      throw new Error('You must provide an array on scope props');
    }
    this.popup = window.open(
      `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&state=${
        this.stateKey
      }&scope=${scopes.join('+')}`,
      popupConfig.title || 'Login with linkedin',
      `height=${popupConfig.height || 600},width=${popupConfig.width || 500}`,
    );
    this._startWatchingCode();
  }

  render() {
    if (this.props.render) {
      return this.props.render({ onClick: this._openPopup });
    } else {
      Error('no render method');
      return null;
    }
  }
}

LinkedinLogin.propTypes = {
  clientId: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func]),
  preventFromOpeningPopup: PropTypes.func,
  popupConfig: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  scopes: PropTypes.arrayOf(PropTypes.string),
};

LinkedinLogin.defaultProps = {
  popupConfig: {
    width: 500,
    height: 600,
    title: 'Login with linkedin',
  },
  scopes: ['r_liteprofile', 'r_emailaddress'],
};

export default LinkedinLogin;
