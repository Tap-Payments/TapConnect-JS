import React, { useRef, useEffect } from 'react';
import { makeStyles, Popover, Button, Typography, Divider } from '@material-ui/core';
import { findLong } from '../Utils/FormUtils/validation';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import DropDownWrapper from './DropDownWrapper';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: '30px',
    marginBottom: '20px',
  },
  marginStart: {
    marginInlineStart: '-10px',
  },
  marginEnd: {
    marginInlineStart: '10px',
  },
  marginNone: {
    marginInlineStart: '0px',
  },
  buttonText: {
    // padding: '6px 0px',
    color: theme.palette.text.button,
    paddingInlineEnd: '0px',
    paddingInlineStart: '0px',
    ...theme.typography.h3,
  },
  buttonLabel: {
    justifyContent: 'space-between',
  },
  bottomPadding: {
    paddingBottom: '20px',
  },
}));

export default function ButtonWithDropdown(props) {
  let classes = useStyles();
  const { t } = useTranslation();

  const [values, setValues] = React.useState({
    dropdownInfos: [],
    dropDownOpen: false,
    name: props.initialValue,
    dropDownIcon: props.dropDownIcon,
    selectedIndex: props.selectedIndex,
  });

  React.useEffect(() => {
    setValues({
      ...values,
      name: values.name || props.initialValue,
      dropDownIcon: values.dropDownIcon || props.dropDownIcon,
      selectedIndex: values.selectedIndex || props.selectedIndex,
    });
  }, [props.initialValue, props.dropDownIcon, props.selectedIndex]);

  let dropDownRef = useRef(props.tapDropdown);
  let maxTextLength = findLong(props.dropdownInfos, props.itemEndPattern);

  const handleClose = (index, item) => {
    console.log(item);
    setValues({
      ...values,
      dropdownInfos: [],
      dropDownOpen: false,
      dropDownIcon:
        item !== 'backdropClick'
          ? props.itemStartIsImage
            ? eval(props.itemStartPattern)
            : values.dropDownIcon
          : values.dropDownIcon,
      name:
        item !== 'backdropClick'
          ? (props.getItemStart ? eval(props.itemStartPattern) : eval(props.itemEndPattern)) || values.name
          : values.name,
      selectedIndex: index || values.selectedIndex,
    });
    if (props.onClose != null) props.onClose(index, item);
  };

  const handleClick = (event) => {
    if (!values.dropDownOpen) {
      let countryLetterInput = document.getElementById('input ' + props.tapDropdown);
      setTimeout(
        function () {
          if (countryLetterInput) {
            countryLetterInput.focus();
            if (values.selectedIndex > 3) {
              document.getElementById(props.tapDropdown).scrollTop = 45 * (values.selectedIndex - 2);
            }
          }
        }.bind(this),
        10,
      );
      setValues({ ...values, dropdownInfos: props.dropdownInfos, dropDownOpen: true });
    } else {
      setValues({ ...values, dropdownInfos: [], dropDownOpen: false });
    }
  };

  return (
    <div className={classes.bottomPadding} style={props.style}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        classes={{ label: classes.buttonLabel, text: classes.buttonText }}
      >
        <Typography variant={'h3'}>{t(values.name ? values.name : props.placeholder)}</Typography>
        {values.dropDownIcon ? (
          <img src={values.dropDownIcon} style={{ height: '25px', width: '25px', borderRadius: '50px' }} />
        ) : (
          <KeyboardArrowDownIcon viewBox={'0 0 19 19'} style={{ fontSize: '18px' }} />
        )}
      </Button>
      <Divider />

      <Popover
        anchorOrigin={{
          vertical: 'top',
          horizontal: window.innerWidth <= '768' ? 'center' : props.direction === 'rtl' ? 'right' : 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: window.innerWidth <= '768' ? 'center' : props.direction === 'rtl' ? 'left' : 'right',
        }}
        classes={{
          paper:
            window.innerWidth <= '768'
              ? classes.marginNone
              : props.direction === 'rtl'
              ? classes.marginEnd
              : classes.marginStart,
        }}
        anchorEl={props.reference.current}
        open={values.dropDownOpen}
        onClose={handleClose}
      >
        <DropDownWrapper
          id={props.tapDropdown}
          dropDownRef={dropDownRef}
          direction={props.direction}
          searchPattern={props.searchPattern}
          itemStartPattern={props.itemStartPattern}
          itemStartIsImage={props.itemStartIsImage}
          itemEndPattern={props.itemEndPattern}
          dropdownInfos={props.dropdownInfos}
          selectedIndex={values.selectedIndex}
          onClose={handleClose}
          showPlus={false}
          tapCardId={props.tapCardId}
          maxTextLength={maxTextLength}
        />
      </Popover>
    </div>
  );
}

ButtonWithDropdown.defaultProps = {
  getItemStart: true,
  dropDownIcon: null,
};
