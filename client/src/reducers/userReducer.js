const INITIAL_STATE = {
  userId: null,
  username: "",
  uploadedImages: [],
  tasks: [{ task: "Enter your first task", status: false }]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

/* [
  { taskContent: "Enter your first task", taskStatus: true },
  { taskContent: "Second Task", taskStatus: true }
] */
