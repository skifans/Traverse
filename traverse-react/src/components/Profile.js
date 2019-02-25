import React from 'react';

export default () => (
  <main>
      <div id="profile-container">
            <div id="recent">
                <p>Recent searches</p>
            </div>
            <div id="recommended">
                <p>Recommended journeys</p>
            </div>
            <div id="profile">
                <div id="details">
                    <div id="text">
                        <h3>Rose Meachum</h3>
                        <p>member since 2016</p>
                    </div>
                    <img src="images/profile.png" alt="Profile" />
                </div>
                <ul id="buttons">
                    <li>Change username</li>
                    <li>Change password</li>
                    <li>Change preferences</li>
                    <li>Change something</li>
                    <li>Delete account</li>
                </ul>
            </div>
        </div>
  </main>
);
