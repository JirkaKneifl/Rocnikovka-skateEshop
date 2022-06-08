var mailTransport = require('../../MailTransporter')

class MailSenderService{
    transporter;

    constructor(){
        this.transporter = mailTransport;
    }

    async send(mail){
        this.transporter.transporter.sendMail({
            from: mail.from, // sender address
            to: mail.to, // list of receivers
            subject: mail.subject, // Subject line
            text: mail.text, // plain text body
            html: mail.html
          });
    }
}
module.exports = MailSenderService;