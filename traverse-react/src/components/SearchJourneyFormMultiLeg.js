import React, {Component} from 'react';

export default class SearchJourneyFormMultiLeg extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      title: 'First Leg',
      text: 'inactive'
    };
    this.toggleClass = this.toggleClass.bind(this);
    
  }
  toggleClass(e) {
    this.setState({ title: e.target.value });
  }

   render(){
    return (
      <div id="search-journey-inputs">
        <div id="search-journey-overview">
          <ul id="multi-legs">
            <li className={""} value="0" onClick={this.toggleClass}>First Leg</li>
            <li className={this.state.text} value="1" onClick={this.toggleClass}>Second Leg</li>
            <li className={this.state.text} value="2" onClick={this.toggleClass}>Third Leg</li>
            <li className={this.state.text} value="3" onClick={this.toggleClass}>Fourth Leg</li>
            <li className={this.state.text} value="4" onClick={this.toggleClass}>Fifth Leg</li>
          </ul>
        </div>
        <div id="search-journey-stations">
          <h2>{this.state.title}</h2>
          <form>
            <img src="../images/trainIcon.png" alt="" height="30px" width="auto" align="middle"></img>
            <input type="text" placeholder="Origin Station"></input><br/>
            <img src="../images/downArrow.png" alt="" height="30px" width="auto"></img><br/>
            <img src="../images/trainIcon.png" alt="" height="30px" width="auto" align="middle"></img>
            <input type="text" placeholder="Destination Station"></input><br/>
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
