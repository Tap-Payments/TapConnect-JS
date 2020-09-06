import React, { Component } from 'react';
import './assests/css/DropDown.css';

function DropDownItem(props) {
  const textStart = props.textStart;
  const textEnd = props.textEnd;
  const style = props.selected ? { backgroundColor: '#DBDBDB' } : { color: '' };

  return (
    <div
      dir={props.direction}
      className="tap-input-dropdown-menuitem"
      style={style}
      id={props.id}
      onClick={props.onClick}
    >
      <span style={{ float: props.direction === 'ltr' ? 'left' : 'right', paddingInlineEnd: '10px' }}>
        {props.textEndIsImage ? (
          <img style={{ height: '25px', width: '25px', borderRadius: '50px' }} src={textEnd} />
        ) : (
          textEnd
        )}
      </span>
      <span dir={'ltr'} style={{ float: props.direction === 'ltr' ? 'right' : 'left' }}>
        {props.textStartIsImage ? (
          <img style={{ height: '25px', width: '25px', borderRadius: '50px' }} src={textStart} />
        ) : (
          textStart
        )}
      </span>
    </div>
  );
}

export default DropDownItem;
