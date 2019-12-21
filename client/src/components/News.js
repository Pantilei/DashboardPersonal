import React from "react";
import { connect } from "react-redux";
import HomeButton from "./HomeButton";
import { fetchNews } from "../actions";

class News extends React.Component {
  async componentDidMount() {
    await this.props.fetchNews();
    console.log(this.props.news);
  }

  render() {
    if (!this.props.news) {
      return <div>Loading...</div>;
    }
    return (
      <div className="news">
        <HomeButton />
        <h1 className="photosHeading">News </h1>
        <img src={this.props.news.pic} alt="NewsPhoto" />
        <h2>{this.props.news.title}</h2>
        <p>{this.props.news.content}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { news: state.news };
};
export default connect(mapStateToProps, { fetchNews })(News);
