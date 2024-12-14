import React, { useState } from 'react';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';
import { submitNewsletter } from './submitNewsletter';

export const HirlevelForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkboxClass, setCheckboxClass] = useState('orange'); // Alapértelmezett osztály

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    await submitNewsletter(event, setLoading, setCheckboxClass, isChecked);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setCheckboxClass(isChecked ? 'orange' : 'red'); // Állapot szerinti osztály
  };

  return (
    <form
      name="newsletter bandhaworks 2025"
      onSubmit={handleSubmit}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
    >
      <input type="hidden" name="form-name" value="newsletter bandhaworks 2025" />
      <input type="hidden" name="language" value="hu" /> {/* Nyelv rögzítése */}
      <div hidden>
        <input name="bot-field" />
      </div>
      {/* Mezők */}
      <div className="row gap-1 mb-10px">
        <div className="col-12-xs col-6-md">
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Név"
            pattern="^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$"
            required
          />
        </div>
        <div className="col-12-xs col-6-md">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            required
          />
        </div>
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
