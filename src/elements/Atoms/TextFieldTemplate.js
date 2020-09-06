import React from 'react';
import TextFieldTemp from './TextField';
import { InputAdornment, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

export default function TextFieldTemplate(props) {
  const [values, setValues] = React.useState({
    value: '',
  });

  const handleOnChange = (event) => {
    setValues({ value: event.target.value });
    if (props.textField.onChange != null) props.textField.onChange(event);
  };

  const clearData = () => {
    setValues({ value: '' });
    if (props.textField.clear != null) props.textField.clear();
  };
  const propsValue = props.textField ? props.textField.value : null;
  return (
    <TextFieldTemp
      {...props.textField}
      onChange={handleOnChange}
      style={props.style}
      onPaste={props.onPaste}
      value={propsValue || values.value}
      endAdornment={
        (propsValue && props.value !== '') || (values.value && values.value !== '') ? (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={clearData} onMouseDown={props.onMouseDown}>
              {<ClearIcon fontSize="small" />}
            </IconButton>
          </InputAdornment>
        ) : null
      }
    />
  );
}
