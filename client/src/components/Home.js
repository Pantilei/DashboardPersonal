import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";
import { home } from "../actions";

import WeatherMin from "./minComponents/WeatherMin";
import NewsMin from "./minComponents/NewsMin";
import SportMin from "./minComponents/SportMin";
import TasksMin from "./minComponents/TasksMin";
import PhotosMin from "./minComponents/PhotosMin";
import ChlotesMin from "./minComponents/ClothesMin";
import LoginButton from "./LoginButton";

class Home extends React.Component {
  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
    await this.props.home();
    if (!this.props.user.username) {
      history.push("/login");
    }
  }

  render() {
    return (
      <>
        <LoginButton />
        <div className="welcome">
          <h1>Good day {this.props.user.username}</h1>
        </div>
        <div className="dashboard">
          <div className="dashboardItem">
            <WeatherMin className="dashboardItem" />
          </div>
          <Link to="/news" className="dashboardItem">
            <NewsMin />
          </Link>
          <Link to="/sport" className="dashboardItem">
            <SportMin />
          </Link>
          <Link to="/photos" className="dashboardItem">
            <PhotosMin />
          </Link>
          <Link to="/tasks" className="dashboardItem">
            <TasksMin />
          </Link>
          <div className="dashboardItem">
            <ChlotesMin />
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps, { home })(Home);
