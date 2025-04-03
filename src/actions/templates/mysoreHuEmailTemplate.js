export const mysoreHuEmailTemplate = {
  subject: 'Mysore-program jelentkezés',
  content: (fullName, comment, experienceLevel) => `
      <h1>Mysore Program Jelentkezés</h1>
       <p>Kedves ${fullName},</p>
  
      <p>Köszönjük, jelentkezésed Mysore-programunkba!</p>
      <p>Jelentkezésed megkaptuk az alábbi tartalommal:</p>
      <p><strong>Tapasztalati szint:</strong> ${experienceLevel}</p>
      <p><strong>Mysore-tapasztalat:</strong> ${comment}</p>
      <p>Csapatunk az elkövetkező munkanapokon - általában 24-48 órán belül - feldolgozza jelentkezésed, hamarosan válaszolunk.</p>
      <p>Namasté,<br>Bandha Works Shala</p>
    `,
};
