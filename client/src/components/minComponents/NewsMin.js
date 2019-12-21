import React from "react";
import { connect } from "react-redux";
import { fetchNews } from "../../actions";

class NewsMin extends React.Component {
  componentDidMount() {
    this.props.fetchNews();
    console.log(this.props);
  }
  renderTitle = () => {
    if (this.props.news) {
      return (
        <div className="newsMin">
          <h1>{this.props.news.title}</h1>
          <p>{this.props.news.content}</p>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };
  render() {
    return (
      <div className="blockHeader">
        <h1>News</h1>
        {this.renderTitle()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { news: state.news };
};

export default connect(mapStateToProps, { fetchNews })(NewsMin);
