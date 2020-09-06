import React from 'react';
import TextFieldTemplate from '../Atoms/TextFieldTemplate';
import { Fragment } from 'react';
import { Grid } from '@material-ui/core';

import FacebookLogin from '../SocialMedia/FacebookPackage/facebook';

import GoogleLogin from '../SocialMedia/GooglePackage/google-login';
import LinkedinLogin from '../SocialMedia/LinkedInPackage/linkedin';
import { useTranslation } from 'react-i18next';
const googleID = '189258383847-l70k89h93v91vec8lh7d1fngmu2h7acd.apps.googleusercontent.com';
const facebookID = '326447231821294';
const linkedinID = '77lvz7lhirj24m';

import { FacebookButton, LinkedinButton, GoogleButton, SocialMediaDivider } from './SocialMediaButtons';
export default function UserTemplate(props) {
  if (!props.textField || props.textField.length != 2) return null;
  const { t } = useTranslation();

  const responseFacebook = (res) => {
    console.log(`%cresponse Facebook `, 'background:blue;');
    console.log(res);
    if (res) {
      let data = {
        _social_media_platform: 'facebook',
        first_name: res.first_name,
        last_name: res.last_name,
        profile_photo: res.picture && res.picture.data && res.picture.data.url,
        email: res.email,
      };
      updateSocialMediaCallback(data);
    }
  };

  const responseGoogle = (res) => {
    console.log(`%cresponse Google `, 'background:green;');
    console.log(res);
    if (res && res.profileObj) {
      let data = {
        _social_media_platform: 'google',
        first_name: res.profileObj.givenName,
        last_name: res.profileObj.familyName,
        profile_photo: res.profileObj.imageUrl,
        email: res.profileObj.email,
      };
      updateSocialMediaCallback(data);
    }
  };

  const responseLinkedin = (res) => {
    console.log(`%cresponse Linkedin `, 'background:aqua;');
    console.log(res);
    if (res) {
      let data = {
        _social_media_platform: 'linkedin',
        first_name: res.localizedFirstName,
        last_name: res.localizedLastName,
        profile_photo: res.profilePicture,
        email: '',
      };
      updateSocialMediaCallback(data);
    }
  };

  const updateSocialMediaCallback = (metaData) => {
    if (props.textField && props.textField[0] && props.textField[0].onSocialMediaFetch)
      props.textField[0].onSocialMediaFetch(metaData);
  };
  return (
    <Fragment>
      <Grid container direction="column" alignItems="stretch">
        {props.textField && props.textField[0] && <TextFieldTemplate textField={props.textField[0]} />}
        {props.textField && props.textField[1] && (
          <TextFieldTemplate textField={props.textField[1]} style={{ marginTop: '0px' }} />
        )}
      </Grid>

      <SocialMediaDivider>{t('signup_social_media_helper')}</SocialMediaDivider>

      <Grid container style={{ justifyContent: 'center', marginTop: '20px' }} direction="row">
        <FacebookLogin
          appId={facebookID}
          autoLoad
          cookie
          xfbml
          callback={responseFacebook}
          render={(renderProps) => <FacebookButton {...renderProps} />}
        />
        <GoogleLogin
          clientId={googleID}
          render={(renderProps) => <GoogleButton {...renderProps} />}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <LinkedinLogin
          clientId={linkedinID}
          redirectUrl={window.location.origin}
          onSuccess={responseLinkedin}
          onError={responseLinkedin}
          render={(renderProps) => <LinkedinButton {...renderProps} />}
        />
      </Grid>
    </Fragment>
  );
}
