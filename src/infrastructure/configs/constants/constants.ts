export const CONSTANTS = {
  DEFAULT_VALUES: {
    /**
     * Otp Duration must be in minutes
     */
    OTP_DURATION: 10,
    SEND_OTP_TO: 'whatsapp',
    OTP_BODY:
      '  is you verification code. For your security, do not share this code.',
    /**
     * Token duration must be given in seconds
     */
    OTP_TOKEN_DURATION: 600,
    /**
     * 7 days
     */
    REFRESH_TOKEN_DURATION: 604800,
    /**
     * 1 day
     */
    ACCESS_TOKEN_DURATION: 86400,
    /**
     * Size in bits
     */
    IMAGE_SIZE: 2 * 1024 * 1024,
    CATEGORY_IMAGE_FOLDER: 'category',
  },
  VALIDATION: {
    /**
     * Validation direction
     */
    ORDER_DIRECTIONS: ['asc', 'desc'],
  },
} as const
