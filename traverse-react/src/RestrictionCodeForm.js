import React, {Component} from 'react';

export default class RestrictionCodeForm extends Component{
  render(){
    return(
      <div id="main-body">
        <div id="ticket">
          <div id="ticket-restriction-code-search">
            <h2>Search Ticket Restriction Code</h2>
            <div id="ticket-background">
                <p>
                  Traverse your journey with ease
                  <br/>
                  Search ticket code restrictions here:
                </p>

                <form>
                  <input type="text" name="ticket-restriction-code" placeholder="Enter Restriction Code"/>
                  <input type="submit" value="Search"/>
                </form>
            </div>
            <h2>
            </h2>
          </div>
        </div>

      </div>
    )
  }
}
