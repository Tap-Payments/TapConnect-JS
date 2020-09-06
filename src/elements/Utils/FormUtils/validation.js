export function validateEmailMobile(email) {
  const errors = {};
  var phoneNum = /^\d{8,10}$/;
  const regExp = /^[0-9\b]+$/;

  if (email === undefined || email === null) {
    errors.email = 'login_enter_email';
  } else if (email.trim() === '') {
    errors.email = 'login_invalid_email';
  } else if (email[0].match(regExp) && !email.match(phoneNum)) {
    errors.email = 'login_invalid_mobile_format';
  } else if (
    (!email[0].match(regExp) && email.trim() !== '' && (!email.includes('@') || !email.includes('.'))) ||
    email.charAt(0) === '@' ||
    email.charAt(email.length - 1) === '@' ||
    email.charAt(0) === '.' ||
    email.charAt(email.length - 1) === '.'
  ) {
    errors.email = 'login_invalid_email_format';
  }

  return errors;
}

export function validatePassword(password) {
  const errors = {};
  const regExp = /^[0-9\b]+$/;
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  if (password === undefined || password === null) {
    errors.password = 'login_enter_password';
  } else if (password.trim() === '') {
    errors.password = 'login_invalid_password';
  }
  // else if (!password.match(passw)) {
  //   errors.password = 'login_invalid_password_format';
  // }
  return errors;
}

export function validateOTP(otp) {
  const errors = {};
  const regExp = /^[0-9\b]+$/;

  if (otp === undefined || otp === null) {
    errors.otp = 'login_enter_otp';
  } else if (otp.trim() === '') {
    errors.otp = 'login_invalid_otp';
  } else if (!otp.match(regExp)) {
    errors.otp = 'login_invalid_otp_format';
  }
  return errors;
}

//// true => Mobile
//// false => Email
//// null => undefined
export function isMobile(text) {
  // var phoneNum = /^\d{8,10}$/;
  const regExp = /^[0-9\b]+$/;

  if (text === undefined) {
    return null;
  } else if (text.trim() === '') {
    return null;
  } else if (text.match(regExp)) {
    return true;
  }
  return false;
}

export function validateBusinessName(name) {
  const errors = {};
  if (!name || name === '') errors.name = 'signup_business_name_error';
  return errors;
}

export function validateBusinessSector(sectorID) {
  const errors = {};
  if (!sectorID || sectorID === '') errors.name = 'signup_sector_error';
  return errors;
}

export function validateBusinessType(typeID) {
  const errors = {};
  if (!typeID || typeID === '') errors.name = 'signup_business_type_error';
  return errors;
}

export function validateBusinessCountry(countryID) {
  const errors = {};
  if (!countryID || countryID === '') errors.name = 'signup_business_country_error';
  return errors;
}

export function validateUserName(firstName, lastName) {
  const errors = {};

  if (!firstName || firstName === '') {
    errors.name = 'signup_user_first_name_error';
    return errors;
  }

  if (!lastName || lastName === '') {
    errors.name = 'signup_user_last_name_error';
    return errors;
  }
  return errors;
}

export function validateNewPassword(pass) {
  const errors = {};
  console.log(pass);
  console.log('validation');
  if (!pass || pass === '') {
    errors.name = 'signup_incorrect_password_form_error';
    return errors;
  }

  return errors;
}

export function findLong(array, itemEndPattern) {
  var longestWord = '';

  if (array != null && array.length > 0)
    array.map((item) => {
      if (!eval(itemEndPattern)) return;
      if (eval(itemEndPattern).length > longestWord.length) {
        longestWord = eval(itemEndPattern);
      }
    });

  return longestWord.length / 1.6;
}
