import React, { useState } from 'react';
import { TextArea } from './TextArea/TextArea';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';
import { actions } from 'astro:actions';

export const ContactForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkboxClass, setCheckboxClass] = useState('orange'); // Alapértelmezett osztály

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!isChecked) {
      setCheckboxClass('red'); // Ha nincs bejelölve, váltson "red"-re
      setLoading(false);
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);

    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const comment = formData.get('comments') as string | null;

    if (!name || !email || !comment) {
      console.error('Hiányzó kötelező mezők.');
      setLoading(false);
      return;
    }

    try {
      await fetch('/', {
        method: 'POST',
        body: formData,
      });

      const response = await actions.contact({ name, email, comment });

      if (response.data?.data?.ok) {
        window.location.href = '/en/uzenet-elkuldve/';
      } else {
        window.location.href = '/en/uzenetkuldes-sikertelen/';
      }
    } catch (error) {
      console.error('Hiba történt:', error);
      window.location.href = '/en/uzenetkuldes-sikertelen/';
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setCheckboxClass(isChecked ? 'orange' : 'red'); // Állapot szerinti osztály
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
            placeholder="Name"
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
      <div className="row">
        <TextArea name="comments" placeholder="Message" rows={5} required />
      </div>

      {/* Checkbox */}
      <Checkbox
        id="terms"
        name="terms"
        label={
          <>
            I have read and accept the{' '}
            <a
              href="/en/adatvedelmi-tajekoztato/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-enhanced link-orange"
            >
              privacy policy
            </a>
            , and consent to the processing of my name and email address.
          </>
        }
        checked={isChecked}
        className={checkboxClass} // Dinamikus osztály
        onChange={handleCheckboxChange}
      />

      <div className="row mt-20px mb-40px">
        <button type="submit" disabled={loading} className="btn btn--full-width-mobile btn--secondary--solid">
          {loading ? 'Send...' : 'Send'}
        </button>
      </div>
    </form>
  );
};
