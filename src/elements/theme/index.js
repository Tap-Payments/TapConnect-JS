import { createMuiTheme } from '@material-ui/core/styles';
import typography from './typography';
import { palette } from './palette';

export const theme = createMuiTheme({
  typography: typography,
  palette: palette,
  overrides: {
    root: {
      fontFamily: 'Nunito, sans-serif, Tajawal',
    },
    MuiTypography: {
      root: {
        fontWeight: 300,
        fontSize: '14px',
        lineHeight: '1.5em',
      },
    },
    MuiOutlinedInput: {
      root: {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
    },
    MuiFormControl: {
      root: {
        width: '100%',
      },
    },
    MuiInputBase: {
      root: {
        width: '100%',
        fontFamily: 'Nunito, sans-serif, Tajawal',
      },
      input: {
        color: '#757575',
        fontSize: '20px',
        fontWeight: '300',
        lineHeight: '1.2',
        letterSpacing: '-0.24px',
        '&::placeholder': {
          opacity: 1,
          color: '#ABA0A3',
          fontWeight: '300',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
    },
    MuiInput: {
      root: {
        width: '100%',
        borderBottom: '1px solid #ebebed',
        fontFamily: 'Nunito, sans-serif, Tajawal',
      },
      underline: {
        '&::before': {
          borderBottom: '0px solid #ebebed',
        },
        '&::after': {
          borderBottom: '0px solid #ebebed',
        },
        '&:hover': {
          '&::before': {
            borderBottom: '0px solid #ebebed !important',
          },
        },
      },
    },
    MuiInputLabel: {
      outlined: {
        fontWeight: '500',
        fontSize: '14px',
        color: '#3c4257',
      },
    },
    MuiCard: {
      root: {
        borderRadius: '12px',
        backgroundColor: 'white',
        display: 'flex',
        overflow: 'hidden',
        boxShadow: '0px 1px 6px #00000030',
        fontFamily: 'Nunito, sans-serif, Tajawal',
        maxWidth: '100%',
      },
    },
    MuiMenu: {
      root: {},
      paper: {
        maxHeight: 'calc(100% - 30px)',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: 'white',
        fontFamily: 'Nunito, sans-serif, Tajawal',
      },
      rounded: {
        borderRadius: '12px',
      },
    },
    MuiIconButton: {
      root: {
        padding: '0px',
        color: '#757575',
      },
    },
    MuiSvgIcon: {
      fontSizeSmall: {
        fontSize: '15px',
      },
    },
    MuiInputAdornment: {
      positionEnd: {
        marginInlineStart: '3px',
      },
    },
    MuiButton: {
      root: {
        width: '100%',
        fontWeight: '300',
        height: '40px',
        textTransform: 'none',
        fontSize: '16px',
      },
      contained: {
        backgroundColor: '#2cbcff',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#16a0f4',
          ['@media']: {
            backgroundColor: '#16a0f4',
          },
        },
      },
      outlined: {
        backgroundColor: 'white',
        color: '#464e56',
        borderWidth: '2px',
        borderRadius: '20px',
        fontSize: '20px',
        fontWeight: '300',
        lineHeight: '1.2',
        letterSpacing: '-0.24px',
        borderColor: '#2cbcff',
        ':hover': {
          borderColor: '#16a0f4',
        },
      },
    },
    MuiLink: {
      underlineHover: {
        textAlign: 'center',
        width: '100%',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    MuiAlert: {
      root: {
        display: 'block',
        padding: '10px',
        fontSize: '13px',
        textAlign: 'center',
        backgroundClip: 'padding-box',
        borderRadius: '3px',
        marginTop: '15px',
        paddingTop: '10px',
        paddingBottom: '10px',
      },
      filledError: {
        color: '#fff',
        backgroundColor: '#ff6f71',
        fontWeight: '300',
      },
      message: {
        padding: '0',
      },
    },
    MuiCheckbox: {
      root: {
        height: '14px',
        width: '14px',
        color: '#d7dadb',
        paddingInlineStart: '0px',
      },
    },
    MuiFormControlLabel: {
      root: {
        textAlign: 'start',
        color: '#464e56',
        fontWeight: '300',
        marginInlineStart: '0px',
        width: '100%',
        marginInlineEnd: '0px',
        position: 'relative',
      },
    },
    MuiDivder: {
      background: '#ebebed',
    },
    MuiDialog: {
      root: {
        backdropFilter: 'blur(4px)',
      },
      paper: {
        ['@media (max-width: 768px)']: {},
        overflowY: 'none',
      },
      paperWidthSm: {
        width: 'min-content',
        minWidth: '361px',
        ['@media (max-width: 768px)']: {
          minWidth: '361px',
        },
        ['@media (max-width: 400px)']: {
          minWidth: '300px',
        },
      },
    },
    MuiPopover: {
      root: {},
      paper: {
        '& *': {
          touchAction: 'auto !important', // used to override material adding touch-action to none on the popover
        },
        maxWidth: 'fit-content',
        position: 'relative',
        borderRadius: '12px',
        ['@media (max-width: 768px)']: {
          maxWidth: 'calc(100% - 5%)',
          maxHeight: 'calc(100% - 3.5%)',
          left: '2.5% !important',
          right: '2.5% !important',
          top: '1.7% !important',
          minWidth: '280px',
        },
      },
    },
  },
});
