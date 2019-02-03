import React, {Component} from 'react';

class Day extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {selectedMonth, year,month, day} = this.props;
    return (
      <td className={selectedMonth === month? "day": "day gray"}>
        {day}
      </td>
    )
  }
}

export default Day;
