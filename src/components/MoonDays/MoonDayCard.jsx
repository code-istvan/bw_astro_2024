// MoonDayCard.jsx
import React from 'react';
import './_MoonDayCard.scss';

const MoonDayCard = ({ data }) => {
  if (!data) {
    return <p>Nincs elérhető adat.</p>;
  }

  return (
    <div className="moondays-card mt-20px">
      <div className="moondays-card__header">
        <p className="moondays-card__year">{data.year}</p>
        <p className="moondays-card__month">{data.month.HU}</p>
      </div>
      <div className="moondays-card__moondays">
        <div className="row gap-1 display-flex--justify-center">
          <div className="col-6-xs display-flex display-flex--direction-column  align-items-flex-end">
            <h3 className="clr-brand-orange ">ÚJ</h3>
            <p>{data.newMoon.HU}</p>
          </div>
          <div className="col-6-xs">
            <h3 className="clr-brand-orange">TELI</h3>
            <p>{data.fullMoon.HU}</p>
          </div>
        </div>
      </div>
      <div className="separator-horizontal"></div>
      <div className="moondays-card__ekadasi">
        <div className="row gap-1 display-flex--justify-center">
          <div className="display-flex display-flex--direction-column align-items-center">
            <h3 className="clr-brand-orange">ÉKÁDASI</h3>
            <div className="display-flex gap-1 display-flex--direction-row">
              <p>{data.ekadashiFullMoon.HU}</p>
              <p>{data.ekadashiNewMoon.HU}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonDayCard;
