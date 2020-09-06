import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: '30px',
    marginBottom: '20px',
  },
}));

export default function TextFieldTemp(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Input
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          if (props.onEnterPressed != null) props.onEnterPressed(ev);
          ev.preventDefault();
        }
      }}
      className={classes.input}
      id={props.id}
      defaultValue={props.initialValue}
      onChange={props.onChange}
      autoFocus={props.autoFocus}
      placeholder={t(props.placeholder)}
      label={t(props.label)}
      margin={props.margin}
      maxLength={props.maxLength}
      name={props.name}
      type={props.type}
      onPaste={props.onPaste}
      variant={props.variant}
      required={props.required}
      style={props.style}
      inputProps={props.inputProps}
      endAdornment={props.endAdornment}
      value={props.value}
    />
  );
}
