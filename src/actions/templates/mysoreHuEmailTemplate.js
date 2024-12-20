export const mysoreHuEmailTemplate = {
  subject: 'Mysore-program jelentkezés',
  content: (fullName, comment, experienceLevel) => `
      <h1>Mysore Program Jelentkezés</h1>
      <p><strong>Név:</strong> ${fullName}</p>
      <p><strong>Tapasztalati szint:</strong> ${experienceLevel}</p>
      <p><strong>Mysore-tapasztalat:</strong> ${comment}</p>
    `,
};
