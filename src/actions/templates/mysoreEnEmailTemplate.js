export const mysoreEnEmailTemplate = {
  subject: 'Mysore Program Application',
  content: (fullName, comment, experienceLevel) => `
      <h1>Mysore Program Registration</h1>
      <p>Dear ${fullName},</p>
      <p>Thank you for your registration to our Mysore program!</p>
      <p>We have received your application with the following content:</p>
      <p><strong>Experience level:</strong> ${experienceLevel}</p>
      <p><strong>Mysore experience:</strong> ${comment}</p>
      <p>Our team will process your application during the upcoming workdays - usually within 24-48 hours - and we will respond soon.</p>
      <p>Namaste,<br>Bandha Works Shala</p>
      `,
};
