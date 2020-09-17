import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  alert: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    textAlign: 'center',
    fontSize: 13,
    padding: 10,
    fontWeight: 300,
    borderRadius: 3,
  },
}));

export default function TapAlert(props) {
  const classes = useStyles();

  return (
    <div className={classes.alert}>
      <div>{props.children}</div>
    </div>
  );
}
