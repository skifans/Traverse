import React from 'react';

const Cell = ({ mainContent, subContent }) => {
  return (
    <div className="cell">
      <p>{mainContent}</p>
      <p>{subContent}</p>
    </div>
  );
};
const Price = ({ content }) => {
  return (
    <div className="price">
      <p>{content}</p>
    </div>
  );
};

export default ({journey, i}) => (
  <div className="entry">
    <Cell name="Time" mainContent={journey.routes[i].departureDatetime.substring(11,16)} subContent={'~Fare TOC~'}/>
    <Cell name="Duration" mainContent={journey.routes[i].duration} subContent={journey.origin.crs + " - " + journey.destination.crs} />
    <Cell name="Information" mainContent={'~Type~'} subContent={journey.routes[0].routeParts.length-1 + ' Change'} />
    <Cell name="Accessibility" mainContent={'~Step Free access~'} subContent={'~Departure assistance~'} />
    <Price name="Price" content={"~Price~"} />
    <img alt="" src="/images/open.png"/>
  </div>
);