export const newsletterEmailTemplate = {
  subject: 'You have successfully subscribed to the Bandha Works newsletter',
  content: (name, email) => `
          <p>Dear ${name},</p>
      
         <p>Thank you for subscribing to our newsletter.</p>
        <p>The content of your message:</p>
        <blockquote>${email}</blockquote>
        <p>Our team will process your message within the next working days – usually within 24-48 hours – and respond shortly.</p>
        <p>Namasté,<br>Bandha Works Shala</p>
        `,
};
