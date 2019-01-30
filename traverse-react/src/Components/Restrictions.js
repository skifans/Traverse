import React from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Restriction = ({ name, iconName, content }) => {
  return (
    <li class="restriction-item" style={{ listStyleImage: `url('/images/${iconName}.png')` }}>
      {content}
    </li>
  );
};

// TODO: ensure data is complete, implement conditional rendering for if not
export default ({ restrictions, title }) => (
  <div>
    <h3>{title}</h3>
    {restrictions.map((restriction, i) => (
      <ul className="restrictions-container" style={{ maxWidth: `${(100 / restrictions.length)}%` }} key={i.toString()}>
        <Restriction name="Days" iconName="calendarIcon" content={restriction.days.map(day => DAYS[day]).join(', ')} />
        <Restriction name="Time" iconName="timeIcon" content={restriction.times || 'Valid at all times'} />
        <Restriction name="Routes" iconName="pinIcon" content={restriction.routes || 'Valid via any reasonable route'} />
        {restriction.other !== '' ?
          <Restriction name="More info" iconName="errorIcon" content={restriction.other} />
        : null}
      </ul>
    ))}
  </div>
);
