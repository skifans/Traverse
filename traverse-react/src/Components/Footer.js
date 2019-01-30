import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <ul id="social-media-icons">
            <li>
              <a href="https://facebook.com">
                <img src="/images/facebooklogo.png" alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com">
                <img src="/images/twitterlogo.png" alt="Twitter" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com">
                <img src="/images/instagramlogo.png" alt="Instagram" />
              </a>
            </li>
            <li>
            <a href="https://youtube.com">
              <img src="/images/youtubelogo.png" alt="Youtube" />
            </a>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li><a href="/">About this site</a></li>
            <li> | </li>
            <li><a href="/">Sitemap</a></li>
            <li> | </li>
            <li><a href="/">Terms of Use</a></li>
            <li> | </li>
            <li><a href="/">Contact Us</a></li>
            <li> | </li>
            <li><a href="/">Privacy Policy</a></li>
          </ul>
        </div>
        <p id="copyright">Copyright &copy; Traverse 2019. All rights reserved.</p>
      </footer>
    );
  }
}
