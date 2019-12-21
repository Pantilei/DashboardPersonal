import React from "react";
import { connect } from "react-redux";
import { taskFetch } from "../../actions";

class TasksMin extends React.Component {
  componentDidMount() {
    this.props.taskFetch();
  }
  renderInput = task => {
    if (task.status) {
      return (
        <input className="inputCheckbox" type="checkbox" checked readOnly />
      );
    } else {
      return <input className="inputCheckbox" type="checkbox" readOnly />;
    }
  };

  renderTasks = () => {
    return this.props.tasks.slice(0, 4).map((task, index) => {
      const checked = task.status ? "checked" : "";
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
