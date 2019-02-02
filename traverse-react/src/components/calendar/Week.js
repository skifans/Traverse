import React from 'react';

const Week = ({children}) =>{
  console.log(children);
  let days = children.map((day) => {
    return (
      <th>
        {day}
      </th>
    )
  })
  return(
    <tr>
      {days}
    </tr>
  )
}

export default Week;
