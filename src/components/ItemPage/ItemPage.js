import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { operationOnTimes } from '../Helper.js';
import { fetchData, postBooking } from '../../services/actions.js';
import './ItemPage.css';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup.js';

class ItemPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: '',
        salonId: '',
        selectedRows: [],
        totalExpectedTime: "0:0",
        totalAmount: 0,
        showConfirmPopup: false,
        showInfoPopup: false,
        showConfirmCancelPopup: false,
        isCancelled: false,
      };
    }

  handleCheckboxChange = (id, time, price) => {
    // Update the selectedRows state when a checkbox is changed
    this.setState((prevState) => {
      const selectedRows = [...prevState.selectedRows];
      const index = selectedRows.indexOf(id);

      if (index !== -1) {
        // If the id is already in the selectedRows, remove it
        selectedRows.splice(index, 1);
        return {
          selectedRows,
          totalExpectedTime: operationOnTimes(prevState.totalExpectedTime, time, '-'),
          totalAmount: prevState.totalAmount - price,
        };
      } else {
        // If the id is not in the selectedRows, add it
        selectedRows.push(id);
        return {
          selectedRows,
          totalExpectedTime: operationOnTimes(prevState.totalExpectedTime, time, '+'),
          totalAmount: prevState.totalAmount + price,
        };
      }
    });
  };

  clearCheckBoxes = () => {
    this.setState({ selectedRows: [], totalExpectedTime: "0:0", totalAmount: 0 });
  };

  handleBookButton = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      alert("Please select at least one service");
      return;
    }
    this.setState({ showConfirmPopup: true });
  };

  submitHandler = () => {
    this.setState({ showConfirmPopup: false });
    const {salonId, selectedRows, totalExpectedTime, totalAmount} = this.state;

    const data = {
      selectedRows: selectedRows,
      totalExpectedTime: totalExpectedTime,
      totalAmount: totalAmount,
      userName: Cookies.get('username'),
    }
    postBooking(`book/${salonId}`, data).then((res) => {
      console.log("res:",res);
      this.setState({ showInfoPopup: true });
    }).catch((err) => {
      console.log("error is:", err);
    });

    this.clearCheckBoxes();
  };

  handleCancelBooking = () => {
    this.setState({ showConfirmCancelPopup: false });
    const {salonId} = this.state;
    const {userName} = this.props;
    const data = {
      userName: userName,
      salonId: salonId,
    }
    postBooking(`cancel/${salonId}`, data).then((res) => {
      console.log("res:",res);
      this.setState({ isCancelled: true });
    }).catch((err) => {
      console.log("error is:", err);
    });
  }

  componentDidMount() {
    // const { id } = this.props.location.state || {};
    const id = parseInt(window.location.href.split('/')[4]);
    this.setState({ salonId: id });
    console.log("id:", this.props.id);

    fetchData(`book/${id}`).then((res) => {
      console.log("res:",res);
      this.setState({ data:res.data });
    }).catch((err) => {
      console.log("error is:", err)
    });
  }
  render() {
    const {data, selectedRows, totalExpectedTime, totalAmount, salonId, isCancelled} = this.state;
    // const id = parseInt(window.location.href.split('/')[4]);
    // console.log("id:", id);
    let confirmMessage = null;
    let infoMessage = null;
    let cancelPopup = null;

    if (this.state.showInfoPopup) {
      infoMessage = (
        <ConfirmPopup
          title="Info"
          message={`Your slot is booked successfully!\nYour number is: ${data.queue_size + 1}\nYour waiting time is: ${data.expected_time}`}
          infoOnly
          submitHandler={() => this.setState({ showInfoPopup: false })}
          closeWarningPopup={() => this.setState({ showInfoPopup: false })}
        />
      );
    }
    if (this.state.showConfirmPopup) {
      confirmMessage = (
        <ConfirmPopup
          title="Confirm Booking"
          message="Do you confirm you want to book your slot?"
          submitHandler={this.submitHandler}
          closeWarningPopup={() => this.setState({ showConfirmPopup: false })}
        />
      );
    }
    if (this.state.showConfirmCancelPopup) {
      cancelPopup = (
        <ConfirmPopup
          title="Confirm Cancellation"
          message="Do you confirm you want to cancel your booking?"
          submitHandler={this.handleCancelBooking}
          closeWarningPopup={() => this.setState({ showConfirmCancelPopup: false })}
        />
      )
    }
    return (
      <>
      {confirmMessage}
      {infoMessage}
      {cancelPopup}
      <div>
        <Header/>
        {/* <div className="video-background">
          <video autoPlay loop muted>
            <source src={background_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
        <div className='body'>
          <div className='heading'>
            <h1>Book Your Slot</h1>
          </div>
          <div className='salon-box'>
            <div className="queue-container">
              <div className="queue">
                <p>Number of people in the queue is: { data.queue_size }</p>
              </div>
              <div className="queue">
                <p>Expected time to complete it &asymp; { data.expected_time }</p>
              </div>
              {this.props.bookedSalonId === salonId && !isCancelled && (
                <button className="cancel-booking" onClick={() => {this.setState({ showConfirmCancelPopup: true });}}>Cancel booking</button>
              )}
            </div>
            <div className='salon-box-innner'>
              <div className='salon-box-innner-left'>
                <h2>{data.salon?.name}</h2>
                <p>{data.salon?.description}</p>
                <h3>Address:</h3> <p> {data.salon?.street} {data.salon?.landmark} {data.salon?.pincode}</p>
                <p>Mobile no: {data.salon?.mobile}</p>
              </div>
              <div className='salon-box-innner-middle'>
                <img src={data.salon?.image_url} alt={data.salon?.name} />
              </div>
              <div className='salon-box-innner-right'>
                <a href={data.salon?.location_link}>click here to see on google map</a>
              </div>
            </div>
          </div>
          <div className='services'>
            <h2>Services are....</h2>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Service name</th>
                  <th>Time taken</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              {data.services && data.services.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => this.handleCheckboxChange(row.id, row.time, row.price)}
                    />
                  </td>
                  <td>{row.service__name}</td>
                  <td>{row.time}</td>
                  <td>{row.price}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='total'>
            <h2>Total estimited time: {totalExpectedTime}</h2>
            <h2>Total amount to be paid: {totalAmount}</h2>
          </div>
          <div className='submit-button'>
            <button
            type='button'
            onClick={() => this.handleBookButton()}
            >
              Book
            </button>
            <button
            type='button'
            onClick={() => this.clearCheckBoxes()}
            >
              Clear
            </button>
          </div>
        </div>
        <Footer/>
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bookedSalonId: state.bookingReducer.salonId,
    salonId: state.mainReducer.salonId,
    userName: state.userReducer.userName
  }
}

export default connect(mapStateToProps)(ItemPage);
