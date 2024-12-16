import React, { useState } from 'react';
import { Input } from './Input/Input';
import { TextArea } from './TextArea/TextArea';
import { Checkbox } from './Checkbox/CheckBox';
import { submit } from './submit';
import { Patterns } from './patterns.ts';

export const KapcsolatForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkboxClass, setCheckboxClass] = useState('orange');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setCheckboxClass(isChecked ? 'orange' : 'red');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ellenőrizzük, hogy minden mező valid-e
    if (!isNameValid || !isEmailValid) {
      alert('Kérjük, javítsd ki a hibás mezőket!');
      return;
    }

    setLoading(true);
    await submit(event, setLoading, setCheckboxClass, isChecked);
  };

  return (
    <form
      name="contact bandhaworks 2025"
      onSubmit={handleSubmit}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
    >
      <input type="hidden" name="form-name" value="contact bandhaworks 2025" />
      <input type="hidden" name="language" value="hu" />
      <div hidden>
        <input name="bot-field" />
      </div>

      <div className="row gap-1 mb-10px">
        <div className="col-12-xs col-6-md">
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Név"
            pattern={Patterns.name}
            onValidate={(isValid) => setIsNameValid(isValid)} // Validációs callback
          />
        </div>
        <div className="col-12-xs col-6-md">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            pattern={Patterns.email}
            onValidate={(isValid) => setIsEmailValid(isValid)} // Validációs callback
          />
        </div>
      </div>

      <div className="row">
        <TextArea name="comments" placeholder="Üzenet" rows={5} required />
      </div>

      <Checkbox
        id="terms"
        name="terms"
        label={
          <>
            Megismertem és elfogadom az{' '}
            <a
              href="/adatvedelmi-tajekoztato/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-enhanced link-orange"
            >
              adatvédelmi tájékoztatót
            </a>
            , hozzájárulok nevem és email címem kezeléséhez.
          </>
        }
        checked={isChecked}
        className={checkboxClass}
        onChange={handleCheckboxChange}
      />
      <div className="row mt-20px mb-40px">
        <button type="submit" disabled={loading} className="btn btn--full-width-mobile btn--secondary--solid">
          {loading ? 'Küldés...' : 'Küldés'}
        </button>
      </div>
    </form>
  );
};
