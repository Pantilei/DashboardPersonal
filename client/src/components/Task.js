import React from "react";
import { connect } from "react-redux";

import { taskUpdate, taskFetch, deleteTask } from "../actions";
import { FieldArray, Field, reduxForm } from "redux-form";

import HomeButton from "./HomeButton";

class Task extends React.Component {
  async componentDidMount() {
    await this.props.taskFetch();
    this.props.initialize({
      taskArray: this.props.initVal
      //[{ task: "Trying to make two fields", status: true }]
    });
  }

  renderTask = formProps => {
    //console.log(formProps);
    //console.log(this.props);
    return (
      <div>
        <input
          className="inputTask"
          type={formProps.type}
          {...formProps.input}
          onBlur={() =>
            this.props.taskUpdate(formProps.input.value, false, formProps.id)
          }
        />
      </div>
    );
  };
  renderTaskStatus = formProps => {
    return (
      <label className="checkboxContainer">
        <input
          id="checkBox"
          className="inputCheckbox"
          type={formProps.type}
          {...formProps.input}
          onBlur={() =>
            this.props.taskUpdate(
              this.props.tasks[formProps.id].task,
              formProps.input.value,
              formProps.id
            )
          }
        />
        <span className="checkmark"></span>
      </label>
    );
  };

  /* deleteTask = e => {
    e.preventDefault();
    console.log(e);
    //this.props.deleteTask(index);
  }; */
  renderTasks = FieldArrayProps => {
    //console.log(FieldArrayProps);
    const { fields } = FieldArrayProps;
    return (
      <div className="taskContainerBig">
        {fields.map((member, index) => {
          //console.log("Member is:", member);
          return (
            <div key={index} className="taskForm">
              <button
                type="button"
                className="taskDelete"
                onClick={() => {
                  fields.remove(index);
                  return this.props.deleteTask(index);
                }}
              >
                Delete Task
              </button>
              <Field
                name={`${member}.task`}
                component={this.renderTask}
                type="text"
                id={index}
              />
              <Field
                name={`${member}.status`}
                component={this.renderTaskStatus}
                type="checkbox"
                id={index}
              />
            </div>
          );
        })}

        <button
          className="taskBtn"
          type="button"
          onClick={() => fields.push()}
        ></button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <HomeButton />
        <h1 className="photosHeading">Tasks Page</h1>
        <form>
          <FieldArray name="taskArray" component={this.renderTasks} />
        </form>
      </div>
    );
  }
}

const myTask = reduxForm({
  form: "taskForm"
})(Task);

const mapStateToProps = state => {
  return {
    tasks: state.user.tasks,
    initVal: state.user.tasks
  };
};

export default connect(mapStateToProps, { taskUpdate, taskFetch, deleteTask })(
  myTask
);
