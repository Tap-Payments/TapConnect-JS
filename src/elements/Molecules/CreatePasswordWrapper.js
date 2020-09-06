import React from 'react';
import { useTranslation } from 'react-i18next';
import UserNameButton from '../Atoms/UserNameButton';
import { Link, makeStyles } from '@material-ui/core';
import CreatePasswordTemplate from '../Molecules/CreatePasswordTemplate/CreatePasswordTemplate';

const useStyles = makeStyles((theme) => ({
  checkboxLabel: {
    width: '100%',
    marginBottom: '5px',
    marginTop: '-10px',
  },
  containedButton: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  testerButton: {
    width: 'auto',
    visibility: 'hidden',
    position: 'fixed',
    overflow: 'auto',
    fontSize: '20px',
    fontWeight: '300',
    lineHeight: '1.2',
    letterSpacing: '-0.24px',
  },
}));

export default function CreatePasswordWrapper(props) {
  if (!props.infos || !props.infos.newPasswordInfos) return null;

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>
        <UserNameButton classes={classes} verifyValue={props.infos.verifyValue} t={t}></UserNameButton>
        <span>
          <Link color={'primary'} variant={'body1'} onClick={props.infos.editButtonInfo.onPress}>
            {t(props.infos.editButtonInfo.text)}
          </Link>
        </span>
        {
          <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
            <CreatePasswordTemplate infos={props.infos.newPasswordInfos} onPasswordUpdated={props.onPasswordUpdated} />
          </div>
        }
      </div>
    </React.Fragment>
  );
}
