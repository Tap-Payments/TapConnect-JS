import React from 'react';
import { Collapse, Fade } from '@material-ui/core';

export default function CollapseFade(props) {
  return (
    <Collapse in={props.in} timeout={{ enter: 1000, exit: 800 }}>
      <div style={{ opacity: props.in ? '1' : '0', transitionDuration: '1200ms' }}>{props.children}</div>
    </Collapse>
  );
}
