import React from "react";
import HomeButton from "./HomeButton";
import { connect } from "react-redux";
import { fetchWinner } from "../actions";
import { Field, reduxForm } from "redux-form";

class Sport extends React.Component {
  async componentDidMount() {
    await this.props.fetchWinner("Juventus");
    //console.log(this.props.loosers);
    //console.log(this.props.winner);
  }

  renderLoosers = () => {
    if (!this.props.loosers) {
      return <div>Loading...</div>;
    }
    return this.props.loosers.map((looser, index) => {
      return (
        <li key={index} className="teamListItem">
          {looser}
        </li>
      );
    });
  };
  renderOption = () => {
    if (!this.props.teams) {
      return <option value="wait" />;
    }
    return this.props.teams.map((team, index) => {
      return (
        <div key={index}>
          <option value={team} />
        </div>
      );
    });
  };
  renderSearch = fieldProps => {
    //console.log(fieldProps);
    return (
      <>
        <input
          type={fieldProps.input.type}
          list={fieldProps.list}
          {...fieldProps.input}
          placeholder="Winner team, ex: Juventus"
        />
        <datalist id="teams">{this.renderOption()}</datalist>
      </>
    );
  };

  onSubmit = formValues => {
    console.log(formValues);
    this.props.fetchWinner(formValues.searchForTeam);
  };

  render() {
    return (
      <div>
        <HomeButton />
        <form
          className="form searchForm"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="searchForTeam"
            component={this.renderSearch}
            type="text"
            list="teams"
          />
          <button className="searchBTN" type="submit">
            Find the Loosers
          </button>
        </form>
        <h1 className="photosHeading">Sport</h1>
        <ul className="teamList">{this.renderLoosers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    winner: state.sport.winner,
    loosers: state.sport.loosers,
    teams: state.sport.teams
  };
};

const form = reduxForm({
  form: "sportForm"
})(Sport);
export default connect(mapStateToProps, { fetchWinner })(form);
