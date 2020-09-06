import { isMobile } from './FormUtils/validation';
export function prepareBusinessNameRequest(businessName, selectedSectorId, brandName) {
  return {
    business_name: {
      en: businessName,
    },
    brand: {
      name: {
        en: brandName,
      },
      // sector: ['sector_4iF2veqGgvhrW75'],
      sector: [selectedSectorId],
    },
    country: 'KW',
  };
}

export function prepareBusinessTypeRequest(businessType, businessCountry) {
  return {
    business_type: businessType,
  };
}
export function prepareBusinessLicensedRequest(isLicensed) {
  return {
    is_licensed: isLicensed ? isLicensed : false,
  };
}
export function prepareUserNameRequest(firstName, lastName, socialMediaMeta) {
  return {
    name: {
      title: '',
      first: firstName,
      last: lastName,
    },
    meta: socialMediaMeta,
  };
}
export function preparePasswordRequest(password, signupToken) {
  return {
    signup_token: signupToken,
    password: password,
  };
}
export function prepareCreateAccountRequest(username, countryCode, mobile) {
  return {
    contact_type: isMobile(mobile) ? 'phone' : 'email',
    contact: isMobile(mobile)
      ? {
          phone: {
            country_code: countryCode,
            number: mobile,
          },
        }
      : {
          email: username,
        },
  };
}

export function prepareCreateAuthRequest(username, countryCode, mobile) {
  return isMobile(mobile) ? { code: countryCode, phone: mobile } : { email: username };
}
