import React from 'react';
import TextFieldTemplate from '../Atoms/TextFieldTemplate';
import SimpleDropdown from './SimpleDropdown';

const tapSectorDropdown = 'tap_sector_dropdown';

export default function BusinessNameSector(props) {
  if (!props.infos || props.infos.length < 1) return null;

  return (
    <React.Fragment>
      <TextFieldTemplate textField={props.infos[0]} onMouseDown={props.onMouseDown} />
      <SimpleDropdown
        {...props.infos[1]}
        tapDropdown={tapSectorDropdown}
        tapCardId={props.tapCardId}
        direction={props.direction}
        dropDownIcon={null}
        reference={props.reference}
      />
    </React.Fragment>
  );
}
