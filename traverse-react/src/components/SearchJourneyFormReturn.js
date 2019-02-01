import React, {Component} from 'react';


export default class SearchJourneyFormReturn extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: false,
      title: 'Outbound',
      out: '',
      ret: ''
    };
    this.toggleClass = this.toggleClass.bind(this);
    this.handleOutChange = this.handleOutChange.bind(this);
    this.handleRetChange = this.handleRetChange.bind(this);
  }
  toggleClass(e) {
    console.log(e.target.id);
    const currentState = this.state.active;
    if(e.target.className === 'inactive') {
      this.setState({ title: e.target.id });
      this.setState({ active: !currentState });
    }
  }
  handleOutChange(e) {
    this.setState({ out: e.target.value });
  }
  handleRetChange(e) {
    this.setState({ ret: e.target.value });
  }

  render(){
    return (
      <div id="search-journey-inputs">
        <div id="search-journey-overview">
          <div id="Outbound" className={this.state.active ? 'inactive': ''} onClick={this.toggleClass}>
            <h4>Outbound</h4>
            <p>Station: {this.state.out}</p>
            <p>Date: </p>
            <p>Time: </p>
          </div>
          <div id="Return" className={this.state.active ? '': 'inactive'} onClick={this.toggleClass}>
            <h4>Return</h4>
            <p>Station: {this.state.ret}</p>
            <p>Date: </p>
            <p>Time: </p>
          </div>
        </div>
        <div id="search-journey-stations">
          <h2>{this.state.title}</h2>
          <form>
            <img src="../images/trainIcon.png" alt="" height="30px" width="auto" align="middle"></img>
            <input type="text" placeholder="Origin Station"
              value={this.state.out}
              onChange={this.handleOutChange}/><br/>
            <img src="../images/downArrow.png" alt="" height="30px" width="auto"></img><br/>
            <img src="../images/trainIcon.png" alt="" height="30px" width="auto" align="middle"></img>
            <input type="text" placeholder="Destination Station"
              value={this.state.ret}
              onChange={this.handleRetChange}/><br/>
          </form>
        </div>
        <div id="calendar-container">
          <table>
            <tr id="table-header">
              <td>M</td>
              <td>T</td>
              <td>W</td>
              <td>T</td>
              <td>F</td>
              <td>S</td>
              <td>S</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
            </tr>
            <tr>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>16</td>
              <td>17</td>
            </tr>
            <tr>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
              <td>22</td>
              <td>23</td>
              <td>24</td>
            </tr>
            <tr>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <div id="date-display">
            <p>12</p>
            <p>Tuesday</p>
            <p>February 2019</p>
          </div>
        </div>
      </div>
    )
  }
}
