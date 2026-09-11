export const MAIL_CONSTANTS = {
  DEFAULT_FROM: '"KK Group" <noreply@kkgroup.com>',
  PURPOSE_VERIFICATION: 'Customer Account Verification',
  SUBJECT_OTP: (otp: string) => `Your KK Group Verification Code: ${otp}`,
} as const;
