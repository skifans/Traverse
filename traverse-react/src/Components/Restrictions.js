import React, { Fragment } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Restriction = ({ name, iconName, content }) => {
  return (
    <div className="restrictions-container">
      <img src={`../images/${iconName}.png`} align="center" height="30px" width="30px" title={name} alt={name} />
      <span>{content}</span><br />
    </div>
  );
};

// TODO: ensure data is complete, implement conditional rendering for if not
export default ({ restrictions, title }) => (
  <Fragment>
    <h3>{title}</h3>
    {restrictions.map(restriction => (
      <Fragment>
        <Restriction name="Days" iconName="calendarIcon" content={restriction.days.map(day => DAYS[day]).join(', ')} />
        <Restriction name="Time" iconName="timeIcon" content={restriction.times || 'Valid at all times'} />
        <Restriction name="Routes" iconName="pinIcon" content={restriction.routes || 'Valid via any reasonable route'} />
        <Restriction name="More info" iconName="errorIcon" content={restriction.other || 'Valid at all times'} />
      </Fragment>
    ))}
  </Fragment>
);
