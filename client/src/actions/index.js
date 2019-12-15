import weatherAPI from "../api/weatherAPI";
import backend from "../api/backend";
import history from "../history";
import chloteDATA from "../api/clotheDATA";

export const fetchWeather = (lat, lon) => async dispatch => {
  const response = await weatherAPI.get(
    `/weather?lat=${lat}&lon=${lon}&appid=d0a10211ea3d36b0a6423a104782130e`
  );
  //console.log(response.data);
  dispatch({
    type: "WEATHER",
    payload: {
      deg: Math.round(response.data.main.temp - 273.15),
      city: response.data.name,
      icon: response.data.weather[0].icon
    }
  });
};

export const formSignUp = formValues => async dispatch => {
  console.log("response await");

  const response = await backend.post("/signup", formValues);
  console.log(response.data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  if (!response.data.message) {
    history.push("/");
  }
  dispatch({ type: "USER", payload: response.data });
};

export const formLogIn = formValues => async (dispatch, getState) => {
  const response = await backend.post("/login", { ...formValues });
  console.log("token from login", response.data.token);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  dispatch({ type: "USER", payload: response.data });
  if (!response.data.message) {
    history.push("/");
  }
};

export const home = () => async dispatch => {
  //console.log("token from home before request", localStorage.getItem("token"));
  //const response = await backend.get("/");
  const token = localStorage.getItem("token");
  const response = await backend.get("/", {
    headers: { authorization: `Bearer ${token}` }
  });
  //console.log("token from home", response.data.token);
  dispatch({ type: "USER", payload: response.data });
};

export const onImageSubmit = image => async dispatch => {
  console.log("before Image submit");

  const token = localStorage.getItem("token");
  const response = await backend.post("/photos", image, {
    headers: { authorization: `Bearer ${token}` }
  });
  //const response = await backend.post("/photos", image);
  console.log(response.data);
  dispatch({ type: "USER", payload: response.data });
};

export const imageDownload = () => async dispatch => {
  console.log("waiting for response");
  const token = localStorage.getItem("token");
  const response = await backend.get("/photos", {
    headers: { authorization: `Bearer ${token}` }
  });
  //const response = await backend.get("/photos");
  console.log(response.data);
  dispatch({ type: "USER", payload: response.data });
};

export const fetchData = () => {
  /* const clothesTypes = [
    "jumper",
    "hoodie",
    "jacket",
    "sweater",
    "blazer",
    "raincoat"
  ]; */
  const days = {};
  for (let value of chloteDATA.payload) {
    if (value.clothe === "jacket" && days["jacket"]) {
      days["jacket"]++;
    } else if (value.clothe === "sweater" && days["sweater"]) {
      days["sweater"]++;
    } else if (value.clothe === "hoodie" && days["hoodie"]) {
      days["hoodie"]++;
    } else if (value.clothe === "jumper" && days["jumper"]) {
      days["jumper"]++;
    } else if (value.clothe === "raincoat" && days["raincoat"]) {
      days["raincoat"]++;
    } else if (value.clothe === "blazer" && days["blazer"]) {
      days["blazer"]++;
    } else if (value.clothe === "jacket" && !days["jacket"]) {
      days["jacket"] = 1;
    } else if (value.clothe === "sweater" && !days["sweater"]) {
      days["sweater"] = 1;
    } else if (value.clothe === "hoodie" && !days["hoodie"]) {
      days["hoodie"] = 1;
    } else if (value.clothe === "jumper" && !days["jumper"]) {
      days["jumper"] = 1;
    } else if (value.clothe === "blazer" && !days["blazer"]) {
      days["blazer"] = 1;
    } else if (value.clothe === "raincoat" && !days["raincoat"]) {
      days["raincoat"] = 1;
    }
  }
  const data = [
    {
      id: "jacket",
      label: "jaket",
      value: days.jacket,
      color: "hsl(207, 70%, 50%)"
    },
    {
      id: "sweater",
      label: "sweater",
      value: days.sweater,
      color: "hsl(242, 70%, 50%)"
    },
    {
      id: "hoodie",
      label: "hoodie",
      value: days.hoodie,
      color: "hsl(106, 70%, 50%)"
    },
    {
      id: "jumper",
      label: "jumper",
      value: days.jumper,
      color: "hsl(345, 70%, 50%)"
    },
    {
      id: "blazer",
      label: "blazer",
      value: days.blazer,
      color: "hsl(106, 70%, 50%)"
    },
    {
      id: "raincoat",
      label: "raincoat",
      value: days.raincoat,
      color: "hsl(345, 70%, 50%)"
    }
  ];
  return { type: "CLOTHE", payload: data };
};

export const taskUpdate = (taskNew, status, id) => async (
  dispatch,
  getState
) => {
  const token = localStorage.getItem("token");
  const response = await backend.post(
    "/tasks",
    { task: taskNew, status: status, taskId: id },
    { headers: { authorization: `Bearer ${token}` } }
  );
  //let tasksFromState = getState().user.tasks;
  //let newState = { tasks: tasksFromState.splice(id, 1, taskNew) };
  dispatch({ type: "USER", payload: response.data });
};
export const taskFetch = () => async dispatch => {
  const token = localStorage.getItem("token");
  const response = await backend.get("/tasks", {
    headers: { authorization: `Bearer ${token}` }
  });
  //let tasksFromState = getState().user.tasks;
  //let newState = { tasks: tasksFromState.splice(id, 1, taskNew) };
  dispatch({ type: "USER", payload: response.data });
};
