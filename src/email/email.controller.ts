import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send-mail')
  async sendEmailConfirmation(@Body() emailDto: SendEmailDto) {
    return await this.emailService.sendMailNotification(emailDto);
  }
}
