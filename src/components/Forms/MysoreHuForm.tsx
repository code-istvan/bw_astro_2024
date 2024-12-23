import React, { useState } from 'react';
import { TextArea } from './TextArea/TextArea';
import { Checkbox } from './Checkbox/CheckBox';
import { Input } from './Input/Input';
import { submitMysore } from './submitMysore';
import { Patterns } from './patterns.ts';
import { MysoreHuCustomSelect } from './MysoreHuCustomSelect.tsx';

export const MysoreHuForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkboxClass, setCheckboxClass] = useState('orange');
  const [isFamilyNameValid, setIsFamilyNameValid] = useState(true);
  const [isSurNameValid, setIsSurNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmail2Valid, setIsEmail2Valid] = useState(true);
  const [emailValue, setEmailValue] = useState(''); // Tárolja az első email mező értékét
  const [email2Value, setEmail2Value] = useState(''); // Tárolja a második email mező értékét
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setCheckboxClass(isChecked ? 'orange' : 'red');
  };

  const handleSelectChange = (selected: string) => {
    setExperienceLevel(selected); // Tároljuk a kiválasztott szintet
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ellenőrizzük, hogy minden mező valid-e
    if (!isFamilyNameValid || !isSurNameValid || !isEmailValid || !isEmail2Valid) {
      alert('Kérjük, javítsd ki a hibás mezőket!');
      return;
    }

    // Ellenőrizzük, hogy a két email mező egyezik-e
    if (emailValue !== email2Value) {
      alert('A megadott két email cím nem egyezik!');
      return;
    }

    // Ellenőrizzük, hogy a tapasztalati szint ki van-e választva
    if (!experienceLevel) {
      alert('Kérjük, válassz tapasztalati szintet!');
      return;
    }

    setLoading(true);
    await submitMysore(event, setLoading, setCheckboxClass, isChecked, experienceLevel);
  };

  return (
    <form name="test-form" onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field" method="POST">
      <input type="hidden" name="form-name" value="test-form" />
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
            placeholder="Családi név"
            pattern={Patterns.name}
            onValidate={(isValid) => setIsFamilyNameValid(isValid)}
          />
        </div>
        {/* <div className="col-12-xs col-6-md">
          <Input
            id="sur"
            type="text"
            name="sur"
            placeholder="Utónév"
            pattern={Patterns.name}
            onValidate={(isValid) => setIsSurNameValid(isValid)}
          />
        </div> */}
      </div>
      <div className="row gap-1 mb-10px">
        <div className="col-12-xs col-6-md">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            pattern={Patterns.email}
            onValidate={(isValid) => setIsEmailValid(isValid)}
            onChange={(e) => setEmailValue(e.target.value)} // Első email mező értékének frissítése
          />
        </div>
        <div className="col-12-xs col-6-md">
          <Input
            id="email2"
            type="email"
            name="email2"
            placeholder="Email mégegyszer"
            pattern={Patterns.email}
            onValidate={(isValid) => setIsEmail2Valid(isValid)}
            onChange={(e) => setEmail2Value(e.target.value)} // Második email mező értékének frissítése
          />
        </div>
      </div>
      <div className="row mb-20px">
        <MysoreHuCustomSelect
          options={['Teljesen kezdő vagyok', 'Astangáztam már', 'Van Mysore-gyakorlás tapasztalatom']}
          onChange={handleSelectChange}
          placeholder="Válassz tapasztalati szintet"
        />
      </div>
      <div className="row">
        <TextArea
          name="experience"
          placeholder="Ha már van tapasztalatod az astanga jógában, kérlek írd meg, mióta és milyen rendszerességgel gyakorolsz. Kik voltak eddigi tanáraid, és mennyi ideig tanultál tőlük? Rendelkezel-e tapasztalattal Mysore-stílusú gyakorlásban? Képes vagy-e önállóan, külső segítség nélkül gyakorolni?"
          rows={5}
          required
        />
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
