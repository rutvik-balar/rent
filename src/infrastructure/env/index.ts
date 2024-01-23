const optionalLoadAsBoolean = (index: string, defaultval: boolean): boolean => {
  if (typeof process.env[index] === 'undefined') {
    return defaultval
  }
  return process.env[index] === 'true'
}

const optionalLoadAsString = (index: string): string | undefined => {
  return process.env[index]
}
const loadAsString = (index: string): string => {
  const value: string | undefined = process.env[index]
  if (value === undefined) {
    throw new Error(`${index} must be set!`)
  }
  return value
}

const loadAsNumber = (index: string): number => {
  const value: string | undefined = process.env[index]
  const asNumber = Number(value)
  if (value === undefined || isNaN(asNumber)) {
    throw new Error(`${index} must be set as number!`)
  }
  return asNumber
}

// const optionalLoadAsNumber = (index: string): number | undefined => {
//   const value: string | undefined = process.env[index];
//   if (value === undefined) {
//     return value;
//   }
//
//   const asNumber = Number(value);
//   if (isNaN(asNumber)) { throw new Error(`${index} must be undefined or set as number!`); }
//   return asNumber;
// };

type Env = {
  APPSERVER_PORT: number
  TIMEZONE: string
  LOG_LEVEL: string
  DB_NAME: string
  DB_HOST: string
  DB_PWD: string
  DB_PORT: number
  DB_USER: string
  DB_SSL_REQUIRED: boolean
  SEQUELIZE_SYNCHRONIZE: boolean
  JWT_HS512_OTP_SECRET: string
  JWT_HS512_REFRESH_SECRET: string
  JWT_HS512_ACCESS_SECRET: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  S3_REGION: string
  S3_BUCKET: string
  IMG_BASE_URL: string
}

export const env: Env = {
  APPSERVER_PORT: loadAsNumber('APPSERVER_PORT'),
  LOG_LEVEL: loadAsString('LOG_LEVEL'),
  TIMEZONE: optionalLoadAsString('TIMEZONE') || 'Asia/Tokyo',
  DB_NAME: loadAsString('DB_NAME'),
  DB_HOST: loadAsString('DB_HOST'),
  DB_PWD: loadAsString('DB_PWD'),
  DB_PORT: loadAsNumber('DB_PORT'),
  DB_USER: loadAsString('DB_USER'),
  DB_SSL_REQUIRED: optionalLoadAsBoolean('DB_SSL_REQUIRED', true),
  SEQUELIZE_SYNCHRONIZE: optionalLoadAsBoolean('SEQUELIZE_SYNCHRONIZE', false),
  JWT_HS512_OTP_SECRET: loadAsString('JWT_HS512_OTP_SECRET'),
  JWT_HS512_REFRESH_SECRET: loadAsString('JWT_HS512_REFRESH_SECRET'),
  JWT_HS512_ACCESS_SECRET: loadAsString('JWT_HS512_ACCESS_SECRET'),
  AWS_ACCESS_KEY_ID: loadAsString('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: loadAsString('AWS_SECRET_ACCESS_KEY'),
  S3_REGION: loadAsString('S3_REGION'),
  S3_BUCKET: loadAsString('S3_BUCKET'),
  IMG_BASE_URL: loadAsString('IMG_BASE_URL'),
}
