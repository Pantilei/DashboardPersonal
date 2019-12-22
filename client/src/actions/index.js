import weatherAPI from "../api/weatherAPI";
import backend from "../api/backend";
import history from "../history";
import chloteDATA from "../api/clotheDATA";
import { csv } from "d3-fetch";

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

  const response = await backend.post("/api/signup", formValues);
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
  const response = await backend.post("/api/login", { ...formValues });
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
  const response = await backend.get("/api", {
    headers: { authorization: `Bearer ${token}` }
  });
  //console.log("token from home", response.data.token);
  dispatch({ type: "USER", payload: response.data });
};

export const onImageSubmit = image => async dispatch => {
  console.log("before Image submit");

  const token = localStorage.getItem("token");
  const response = await backend.post("/api/photos", image, {
    headers: { authorization: `Bearer ${token}` }
  });
  //const response = await backend.post("/photos", image);
  console.log(response.data);
  dispatch({ type: "USER", payload: response.data });
};

export const imageDownload = () => async dispatch => {
  console.log("waiting for response");
  const token = localStorage.getItem("token");
  const response = await backend.get("/api/photos", {
    headers: { authorization: `Bearer ${token}` }
  });
  //const response = await backend.get("/photos");
  console.log(response.data);
  dispatch({ type: "USER", payload: response.data });
};

export const deletePhoto = image => async dispatch => {
  const token = localStorage.getItem("token");
  console.log(image);
  await backend.delete("/api/photos", {
    data: { image },
    headers: { authorization: `Bearer ${token}` }
  });
  await dispatch(imageDownload());
  console.log("deleting the image");
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
    "/api/tasks",
    { task: taskNew, status: status, taskId: id },
    { headers: { authorization: `Bearer ${token}` } }
  );
  //let tasksFromState = getState().user.tasks;
  //let newState = { tasks: tasksFromState.splice(id, 1, taskNew) };
  dispatch({ type: "USER", payload: response.data });
};

export const taskFetch = () => async dispatch => {
  const token = localStorage.getItem("token");
  const response = await backend.get("/api/tasks", {
    headers: { authorization: `Bearer ${token}` }
  });
  //let tasksFromState = getState().user.tasks;
  //let newState = { tasks: tasksFromState.splice(id, 1, taskNew) };
  dispatch({ type: "USER", payload: response.data });
};
export const deleteTask = index => async dispatch => {
  const token = localStorage.getItem("token");
  console.log("Deleting task!", index);
  const response = await backend.delete("/api/tasks", {
    data: { index },
    headers: { authorization: `Bearer ${token}` }
  });
  dispatch({ type: "USER", payload: response.data });
  // or we can use this one
  //await dispatch(taskFetch());
  console.log("Deleting Task after dispatch ", index);
};

export const fetchWinner = winner => async dispatch => {
  const data = await csv(
    "https://cors-anywhere.herokuapp.com/http://www.football-data.co.uk/mmz4281/1718/I1.csv"
  );
  let newData = data.map(row => {
    if (row.FTR === "H") {
      let res = "Home Win";
      return { homeTeam: row.HomeTeam, awayTeam: row.AwayTeam, res };
    } else if (row.FTR === "A") {
      let res = "Away Win";
      return { homeTeam: row.HomeTeam, awayTeam: row.AwayTeam, res };
    } else {
      let res = "Draw";
      return { homeTeam: row.HomeTeam, awayTeam: row.AwayTeam, res };
    }
  });
  const loosers = [];
  const teams = {};
  newData.forEach(match => {
    if (match.homeTeam === winner && match.res === "Home Win") {
      loosers.push(match.awayTeam);
    } else if (match.awayTeam === winner && match.res === "Away Win") {
      loosers.push(match.homeTeam);
    }
    teams[match.homeTeam] = match.homeTeam;
    teams[match.awayTeam] = match.awayTeam;
  });
  dispatch({
    type: "WINNER",
    payload: { winner, loosers, teams: Object.values(teams) }
  });
};

export const fetchNews = () => async dispatch => {
  const response = await backend.get("/api/news");
  //console.log(response.data);
  /* const response = {
    title: "Great Warior",
    content: "This is content of news",
    pic: "https://www.helsinkitimes.fi/images/2019/Dec/TIP15-1.jpg"
  }; */
  dispatch({ type: "NEWS", payload: response.data });
};
