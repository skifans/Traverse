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

export default ({entryDetails}) => (
    <div className="entry">
      <Cell name="Time" mainContent={" "} subContent={'transpenine express'}/>
      <Cell name="Duration" mainContent={'47m'} subContent={entryDetails.origin + " - " + entryDetails.destination} />
      <Cell name="Information" mainContent={'Offpeak'} subContent={'1 Change'} />
      <Cell name="Accessibility" mainContent={'Step Free access'} subContent={'Departure assistance'} />
      <Price name="Price" content={"£16.90"} />
      <img alt="" src="/images/open.png"/>
    </div>
);