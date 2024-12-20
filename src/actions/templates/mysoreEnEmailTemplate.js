export const mysoreEnEmailTemplate = {
  subject: 'Mysore Program Application',
  content: (fullName, comment, experienceLevel) => `
        <h1>Mysore Program Application</h1>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        <p><strong>Mysore experience:</strong> ${comment}</p>
      `,
};
