import React, { Component } from 'react'
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis varius, tristique justo id, cursus metus.</p>
        </div>
        <div className="footer-section">
          <h3>Address</h3>
          <p>08 Bagdahra Jokihat Araria Bihar India</p>
        </div>
        <div className="footer-section">
          <h3>Helpline Number</h3>
          <p>+918210513995</p>
        </div>
        <div className="footer-section">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>
        </div>
      </footer>
    )
  }
}

export default Footer;