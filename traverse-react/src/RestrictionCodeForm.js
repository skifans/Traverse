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
                  Traverse with ease
                  <br/>
                  Search ticket code restrictions here:
                </p>

                <form>
                  <label for="ticket-restriction-code" id="label-route"><img src="images/route.png"/></label><br/>
                  <input type="text" name="ticket-restriction-code" placeholder="Enter Restriction Code"/>
                  <input type="submit" value="Search"/>
                </form>
            </div>
            <h3>
              <img src="images/raillogo.png" alt="raillogo" height="30px" width="47px"/>
            </h3>
          </div>
        </div>

      </div>
    )
  }
}
