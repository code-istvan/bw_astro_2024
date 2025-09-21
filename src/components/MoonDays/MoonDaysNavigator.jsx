import React, { useState } from 'react';
import MoonDayCard from './MoonDayCard';
import { useTranslations } from '../../i18n/index.ts';

const MoonDaysNavigator = ({ moonDays, lang }) => {
  const [currentMonthId, setCurrentMonthId] = useState(new Date().getMonth() + 1);

  const handlePreviousMonth = () => {
    setCurrentMonthId(currentMonthId === 1 ? 12 : currentMonthId - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthId(currentMonthId === 12 ? 1 : currentMonthId + 1);
  };

  const currentData = moonDays.find((item) => item.monthValue === currentMonthId);

  const t = useTranslations(lang);

  return (
    <div>
      <MoonDayCard data={currentData} lang={lang} />
      <div className="holdnapok--moondayCard--buttons display-flex justify-content-space-between mt-8px">
        <button onClick={handlePreviousMonth}>
          <p className="clr-brand-orange">{t('previousMonth')}</p>
        </button>
        <button onClick={handleNextMonth}>
          <p className="clr-brand-orange">{t('nextMonth')}</p>
        </button>
      </div>
    </div>
  );
};

export default MoonDaysNavigator;
