import React from 'react';

const Week = ({children}) =>{
  // let days = children.map((day) => {
  //   return (
  //     <th className="day">
  //       {day}
  //     </th>
  //   )
  // })
  return(
    <tr className="week-row">
      {children}
    </tr>
  )
}

export default Week;
