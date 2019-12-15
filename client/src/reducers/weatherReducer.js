const INITIAL_STATE = { deg: 0, city: "London", icon: "01d" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "WEATHER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
