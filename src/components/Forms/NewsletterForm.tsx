import React, { useState } from 'react';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';

export const NewsletterForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <form
      name="newsletter bandhaworks 2025"
      action="/feliratkozas-sikeres/"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="newsletter bandhaworks 2025" />
      <div hidden>
        <input name="bot-field" />
      </div>
      <div className="row gap-1 mt-20px mb-20px">
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
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
        </div>
      </div>
      <div className="row mt-20px">
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
          required
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="orange"
        />
      </div>
      <div className="row mt-20px">
        {/* <button type="submit" disabled={!isChecked} className="btn btn--full-width-mobile btn--secondary--solid">
          Feliratkozás
        </button> */}
        <button type="submit" className="btn btn--full-width-mobile btn--secondary--solid">
          Feliratkozás
        </button>
      </div>
    </form>
  );
};
