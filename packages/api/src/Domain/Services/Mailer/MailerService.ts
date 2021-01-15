export const sendEmail = () => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: ['88cayman88@gmail.com', 'agolanzetti09@gmail.com'], // Change to your recipient
    from: 'alevierminardi@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'Vamos a comer de tu hermana entonces no?',
    html: '<strong>Vamos a comer de tu hermana entonces no?</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};
