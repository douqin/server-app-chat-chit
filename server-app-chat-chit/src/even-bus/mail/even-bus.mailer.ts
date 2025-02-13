import { eventbus } from '@/lib/common';
import { MailerEvent } from './constant.even-bus.mailer';
import { createHtmlForEmailForgotPasswordOtp, createHtmlForEmailRegisterOtp } from '@/utils/extension/html.email.otp';
import Mail from 'nodemailer/lib/mailer';
import { DataMailReceive } from '../../job-queue/mail/data-define/data-receive';
import { mailQueue } from '../../job-queue/mail/queue-mail';
import { DataEventBusMailReceive } from './data-define/data-receiver';

const eventbusMail = new eventbus.EventEmitter();

eventbusMail.on(MailerEvent.SEND_MAIL_OTP_REGISTER, async (data: DataEventBusMailReceive) => {
    let opts: Mail.Options = {
        from: 'Chat Chit App <djiahak@gmail.com>',
        to: data.email,
        subject: 'Chat Chit Email Verification',
        html: createHtmlForEmailRegisterOtp(data.otp)
    };
    let dataMail: DataMailReceive = {
        opt: opts,
    }
    await mailQueue.add(MailerEvent.SEND_MAIL_OTP_REGISTER, dataMail);
    
});

eventbusMail.on(MailerEvent.FORGOT_PASSWORD, async (data: DataEventBusMailReceive) => {
    let opts: Mail.Options = {
        from: 'Chat Chit App <djiahak@gmail.com>',
        to: data.email,
        subject: 'Chat Chit Email Verification',
        html: createHtmlForEmailForgotPasswordOtp(data.otp)
    };

    let dataMail: DataMailReceive = {
        opt: opts,
    }
    await mailQueue.add(MailerEvent.FORGOT_PASSWORD, dataMail);
    
});
export { eventbusMail };