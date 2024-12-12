export const contactEmailTemplate = {
  subject: 'We received your message',
  content: (name, comment) => `
      <p>Dear ${name},</p>
  
      <p>Thank you for reaching out to us!</p>
      <p>Your message:</p>
      <blockquote>${comment}</blockquote>
      <p>Our team will process your message within 1-2 business days and get back to you soon.</p>
      <p>Namasté,<br>The Bandha Works Shala</p>
    `,
};
