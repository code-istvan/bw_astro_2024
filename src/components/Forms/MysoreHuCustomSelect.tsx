import React, { useState, useEffect, useRef } from 'react';
import './_mysoreCustomSelect.scss';

interface MysoreHuCustomSelectProps {
  options: string[];
  onChange?: (selected: string) => void;
  placeholder?: string;
  name: string; // Kötelező név a form feldolgozáshoz
}

export const MysoreHuCustomSelect: React.FC<MysoreHuCustomSelectProps> = ({
  options,
  onChange,
  placeholder = 'Válassz egy opciót...',
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const [isInvalid, setIsInvalid] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Frissítjük a rejtett input értékét
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = selectedOption !== placeholder ? selectedOption : '';
    }

    // Dispatch custom event when selection changes
    if (selectedOption !== placeholder) {
      const event = new CustomEvent('customSelect:change', {
        detail: { value: selectedOption },
      });
      document.dispatchEvent(event);
      setIsInvalid(false);
    }
  }, [selectedOption, placeholder]);

  useEffect(() => {
    // Form submit esemény figyelése
    const handleFormSubmit = (e: Event) => {
      if (selectedOption === placeholder) {
        e.preventDefault();
        setIsInvalid(true);
        componentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    const form = componentRef.current?.closest('form');
    form?.addEventListener('submit', handleFormSubmit);

    return () => {
      form?.removeEventListener('submit', handleFormSubmit);
    };
  }, [selectedOption, placeholder]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isInvalid) {
      setIsInvalid(false);
    }
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsInvalid(false);
    if (onChange) onChange(option);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, option?: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (option) {
        selectOption(option);
      } else {
        toggleOpen();
      }
    }
  };

  return (
    <div ref={componentRef} className={`custom-select ${isInvalid ? 'custom-select--invalid' : ''}`}>
      {/* Rejtett input mező a form adatok küldéséhez */}
      <input
        type="hidden"
        name={name}
        ref={hiddenInputRef}
        value={selectedOption !== placeholder ? selectedOption : ''}
      />

      <div
        tabIndex={0}
        role="button"
        className="select-selected"
        onClick={toggleOpen}
        onKeyDown={(e) => handleKeyDown(e)}
        aria-required="true"
        aria-invalid={isInvalid}
      >
        {selectedOption}
        <span className={`select-arrow ${isOpen ? 'select-arrow-active' : ''}`}></span>
      </div>
      {isOpen && (
        <div className="select-items">
          {options.map((option, index) =>
            selectedOption !== placeholder && option === selectedOption ? null : (
              <div
                key={index}
                tabIndex={0}
                role="option"
                aria-selected={option === selectedOption}
                onClick={() => selectOption(option)}
                onKeyDown={(e) => handleKeyDown(e, option)}
              >
                {option}
              </div>
            )
          )}
        </div>
      )}
      {isInvalid && <div className="custom-select__error clr-error mt-8px">Kérlek válassz tapasztalati szintet!</div>}
    </div>
  );
};

// import React, { useState, useEffect, useRef } from 'react';
// import './_mysoreCustomSelect.scss';

// interface MysoreHuCustomSelectProps {
//   options: string[];
//   onChange?: (selected: string) => void;
//   placeholder?: string;
// }

// export const MysoreHuCustomSelect: React.FC<MysoreHuCustomSelectProps> = ({
//   options,
//   onChange,
//   placeholder = 'Válassz egy opciót...',
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(placeholder);
//   const [isInvalid, setIsInvalid] = useState(false);
//   const componentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Dispatch custom event when selection changes
//     if (selectedOption !== placeholder) {
//       const event = new CustomEvent('customSelect:change', {
//         detail: { value: selectedOption },
//       });
//       document.dispatchEvent(event);
//       setIsInvalid(false);
//     }
//   }, [selectedOption, placeholder]);

//   useEffect(() => {
//     // Form submit esemény figyelése
//     const handleFormSubmit = (e: Event) => {
//       if (selectedOption === placeholder) {
//         e.preventDefault();
//         setIsInvalid(true);
//         componentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     };

//     const form = componentRef.current?.closest('form');
//     form?.addEventListener('submit', handleFormSubmit);

//     return () => {
//       form?.removeEventListener('submit', handleFormSubmit);
//     };
//   }, [selectedOption, placeholder]);

//   const toggleOpen = () => {
//     setIsOpen(!isOpen);
//     if (isInvalid) {
//       setIsInvalid(false);
//     }
//   };

//   const selectOption = (option: string) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//     setIsInvalid(false);
//     if (onChange) onChange(option);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, option?: string) => {
//     if (event.key === 'Enter' || event.key === ' ') {
//       event.preventDefault();
//       if (option) {
//         selectOption(option);
//       } else {
//         toggleOpen();
//       }
//     }
//   };

//   return (
//     <div ref={componentRef} className={`custom-select ${isInvalid ? 'custom-select--invalid' : ''}`}>
//       <div
//         tabIndex={0}
//         role="button"
//         className="select-selected"
//         onClick={toggleOpen}
//         onKeyDown={(e) => handleKeyDown(e)}
//         aria-required="true"
//         aria-invalid={isInvalid}
//       >
//         {selectedOption}
//         <span className={`select-arrow ${isOpen ? 'select-arrow-active' : ''}`}></span>
//       </div>
//       {isOpen && (
//         <div className="select-items">
//           {options.map((option, index) =>
//             selectedOption !== placeholder && option === selectedOption ? null : (
//               <div
//                 key={index}
//                 tabIndex={0}
//                 role="option"
//                 aria-selected={option === selectedOption}
//                 onClick={() => selectOption(option)}
//                 onKeyDown={(e) => handleKeyDown(e, option)}
//               >
//                 {option}
//               </div>
//             )
//           )}
//         </div>
//       )}
//       {isInvalid && <div className="custom-select__error clr-error mt-8px">Kérlek válassz tapasztalati szintet!</div>}
//     </div>
//   );
// };
