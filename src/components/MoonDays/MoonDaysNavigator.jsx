// src/components/MoonDaysNavigator.jsx
import React, { useState } from 'react';

const MoonDaysNavigator = ({ moonDays }) => {
  const [currentMonthId, setCurrentMonthId] = useState(new Date().getMonth() + 1);

  const handlePreviousMonth = () => {
    setCurrentMonthId(currentMonthId === 1 ? 12 : currentMonthId - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthId(currentMonthId === 12 ? 1 : currentMonthId + 1);
  };

  const currentData = moonDays.find((item) => item.monthValue === currentMonthId);

  if (!currentData) {
    return <p>Nincs elérhető adat a megadott hónaphoz.</p>;
  }

  return (
    <div>
      <div className="moondays-card">
        <h4>{currentData.month.HU}</h4>
        <p>
          <strong>Telihold:</strong> {currentData.fullMoon.HU}
        </p>
        <p>
          <strong>Újhold:</strong> {currentData.newMoon.HU}
        </p>
        <p>
          <strong>Ékádasi Telihold:</strong> {currentData.ekadashiFullMoon.HU}
        </p>
        <p>
          <strong>Ékádasi Újhold:</strong> {currentData.ekadashiNewMoon.HU}
        </p>
      </div>
      <div className="holdnapok--moondayCard--buttons">
        <button onClick={handlePreviousMonth}>Előző hónap</button>
        <button onClick={handleNextMonth}>Következő hónap</button>
      </div>
    </div>
  );
};

export default MoonDaysNavigator;
