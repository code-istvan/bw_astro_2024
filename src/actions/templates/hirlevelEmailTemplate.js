export const hirlevelEmailTemplate = {
  subject: 'Sikerült feliratkoznod a Bandha Works hírlevelére',
  content: (name, email) => `
        <p>Kedves ${name},</p>
      <p>Köszönjük, hogy feliratkoztál a Bandha Works Jógaiskola hírlevelére!</p>
      <p>A feliratkozás során megadott email-címed: <strong>${email}</strong></p>
      <p>Mostantól első kézből értesülhetsz legfrissebb híreinkről, jógás eseményeinkről és különleges tartalmainkról.</p>
      <p>Örülünk, hogy csatlakoztál közösségünkhöz!</p>
      <p>Namasté,<br>Bandha Works Shala</p>
      `,
};
