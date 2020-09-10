import React, { useState } from 'react';
import { Dialog, Slide, Fade, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { AnimationType } from '../Constants/constants';
import { useTranslation } from 'react-i18next';

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
  const [animation, setAnimation] = useState(props.animation);

  const transitionEndHandler = () => {
    if (animation != props.animation) setAnimation(props.animation);
  };
  return (
    <Dialog
      hideBackdrop
      onExited={(e) => {
        /// wait till animation is done, then update the animation type if there is a new one
        /// then, callback
        console.log('%c Animation Exited', 'background:pink; color:black;');
        transitionEndHandler();
        if (props.onExited) props.onExited();
      }}
      dir={themeMUI.direction}
      TransitionComponent={animation}
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
      openAlert: false,
      isConfirmClosePopup: false,
      animation: Fade,
    };

    this.getAnimation = this.getAnimation.bind(this);
    this.handleAlertPressNo = this.handleAlertPressNo.bind(this);
    this.handleAlertPressYes = this.handleAlertPressYes.bind(this);
  }

  componentWillMount() {
    this.setState({
      animation: this.getAnimation(this.props.animationType),
    });
  }

  getAnimation(animationType) {
    let Transition = Fade;
    switch (animationType) {
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

    return Transition;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.animationType !== prevProps.animationType) {
      this.setState({
        animation: this.getAnimation(this.props.animationType),
      });
    }

    if (this.props.open !== prevProps.open) {
      this.setState({
        open: this.props.open,
      });
    }
  }

  handleAlertPressNo() {
    this.setState({
      openAlert: false,
    });
  }

  handleAlertPressYes() {
    this.setState({
      openAlert: false,
    });
    setTimeout(() => {
      this.setState({
        open: false,
      });
      if (this.props.onClose) this.props.onClose();
      if (this.props.onCancel) this.props.onCancel();
    }, 200);
  }

  handleClose() {
    if (this.props.closeOnOutsideClick) {
      this.setState({
        openAlert: true,
      });
    }
  }

  render() {
    if (this.props.bypass) return this.props.children;

    return (
      <TapDialog
        onExited={this.props.onExited}
        direction={this.props.direction}
        animationDuration={this.props.animationDuration}
        animation={this.state.animation}
        onClose={this.handleClose.bind(this)}
        open={this.state.open}
      >
        {this.props.children}
        <TapAlert
          direction={this.props.direction}
          openAlert={this.state.openAlert}
          handleAlertPressNo={this.handleAlertPressNo}
          handleAlertPressYes={this.handleAlertPressYes}
        />
      </TapDialog>
    );
  }
}

function TapAlert(props) {
  const { t } = useTranslation();
  return (
    <Dialog open={props.openAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle dir={props.direction} id="alert-dialog-title">
        {t('popup_alert')}
      </DialogTitle>
      <DialogActions dir={props.direction}>
        <Button onClick={props.handleAlertPressNo} color="primary">
          {t('no')}
        </Button>
        <Button onClick={props.handleAlertPressYes} color="primary" autoFocus>
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AnimationEngine.defaultProps = {
  open: true,
  animationType: AnimationType.FADE,
  animationDuration: 500,
  closeOnOutsideClick: false,
};

export default AnimationEngine;
