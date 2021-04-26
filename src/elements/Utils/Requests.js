import { isMobile } from './FormUtils/validation';
export function prepareBusinessNameRequest(businessName, selectedSectorId, brandName, language) {
  return {
    business_name: language == 'ar' ? { en: 'business_name', ar: businessName } : { en: businessName },
    brand: {
      name:
        language == 'ar'
          ? {
              en: 'business_name',
              ar: brandName,
            }
          : { en: brandName },
      // sector: ['sector_4iF2veqGgvhrW75'],
      sector: [selectedSectorId],
    },
    country: 'KW',
  };
}

export function prepareBusinessTypeRequest(businessType, businessCountry) {
  return {
    business_type: businessType,
    business_country: businessCountry,
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
export function preparePasswordRequest(password, signupToken, scopes) {
  return {
    signup_token: signupToken,
    password: password,
    // scopes: scopes,
  };
}
export function prepareCreateAccountRequest(username, countryCode, mobile, businessCountry, businessSegment) {
  return {
    country: businessCountry,
    segment_type: businessSegment,
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
