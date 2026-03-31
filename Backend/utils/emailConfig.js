const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check if Gmail credentials are provided
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('\n----------------------------------------');
    console.log('📧 MOCK EMAIL SENT (LOGGING TO CONSOLE)');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message: ${options.message}`);
    console.log('----------------------------------------\n');
    return true;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: `"Local Worker Service" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
