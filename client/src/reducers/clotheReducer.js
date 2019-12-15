import _ from "lodash";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CLOTHE":
      //console.log(_.mapKeys(action.payload, "id"));
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
