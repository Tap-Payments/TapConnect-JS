import React from 'react';
import { Card } from '@material-ui/core';

export default function TapCard(props) {
  return (
    <Card variant="outlined" ref={props.reference}>
      {props.children}
    </Card>
  );
}
