import React from "react";
import { connect } from "react-redux";
/* import { geolocated } from "react-geolocated"; */

import { fetchWeather } from "../../actions";

class WeatherMin extends React.Component {
  componentDidMount() {
    this.startApp();
  }

  startApp() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition = position => {
    console.log(position.coords.latitude, position.coords.longitude);
    this.props.fetchWeather(
      position.coords.latitude,
      position.coords.longitude
    );
  };

  render() {
    return (
      <>
        <div className="blockHeader">
          <h1>Weather</h1>
        </div>
        <div className="blockContent">
          <div className="block-item">
            <img
              src={`http://openweathermap.org/img/wn/${this.props.weather.icon}@2x.png`}
              className=""
              alt="weather"
            ></img>
          </div>
          <div className="block-item">
            <h3>{this.props.weather.deg} degrees</h3>
          </div>
        </div>
        <div className="city">
          <h3>{this.props.weather.city}</h3>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return { weather: state.weather };
};
export default connect(mapStateToProps, { fetchWeather })(WeatherMin);
