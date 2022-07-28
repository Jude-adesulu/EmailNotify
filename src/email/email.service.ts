import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { configConstant } from '../common/constants/config.constant';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private nodeMailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {
    // Set the mail service provider
    this.nodeMailerTransport = createTransport({
      host: this.configService.get<string>(configConstant.mail.host),
      port: this.configService.get<Number>(configConstant.mail.port),
      service: 'yahoo',
      secure: false,
      auth: {
        user: this.configService.get<string>(configConstant.mail.username),
        pass: this.configService.get<string>(configConstant.mail.password),
      },
      debug: false,
      logger: true,
    });
  }

  // Function that conveys mail notification to user
  async sendMailNotification(sendEmailDto: SendEmailDto) {
    return this.sendMail({
      from: this.configService.get<string>('FROM_MAIL'),
      to: sendEmailDto.email,
      subject: sendEmailDto.subject,
      html: sendEmailDto.text,
    });
  }

  //Mail transporter
  sendMail(option: Mail.options) {
    return this.nodeMailerTransport.sendMail(option);
  }
}
