export const kapcsolatEmailTemplate = {
  subject: 'Üzeneted megérkezett hozzánk',
  content: (name, comment) => `
      <p>Kedves ${name},</p>
  
      <p>Köszönjük, hogy felvetted velünk a kapcsolatot!</p>
      <p>Az üzeneted tartalma:</p>
      <blockquote>${comment}</blockquote>
      <p>Csapatunk az elkövetkező munkanapokon - általában 24-48 órán belül - feldolgozza az üzeneted, hamarosan válaszolunk.</p>
      <p>Namasté,<br>Bandha Works Shala</p>
    `,
};
