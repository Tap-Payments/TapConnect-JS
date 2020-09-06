import React from 'react';
import { Dialog, Slide, Fade } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { AnimationType } from '../Constants/constants';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TransitionDown = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const TransitionLeft = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const TransitionRight = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function TapDialog(props) {
  const themeMUI = useTheme();
  const classes = useStyles();

  return (
    <Dialog
      onTransitionEnd={(e) => console.log(e)}
      dir={themeMUI.direction}
      TransitionComponent={props.animation}
      transitionDuration={props.animationDuration}
      onClose={props.onClose}
      open={props.open}
    >
      {props.children}
    </Dialog>
  );
}

class AnimationEngine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      animation: Fade,
    };
  }

  componentWillMount() {
    console.log(this.props.animationType);

    let Transition = Fade;
    switch (this.props.animationType) {
      case 'fade':
        Transition = Fade;
        break;
      case 'up':
        Transition = TransitionUp;
        break;
      case 'down':
        Transition = TransitionDown;
        break;
      case 'left':
        Transition = TransitionLeft;
        break;
      case 'right':
        Transition = TransitionRight;
        break;
      default:
        Transition = Fade;
        break;
    }
    this.setState({
      animation: Transition,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ open: props.open });
  }

  handleClose() {
    if (this.props.closeOnOutsideClick) {
      this.setState({
        open: false,
      });

      if (this.props.onClose) this.props.onClose();
      if (this.props.onCancel) this.props.onCancel();
    }
  }

  render() {
    return (
      <TapDialog
        animationDuration={this.props.animationDuration}
        animation={this.state.animation}
        onClose={this.handleClose.bind(this)}
        open={this.state.open}
      >
        {this.props.children}
      </TapDialog>
    );
  }
}

AnimationEngine.defaultProps = {
  open: true,
  animationType: AnimationType.FADE,
  animationDuration: 500,
  closeOnOutsideClick: false,
};

export default AnimationEngine;
