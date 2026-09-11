import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MAIL_CONSTANTS } from '../../common';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly fromAddress: string;

  constructor(private readonly configService: ConfigService) {
    const service = this.configService.get<string>('mail.service');
    const host = this.configService.get<string>('mail.host');
    const port = this.configService.get<number>('mail.port');
    const user = this.configService.get<string>('mail.user');
    const pass = this.configService.get<string>('mail.pass');
    this.fromAddress =
      this.configService.get<string>('mail.from') ||
      (user ? `"KK Group" <${user}>` : MAIL_CONSTANTS.DEFAULT_FROM);

    if (user && pass) {
      if (service === 'gmail') {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass },
        });
        this.logger.log(`Gmail Nodemailer initialized with account: ${user}`);
      } else if (host) {
        this.transporter = nodemailer.createTransport({
          host,
          port: port || 587,
          secure: port === 465,
          auth: { user, pass },
        });
        this.logger.log(`SMTP Mailer initialized for host: ${host}:${port || 587}`);
      } else {
        // Fallback to Gmail service if no host is specified but user and pass are provided
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass },
        });
        this.logger.log(`Defaulted to Gmail Nodemailer with account: ${user}`);
      }
    } else {
      this.logger.warn(
        'Email credentials not fully configured in .env (APP_EMAIL / APP_PASSWORD). OTP codes will be printed to this console for easy development and testing.',
      );
    }
  }

  async onModuleInit() {
    if (this.transporter) {
      try {
        await this.transporter.verify();
        this.logger.log('Email transporter connection verified successfully. Ready to send emails.');
      } catch (error) {
        this.logger.error(
          `Email transporter verification failed: ${(error as Error).message}. Check APP_EMAIL and APP_PASSWORD in .env.`,
        );
      }
    }
  }

  async sendOtpEmail(
    to: string,
    otp: string,
    purpose = MAIL_CONSTANTS.PURPOSE_VERIFICATION,
  ): Promise<boolean> {
    const subject = MAIL_CONSTANTS.SUBJECT_OTP(otp);
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #0f172a; margin: 0; font-size: 24px;">KK Group</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Security Verification</p>
        </div>
        <p style="color: #334155; font-size: 16px;">Hello,</p>
        <p style="color: #334155; font-size: 15px; line-height: 1.5;">
          You requested a one-time passcode for <strong>${purpose}</strong>. Please use the verification code below:
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <span style="display: inline-block; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #4f46e5; background-color: #eef2ff; padding: 16px 32px; border-radius: 8px; border: 1px dashed #6366f1;">
            ${otp}
          </span>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.5;">
          This code is valid for <strong>10 minutes</strong>. If you did not request this code, please ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">
          &copy; ${new Date().getFullYear()} KK Group. All rights reserved.
        </p>
      </div>
    `;

    // In production or when SMTP transporter is active, mask recipient and do not leak cleartext OTP
    const maskedEmail = to.replace(/(?<=.{2}).(?=[^@]*?@)/g, '*');
    if (this.transporter) {
      this.logger.log(`[OTP DISPATCH] Dispatched verification code to ${maskedEmail} for ${purpose}`);
    } else {
      this.logger.warn(
        `[DEV MODE - SMTP NOT CONFIGURED] Fallback OTP for ${to}: ${otp}`,
      );
    }

    if (this.transporter) {
      try {
        await this.transporter.sendMail({
          from: this.fromAddress,
          to,
          subject,
          text: `Your KK Group verification code is: ${otp}\n\nThis code is valid for 10 minutes for ${purpose}. If you did not request this code, please ignore this email.`,
          html,
        });
        this.logger.log(`OTP email sent via SMTP successfully to ${to}`);
        return true;
      } catch (error) {
        this.logger.error(
          `Failed to send email via SMTP to ${to}: ${(error as Error).message}`,
        );
        // Do not throw so local development/testing is never blocked
        return false;
      }
    }

    return true;
  }
}
