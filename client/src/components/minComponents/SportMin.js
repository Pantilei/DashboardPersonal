import React from "react";
import { connect } from "react-redux";
import { fetchWinner } from "../../actions";

class SportMin extends React.Component {
  componentDidMount() {
    this.props.fetchWinner("Juventus");
  }
  renderSport = () => {
    if (this.props.team) {
      return (
        <div className="newsMin">
          <h1>{this.props.team.winner}</h1>
          <p>
            {`In 2017 Juventus beated ${this.props.team.loosers.length} teams.`}{" "}
          </p>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };
  render() {
    return (
      <div className="blockHeader">
        <h1>Sport</h1>
        {this.renderSport()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { team: state.sport };
};
export default connect(mapStateToProps, { fetchWinner })(SportMin);
