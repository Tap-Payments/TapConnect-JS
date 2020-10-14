import React, { useRef } from 'react';
import { Button, makeStyles, Typography, Divider } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { findLong } from '../Utils/FormUtils/validation';
import MenuWrapper from './MenuWrapper';

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
  menuItem: {
    fontSize: 'unset',
    overflow: 'hidden',
    fontWeight: '400',
    lineHeight: '1.5em',
    whiteSpace: 'nowrap',
    paddingLeft: '16px',
    display: 'block',
    textOverflow: 'ellipsis',
    paddingRight: '16px',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  searchBar: {
    display: 'flex',
    position: 'fixed',
    backgroundColor: 'white',
    padding: '10px',
    paddingBottom: '0px',
    paddingLeft: '16px',
    paddingRight: '16px',
    zIndex: '9999',
    borderRadius: '12px 12px 0px 0px',
  },
}));

export default function SimpleDropdown(props) {
  if (!props.dropdownInfos || !props.renderMenuItem || !props.getSelectedItem) return null;
  const [values, setValues] = React.useState({
    name: props.initialValue,
    dropDownOpen: false,
    dropDownIcon: props.dropDownIcon,
    selectedIndex: props.selectedIndex,
  });

  const classes = useStyles();
  const selectedMenuRef = useRef(null);

  const { t } = useTranslation();

  let maxTextLength = findLong(props.dropdownInfos, props.getTextPattern);

  let dropDownRef = useRef(props.tapDropdown);

  const handleClick = () => {
    setValues({ ...values, dropDownOpen: true });
  };

  React.useEffect(() => {
    setValues({
      ...values,
      name: values.name || props.initialValue,
      dropDownIcon: values.dropDownIcon || props.dropDownIcon,
      selectedIndex: values.selectedIndex || props.selectedIndex,
    });
  }, [props.initialValue, props.dropDownIcon, props.selectedIndex, props.dropdownInfos]);

  const handleClose = (index, item) => {
    console.log(item);
    setValues({
      ...values,
      name:
        item && item !== 'backdropClick' && item !== 'escapeKeyDown' && item !== 'tabKeyDown'
          ? props.getSelectedItem(item)
          : values.name,
      dropdownInfos: props.dropdownInfos,
      selectedIndex: index,
      dropDownIcon:
        item && item !== 'backdropClick' && item !== 'escapeKeyDown' && item !== 'tabKeyDown'
          ? props.getDropdownIcon(item)
          : values.dropDownIcon,
      dropDownOpen: false,
    });
    if (props.onClose) props.onClose(index, item);
  };

  return (
    <div style={props.style}>
      <Button
        aria-controls={props.tapDropdown}
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
      <MenuWrapper
        {...props}
        reference={props.reference}
        t={t}
        dropDownOpen={values.dropDownOpen}
        maxTextLength={maxTextLength}
        dropDownRef={dropDownRef}
        handleClose={handleClose}
        selectedMenuItemRef={selectedMenuRef}
        classes={{
          menuItem: classes.menuItem,
          searchBar: classes.searchBar,
          marginNone: classes.marginNone,
          marginStart: classes.marginStart,
          marginEnd: classes.marginEnd,
        }}
      />
    </div>
  );
}
