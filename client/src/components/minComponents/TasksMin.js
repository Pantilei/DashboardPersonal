import React from "react";
import { connect } from "react-redux";
import { taskFetch } from "../../actions";

class TasksMin extends React.Component {
  constructor(props) {
    super(props);
    this.checkboxRef = React.createRef();
  }
  componentDidMount() {
    this.props.taskFetch();
  }
  renderInput = task => {
    /* console.log("CheckBoxRef: ", this.checkboxRef);
    if (this.checkboxRef.current) {
      this.checkboxRef.current.defaultChecked = task.status;
    } */
    if (task.status) {
      return (
        <input
          className="inputCheckbox"
          ref={this.checkboxRef}
          type="checkbox"
          checked
          readOnly
        />
      );
    } else {
      return (
        <input
          className="inputCheckbox"
          ref={this.checkboxRef}
          type="checkbox"
          readOnly
        />
      );
    }
  };

  renderTasks = () => {
    return this.props.tasks.slice(0, 4).map((task, index) => {
      return (
        <div key={index} className="taskContainer">
          <h1>{task.task}</h1>
          <label className="checkboxContainerTaskMin">
            {this.renderInput(task)}
            <span className="checkmarkTaskMin"></span>
          </label>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="blockHeader">
        <h1>Tasks</h1>
        {this.renderTasks()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { tasks: state.user.tasks };
};
export default connect(mapStateToProps, { taskFetch })(TasksMin);
//{tasks[0].status, tasks[0].task}
