import React, {Component} from 'react';

export default class Footer extends Component{
  render(){
    return(
      <div className="footer">
      <div>
        <ul className="social-media-icons">
          <li>
            <a href="https://facebook.com">
              <img src="images/facebooklogo.png" alt="facebook"/>
            </a>
          </li>
          <li>
            <a href="https://twitter.com">
              <img src="images/twitterlogo.png" alt="twitter"/>
            </a>
          </li>
          <li>
            <a href="https://instagram.com">
              <img src="images/instagramlogo.png" alt="instagram"/>
            </a>
          </li>
          <li>
          <a href="https://youtube.com">
            <img src="images/youtubelogo.png" alt="youtube"/>
          </a>
          </li>
        </ul>
      </div>

        <div>
          <ul>
            <li><a href="">About this site</a></li>
            <li> | </li>
            <li><a href="">Sitemap</a></li>
            <li> | </li>
            <li><a href="">Terms of Use</a></li>
            <li> | </li>
            <li><a href="">Contact Us</a></li>
            <li> | </li>
            <li><a href="">Privacy Policy</a></li>
          </ul>
        </div>
        <p className="copyright">Copyright © Traverse 2018. All rights reserved.</p>
      </div>
    )
  }
}
