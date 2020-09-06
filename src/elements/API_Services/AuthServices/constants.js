const CREATE_AUTH_RESPONSE = {
  status: 'pending',
  auth_token: 'L73ngmq8daygXHtIH696G%2FB%2FbStrA9SfxpBLLhlMPNyXa3Y1%2F1MQz',
  auth_type: 2,
  device_token: 'device_token0000000000000000',
};

const VERIFY_AUTH_PENDING_RESPONSE = {
  status: 'pending',
  auth_token: 'L73ngmq8daygXHtIH696G%2FB%2FbStrA9SfxpBLLhlMPNyXa3Y1%2F1MQz',
  auth_type: 1,
  device_token: 'device_token0000000000000000',
};

const VERIFY_AUTH_FAILED_RESPONSE = {
  status: 'fail',
  type: 'unverified_phone',
  message: 'Phone number not verified',
};

const VERIFY_AUTH_SUCCESS_RESPONSE = {
  status: 'success',
  auth_session:
    'JVDgfKxn4Rd+6GUeS7XtKbu+ezCuKkQeQnXha9eBd+Gsh0gpd0iibMXm9TORFJqa6PGmu3H+SHQzl32YFPnmY4ub8DMjPCie4lFnhW2FF+MygEAYcH/9n/NW59Sk9M+Hggkvac6drXKVWrl0S6Ml0nyuV+MSOEICCwOi4ioYCXjrfbEwrBVxYqiln2EWDve2zcQX/VX4Y/mD9cNcFTLKnFbjppGYxrviYkbgXeXt9wq/bXMA2KQURa6PixlGYQniY2W9lIrU5YhO9+8JvZ+yoAuKaZGt7UV+rarVr2XPUCx/NnEdkIrRk7oYjOcsb90Ujt0yjAsbq4M5/LF7u7SdyA=',
};

const GET_COUNTRIES = {
  countries: [
    {
      id: '132',
      code: '965',
      name: 'Kuwait',
      short_name: 'Kuwait',
      maxLength: '8',
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/Kuwait.png',
      },
    },
    {
      id: '1',
      code: '973',
      name: 'Bahrain',
      short_name: 'Bahrain',
      maxLength: '8',
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/Bahrain.png',
      },
    },
    {
      id: '2',
      code: '20',
      name: 'Egypt',
      short_name: 'Egypt',
      maxLength: '12',
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/Egypt.png',
      },
    },
    {
      id: '12',
      code: '962',
      name: 'Jordan',
      short_name: 'Jordan',
      maxLength: null,
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/Jordan.png',
      },
    },
    {
      id: '14',
      code: '961',
      name: 'Lebanon',
      short_name: 'Lebanon',
      maxLength: '8',
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/Lebanon.png',
      },
    },
    {
      id: '16',
      code: '968',
      name: 'Oman',
      short_name: 'Oman',
      maxLength: '8',
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/Oman.png',
      },
    },
    {
      id: '276',
      code: '974',
      name: 'Qatar',
      short_name: 'Qatar',
      maxLength: null,
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/Qatar.png',
      },
    },
    {
      id: '7',
      code: '966',
      name: 'Saudi Arabia',
      short_name: 'Saudi Arabia',
      maxLength: '8',
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/Saudi Arabia.png',
      },
    },
    {
      id: '20',
      code: '971',
      name: 'United Arab Emirates',
      short_name: 'Barbados',
      maxLength: '9',
      flag: {
        url: 'https://www.gotapnow.com/web/countryflag/United Arab Emirates.png',
      },
    },
  ],
};

export default {
  CREATE_AUTH_RESPONSE,
  VERIFY_AUTH_PENDING_RESPONSE,
  VERIFY_AUTH_FAILED_RESPONSE,
  VERIFY_AUTH_SUCCESS_RESPONSE,
  GET_COUNTRIES,
};

//// [types]
// [1] Password
// [2] [3] OTP
// [4] Bio
