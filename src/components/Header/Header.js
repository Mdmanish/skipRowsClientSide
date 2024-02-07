import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import logoImage from '../../assets/img/logo.png'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    const { isInQueue, queueSize, waitingTime, bookingSalonId, userName } = this.props;
    return (
      <header className="header">
        <div className="logo-container">
          <Link to="/" className="link">
            <img src={logoImage} alt="Website Logo" className="logo" />
          </Link>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <nav className="nav-links">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </nav>
        {!userName && (
          <div className="login">
            <a href="/login">Login</a>
          </div>
        )}
        {isInQueue?.length >= 1 && (
          <div className="is-in-queue-container">
            <div className="is-in-queue">
              <p>Waiting time &asymp; { waitingTime }</p>
            </div>
            <div className="is-in-queue">
              <p>{ queueSize } in queue</p>
            </div>
            <div className="is-in-queue">
              <Link to={{ pathname: `/item_page/${bookingSalonId}`, state: { id:bookingSalonId } }}>
                <a href="#">{ isInQueue?.length } Booking</a>
              </Link>
            </div>
          </div>
        )}
        <div className="user-container">
          <img src={logoImage} alt="User Photo" className="user-photo" />
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.userReducer.userName,
    bookingSalonId: state.bookingReducer.salonId
  }
}

export default connect(mapStateToProps) (Header);