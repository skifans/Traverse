import React, {Component} from 'react';

const fLeft = {
  float: 'left'
};
const fRight = {
  float: 'right'
};

export default class SearchJourneyForm extends Component{
  render(){
    return (
      <div id="main-body">
        <div id="search-journey-body">
          <div id="search-journey-options">
            <form>
              <div id="drop-down-options">
                <div id="col">
                  <label htmlFor="journey-type">Journey Type</label>
                  <select id="journey-type">
                    <option value="SIN">Single</option>
                    <option value="RTN">Return</option>
                    <option value="MLJ">Multi-leg</option>
                  </select>
                </div>
                <div id="col">
                  <label htmlFor="num-of-adults">Number of Adults</label>
                  <select id="num-of-adults">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div id="col">
                  <label htmlFor="num-of-children">Number of Children</label>
                  <select id="num-of-children">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div id="col">
                  <label htmlFor="railcard-discount">Railcard</label>
                  <select id="railcard-discount">
                    <option>None</option>
                    <option value="STT">16-25 Railcard</option>
                    <option value="TST">26-30 Railcard</option>
                    <option value="SRC">Senior Railcard</option>
                    <option value="FFR">Family and Friends Railcard</option>
                    <option value="TTR">Two Together Railcard</option>
                    <option value="NRC">Network Railcard</option>
                    <option value="DPR">Disabled Persons Railcard</option>
                  </select>
                </div>
              </div>
                <div id="filter-options-title">
                  <p>Filter options</p><label><input type="checkbox"/>Use Account Preferences</label>
                </div>
                <div id="filter-options">
                  <ul>
                    <li style={fLeft}><label><input type="checkbox"/>Step free access</label></li>
                    <li style={fRight}><label><input type="checkbox"/>Departure assistance</label></li>
                    <li style={fLeft}><label><input type="checkbox"/>Bike Storage (Station)</label></li>
                    <li style={fRight}><label><input type="checkbox"/>Bike Storage (Train)</label></li>
                  </ul>
                </div>
            </form>
          </div>


          <div id="search-journey-inputs">
            <div id="search-journey-stations">
              <h2 id="title">Single</h2>
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
        </div>
      </div>   
    )
  }
}
