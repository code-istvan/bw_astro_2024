export const newsletterEmailTemplate = {
  subject: 'You have successfully subscribed to the Bandha Works newsletter',
  content: (name, email) => `
         <p>Dear ${name},</p><br>
            <p>Thank you for subscribing to the Bandha Works Yoga School newsletter!</p>
            <p>The email address you provided during the subscription: <strong>${email}</strong></p>
            <p>From now on, you will be the first to hear about our latest news, yoga events, and exclusive content.</p><br>
            <p>We are happy to have you join our community!</p><br>
            <p>Namaste,<br>Bandha Works Shala</p>
        `,
};
