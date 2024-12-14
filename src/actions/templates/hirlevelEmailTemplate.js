export const hirlevelEmailTemplate = {
  subject: 'Sikerült feliratkoznod a Bandha Works hírlevelére',
  content: (name, email) => `
        <p>Kedves ${name},</p>
    
        <p>Köszönjük, hogy feliratkoztál hírlevelünkre</p>
        <p>Az üzeneted tartalma:</p>
        <blockquote>${email}</blockquote>
        <p>Csapatunk az elkövetkező munkanapokon - általában 24-48 órán belül - feldolgozza az üzeneted, hamarosan válaszolunk.</p>
        <p>Namasté,<br>Bandha Works Shala</p>
      `,
};
