import React from 'react';

const DayOfWeek = (props) =>{
  const {day} = props;

  return(
    <th className="day-of-week">
      {day}
    </th>
  )
}

export default DayOfWeek;
