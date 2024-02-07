import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { fetchData } from '../../services/actions.js';
import { setBookingDetails } from "../../Store/Actions/bookingAction.js";
import { setUserDetails } from "../../Store/Actions/userAction.js";
import { setMainDetails } from "../../Store/Actions/mainAction.js";
import './Home.css';

class Box extends Component {
    render() {
      const { title, description, image, id, distance_to_user } = this.props;
      return (
        <div className="box">
          <Link to={{ pathname: `/item_page/${id}`, state: { id:id } }}>
            <img src={image} alt={title} />
          </Link>
          <h2>{title}</h2>
          <h4>Distance: {parseInt(distance_to_user)}m</h4>
          <p>{description}</p>
        </div>
      );
    }
  }

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: '',
          // username: '',
          isInQueue: 0,
          queueSize: 0,
          waitingTime: "0:0",
          bookedSalonId: null,
          location: null,
        };
    }

    fetchDataFunc = (data = null) => {
      fetchData('', data).then((res) => {
        console.log("res in:",res.data.data);
        this.setState({
          data:res.data.data,
          isInQueue: res.data.slots ?? 0,
          queueSize: res.data.queue_size ?? 0,
          waitingTime: res.data.waiting_time ?? "0:0",
          bookedSalonId: res.data.salon_id ?? null
        }, () => this.props.setBookingDetails({bookedSalonId: this.state.bookedSalonId}));
      }).catch((err) => {
        console.log("error is:", err)
      });
    }

    componentDidMount() {
      const user_name = Cookies.get('username');
      let data = {username: user_name};

      if (navigator.geolocation) {
        // Use the Geolocation API to get the current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.setState({ location: { latitude, longitude } }, () => {
              data = { ...data, location: this.state.location };
              console.log('data', data);
              this.fetchDataFunc(data);
            });
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser');
      }

      this.props.setUserDetails(user_name);
      this.props.setMainDetails({ salonId: 1 });
    }

    render() {
        const {data, isInQueue, queueSize, waitingTime, bookedSalonId} = this.state;
        return (
            <div>
              <Header isInQueue={isInQueue} queueSize={queueSize} waitingTime={waitingTime} bookedSalonId={bookedSalonId} />
              <div className="box-container">
                {Object.keys(data).map((key) => (
                <Box
                    id={data[key].id}
                    title={data[key].name}
                    description={data[key].description}
                    image={data[key].image_url}
                    distance_to_user={data[key].distance_to_user}
                />
                ))}
              </div>
              <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    userName : state.userReducer.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetails: (userName) => dispatch(
      setUserDetails({
        userName: userName
      })
      ),
    setBookingDetails: (data) => dispatch(
      setBookingDetails({
        salonId: data.bookedSalonId
      })
    ),
    setMainDetails: (data) => dispatch(
      setMainDetails({
        salonId: data.salonId
      })
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
