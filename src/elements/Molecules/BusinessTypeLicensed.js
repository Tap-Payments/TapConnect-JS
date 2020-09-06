import React from 'react';
import SimpleDropdown from './SimpleDropdown';
import { makeStyles } from '@material-ui/core';

const tapBusinessTypeDropdown = 'tap_business_type_dropdown';
const tapBusinessCountryDropdown = 'tap_business_country_dropdown';

export default function BusinessTypeLicensed(props) {
  if (!props.infos || props.infos[0] === undefined || props.infos[1] === undefined) return null;

  return (
    <React.Fragment>
      <SimpleDropdown
        {...props.infos[1]}
        style={{ paddingTop: '20px' }}
        tapDropdown={tapBusinessCountryDropdown}
        tapCardId={props.tapCardId}
        direction={props.direction}
        reference={props.reference}
      />

      <SimpleDropdown
        {...props.infos[0]}
        style={{ paddingTop: '20px' }}
        tapDropdown={tapBusinessTypeDropdown}
        tapCardId={props.tapCardId}
        direction={props.direction}
        reference={props.reference}
      />
    </React.Fragment>
  );
}
