import React, { useState } from 'react';
import Switch from './Switch';
import { useTheme } from '@material-ui/core';

export default function LicensedSwitch(props) {
  if (!props.infos) return null;
  const [checked, setChecked] = useState(props.infos.checked);

  const theme = useTheme();

  return (
    <label htmlFor="small-radius-switch" style={props.switchStyle}>
      <Switch
        checked={checked}
        onChange={(value) => {
          setChecked(value);
          if (props.infos.onChange) props.infos.onChange(value);
        }}
        handleDiameter={22}
        offColor={theme.palette.text.button}
        onColor={theme.palette.background.secondary}
        offHandleColor={theme.palette.background.secondary}
        onHandleColor={theme.palette.common.white}
        uncheckedIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 10,
              color: 'white',
              paddingRight: 2,
            }}
          >
            {props.offText || 'NO'}
          </div>
        }
        checkedIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 10,
              color: 'white',
              paddingRight: 2,
            }}
          >
            {props.onText || 'YES'}
          </div>
        }
        height={25}
        width={54}
        className="react-switch"
        id="small-radius-switch"
        {...props}
      />
    </label>
  );
}
