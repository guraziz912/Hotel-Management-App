const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      apiKey: process.env.API_KEY,
    },
  }),
);

// file system
const fs = require('fs');

module.exports = class SendMail {
  constructor(email, name) {
    this.email = email;
    this.name = name;
  }

  // Sending HTML mail
  async sendHTMLMail() {
    transporter.sendMail({
      to: this.email,
      from: process.env.EMAIL_FROM,
      subject: process.env.EMAIL_SUBJECT,
      html: `<h1>Successfull sign up. Welcome ${this.name} </h1>`,

    });
  }

  // sending text mail
  async sendTextMail() {
    transporter.sendMail({
      to: this.email,
      from: process.env.EMAIL_FROM,
      subject: process.env.EMAIL_SUBJECT,
      text: `Successfull sign up. Welcome ${this.name}`,
    });
  }

  // Sending email with attachment
  async sendMailWithAttachment() {
    fs.readFile('../assets/attachmentFiles/welcome.jpg', (err, data) => {
      transporter.sendMail({
        to: this.email,
        from: process.env.EMAIL_FROM,
        subject: process.env.EMAIL_SUBJECT,
        attachments: [{
          filename: 'hello.jpeg',
          content: data,
          type: 'application/jpeg',
          disposition: 'attachment',
        }],
        html: `<h1>Successfull sign up. Welcome ${this.name} </h1>`,
      });
    });
  }
};
