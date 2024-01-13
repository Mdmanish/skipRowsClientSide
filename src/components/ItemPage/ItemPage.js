import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { operationOnTimes } from '../Helper.js';
import { fetchData, postBooking } from '../../services/actions.js';
import './ItemPage.css';
import salonImg from '../../assets/img/salon1.jpeg';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup.js';
// import background_video from '../../assets/background_video.mp4';

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

  componentDidMount() {
    const id = window.location.href.split('/')[4];
    this.setState({ salonId: id });

    fetchData(`book/${id}`).then((res) => {
      console.log("res:",res);
      this.setState({ data:res.data });
    }).catch((err) => {
      console.log("error is:", err)
    });
  }
  render() {
    const {data, selectedRows, totalExpectedTime, totalAmount} = this.state;
    let confirmMessage = null;
    let infoMessage = null;

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
    return (
      <>
      {confirmMessage}
      {infoMessage}
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
            <h2>{`Number of people in the queue is: ${ data.queue_size } and expected time to complete it: ${ data.expected_time }hr`}</h2>
            <div className='salon-box-innner'>
              <div className='salon-box-innner-left'>
                <h2>{data.salon?.name}</h2>
                <p>{data.salon?.description}</p>
                <h3>Address:</h3> <p> {data.salon?.street} {data.salon?.landmark} {data.salon?.pincode}</p>
                <p>Mobile no: {data.salon?.mobile}</p>
              </div>
              <div className='salon-box-innner-middle'>
                <img src={salonImg} alt={data.salon?.name} />
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

export default ItemPage;
