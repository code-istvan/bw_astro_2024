import React, { useState } from 'react';
import { TextArea } from './TextArea/TextArea';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';

export const KapcsolatForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <form
      name="contact bandhaworks 2025"
      action="/message-sent"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact bandhaworks 2025" />
      <div hidden>
        <input name="bot-field" />
      </div>
      <div className="row gap-1 mt-20px mb-20px">
        <div className="col-12-xs col-6-md">
          <Input type="text" name="name" placeholder="Név" pattern="^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$" required />
        </div>
        <div className="col-12-xs col-6-md">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
            required
          />
        </div>
      </div>
      <div className="row">
        <TextArea id="message" name="comments" placeholder="Üzenet" rows={5} required />
      </div>
      <div className="row mt-20px">
        <Checkbox
          id="terms"
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
          onChange={(e) => setIsChecked(e.target.checked)}
          className="orange"
        />
      </div>
      <div className="row mt-20px">
        <button type="submit" disabled={!isChecked} className="btn btn--full-width-mobile btn--secondary--solid">
          Küldés
        </button>
      </div>
    </form>
  );
};
