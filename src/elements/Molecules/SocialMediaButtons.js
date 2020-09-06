import React, { Fragment } from 'react';
import { Button, Grid, SvgIcon, makeStyles, Divider } from '@material-ui/core';
const facebookIconPAth = (
  <path d="M15.398.006L11.56 0C7.248 0 4.462 2.801 4.462 7.137v3.29H.603A.598.598 0 000 11.02v4.768c0 .327.27.591.603.591h3.859v12.03c0 .327.27.592.603.592H10.1a.597.597 0 00.603-.591v-12.03h4.512a.597.597 0 00.603-.592l.002-4.768a.586.586 0 00-.177-.418.61.61 0 00-.427-.174h-4.513V7.639c0-1.34.326-2.021 2.109-2.021l2.585-.001A.597.597 0 0016 5.024V.597c0-.326-.27-.59-.602-.591z"></path>
);
const googleIconPAth = (
  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
);
const linkedinIconPath = (
  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
);
const useStyles = makeStyles((theme) => ({
  socialMediaIcon: { fontSize: ' 1.2rem', color: 'inherit' },
  socialMediaButton: {
    margin: '0px 12px',
    background: theme.palette.common.white,
    color: '#26374C', //theme.palette.common.black,
    width: '40px',
    height: '40px',
    border: 'solid 1px',
    borderColor: '#ebebed',
    borderRadius: '12px',
    display: 'inline-flex',
    transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
    alignItems: 'center',
    justifyContent: 'center',

    padding: '0',
    '&:hover': {
      background: '#26374C', //theme.palette.common.black,
      color: theme.palette.common.white,
      cursor: 'pointer',
    },
  },
  dividerText: {
    padding: '0px 12px',
    background: theme.palette.common.white,
    fontSize: '13px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: '300',
    whiteSpace: 'nowrap',
  },
}));
export function FacebookButton(props) {
  let classes = useStyles();

  return (
    <Grid className={classes.socialMediaButton} {...props}>
      <SvgIcon className={classes.socialMediaIcon} viewBox="0 0 16 29">
        {facebookIconPAth}
      </SvgIcon>
    </Grid>
  );
}
export function LinkedinButton(props) {
  let classes = useStyles();

  return (
    <Grid className={classes.socialMediaButton} {...props}>
      <SvgIcon className={classes.socialMediaIcon} viewBox="0 0 24 24">
        {linkedinIconPath}
      </SvgIcon>
    </Grid>
  );
}
export function GoogleButton(props) {
  let classes = useStyles();

  return (
    <Grid className={classes.socialMediaButton} {...props}>
      <SvgIcon className={classes.socialMediaIcon}>{googleIconPAth}</SvgIcon>
    </Grid>
  );
}
export function SocialMediaDivider(props) {
  let classes = useStyles();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '15px 0px',
        overflow: 'hidden',
      }}
    >
      <Divider style={{ width: '-webkit-fill-available' }} />
      <div className={classes.dividerText}>{props.children}</div>
      <Divider style={{ width: '-webkit-fill-available' }} />
    </div>
  );
}
