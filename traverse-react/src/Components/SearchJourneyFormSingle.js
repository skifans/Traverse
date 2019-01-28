import React, {Component} from 'react';


export default class SearchJourneyFormSingle extends Component{
  render(){
    return (
      <div id="search-journey-inputs">
        <div id="search-journey-stations">
          <h2 id="title">Single</h2>
          <form>
            <input type="text" placeholder="Origin"></input><br/>
            <img src="../images/downArrow.png" height="30px" width="auto"></img><br/>
            <input type="text" placeholder="Destination"></input><br/>
          </form>
        </div>
        <div id="calendar-container">
          <table>
            <tr>
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
        </div>
      </div>
    )
  }
}
