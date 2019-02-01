import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const RestrictionItem = ({ name, iconName, content }) => {
  return (
    <div className="restriction-item">
      <img src={`/images/${iconName}.png`} height="30px" width="30px" alt={name} />
      <span>{content}</span>
    </div>
  );
};

// TODO: ensure data is complete, implement conditional rendering for if not
export default ({ restrictions, title }) => (
  <div>
    <h3>{title}</h3>
    {restrictions.map((restriction, i) => (
      <div className="restrictions-container" style={{ maxWidth: `${(100 / restrictions.length) - 1}%` }} key={i.toString()}>
        <RestrictionItem name="Days" iconName="calendarIcon" content={restriction.days.map(day => DAYS[day]).join(', ')} />
        <RestrictionItem name="Time" iconName="timeIcon" content={restriction.times || 'Valid at all times'} />
        <RestrictionItem name="Routes" iconName="pinIcon" content={restriction.routes || 'Valid via any reasonable route'} />
        {restriction.other !== '' ?
          <RestrictionItem name="More info" iconName="errorIcon" content={restriction.other} />
        : null}
      </div>
    ))}
  </div>
);
