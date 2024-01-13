import React, {Component} from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { fetchData } from '../../services/actions.js';
import './Home.css';
import salonImg from '../../assets/img/salon1.jpeg';

class Box extends Component {
    render() {
      const { title, description, image, id } = this.props;
      return (
        <div className="box">
          <Link to={{ pathname: `/item_page/${id}`, state: { id:id } }}>
            <img src={image} alt={title} />
          </Link>
          <h2>{title}</h2>
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
          username: '',
          isInQueue: 0,
        };
    }

    componentDidMount() {
      const user_name = Cookies.get('username');
      this.setState({ username: user_name });
      const data = {'username': user_name};
      fetchData('', data).then((res) => {
        console.log("res:",res.data.data);
        this.setState({ data:res.data.data, isInQueue: res.data.slots ?? 0 });
      }).catch((err) => {
        console.log("error is:", err)
      });
    }

    render() {
        const {data, isInQueue} = this.state;
        return (
            <div>
              <Header isInQueue={isInQueue}/>
              <div className="box-container">
                {Object.keys(data).map((key) => (
                <Box
                    id={data[key].id}
                    title={data[key].name}
                    description={data[key].description}
                    image={salonImg}
                />
                ))}
              </div>
              <Footer/>
            </div>
        );
    }
}

export default Home;