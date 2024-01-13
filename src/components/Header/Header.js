import React, { Component } from 'react'
import './Header.css';
import logoImage from '../../assets/img/logo.png'

class Header extends Component {
  render() {
    const { isInQueue } = this.props;
    return (
      <header className="header">
        <div className="logo-container">
          <img src={logoImage} alt="Website Logo" className="logo" />
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <nav className="nav-links">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </nav>
        {isInQueue?.length >= 1 && (
          <div className="is-in-queue">
            <a href="#">Yor have { isInQueue?.length } service in queue</a>
          </div>
        )}
        <div className="user-container">
          <img src={logoImage} alt="User Photo" className="user-photo" />
        </div>
      </header>
    )
  }
}

export default Header;