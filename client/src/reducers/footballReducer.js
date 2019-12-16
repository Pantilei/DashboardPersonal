const INITIAL_STATE = { winner: "", loosers: [], teams: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "WINNER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
