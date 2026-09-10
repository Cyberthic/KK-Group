import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || 'kk-group-super-secret-jwt-key-2026!',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptSaltRounds: 10,
  superAdmin: {
    email: process.env.SUPER_ADMIN_EMAIL || 'admin@kkgroup.com',
    username: process.env.SUPER_ADMIN_USERNAME || 'superadmin',
    password: process.env.SUPER_ADMIN_PASSWORD || 'AdminPassword@123',
  },
}));
