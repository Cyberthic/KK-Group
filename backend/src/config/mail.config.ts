import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => {
  const emailUser = (process.env.APP_EMAIL || process.env.SMTP_USER || '').trim();
  const rawPass = process.env.APP_PASSWORD || process.env.SMTP_PASS || '';
  // Gmail app passwords often contain spaces (e.g. "xxxx yyyy zzzz wwww"), remove them for SMTP authentication
  const emailPass = rawPass.replace(/\s+/g, '');
  const host =
    process.env.SMTP_HOST ||
    (emailUser.toLowerCase().endsWith('@gmail.com') ? 'smtp.gmail.com' : '');
  const port = Number(process.env.SMTP_PORT) || 465;
  const isGmail =
    emailUser.toLowerCase().endsWith('@gmail.com') || host.includes('gmail');
  const from =
    process.env.SMTP_FROM ||
    (emailUser ? `"KK Group" <${emailUser}>` : '"KK Group" <noreply@kkgroup.com>');

  return {
    service: isGmail ? 'gmail' : undefined,
    host: host || (isGmail ? 'smtp.gmail.com' : undefined),
    port,
    user: emailUser,
    pass: emailPass,
    from,
  };
});
