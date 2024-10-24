import React, { useState } from 'react';
import MoonDayCard from './MoonDayCard';

const MoonDaysNavigator = ({ moonDays }) => {
  const [currentMonthId, setCurrentMonthId] = useState(new Date().getMonth() + 1);

  const handlePreviousMonth = () => {
    setCurrentMonthId(currentMonthId === 1 ? 12 : currentMonthId - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthId(currentMonthId === 12 ? 1 : currentMonthId + 1);
  };

  const currentData = moonDays.find((item) => item.monthValue === currentMonthId);

  return (
    <div>
      <MoonDayCard data={currentData} />
      <div className="holdnapok--moondayCard--buttons display-flex justify-content-space-between mt-8px">
        <button onClick={handlePreviousMonth}>
          <p className="clr-brand-orange">Előző hónap</p>
        </button>
        <button onClick={handleNextMonth}>
          <p className="clr-brand-orange">Következő hónap</p>
        </button>
      </div>
    </div>
  );
};

export default MoonDaysNavigator;
