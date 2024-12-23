export const TestKapcsolatForm = () => {
  return (
    <form name="test-kapcsolat-form" data-netlify="true" data-netlify-honeypot="bot-field" method="POST">
      <input type="hidden" name="form-name" value="test-kapcsolat-form" />
      <input type="hidden" name="language" value="hu" />
      <div hidden>
        <input name="bot-field" />
      </div>

      <input id="name" type="text" name="name" placeholder="Név" required />

      <input id="email" type="email" name="email" placeholder="Email" required />

      <textarea name="comments" placeholder="Üzenet" rows={5} required></textarea>

      <button type="submit">Küldés</button>
    </form>
  );
};
