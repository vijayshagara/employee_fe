import { useReducer, useEffect, useContext } from "react";
import "@mui/material";
import "@mui/styled-engine-sc";
import "@mui/x-data-grid";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DataTable from "./Component/Table/table";
import AddEmploy from "./Component/AddEmployeeFrom/AddEmploy";
import SignIn from "./Component/Login/Login";
import SignupForm from "./Component/SignUp/SginUp";
import { getToken, setToken } from "./Service/Storage/storage";
import { setAuthHearders } from "./Service/Api";
import StateContext from "./Component/contexts/StateContext";
import DispatchContext from "./Component/contexts/DispatchContext";

function App() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialValue = {
    isLoggedIn: Boolean(getToken()),
    token: getToken(),
  };

  const appReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isLoggedIn: true,
          token: action.value,
        };
      case "logout":
        return {
          ...state,
          isLoggedIn: false,
          token: "",
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(appReducer, initialValue);

  useEffect(() => {
    if (state.token) {
      setToken({ token: state.token });
      setAuthHearders({ accessToken: state.token });
    }
  }, [state.token]);

  useEffect(() => {
    if (!state.isLoggedIn) {
      setToken({ token: "" });
      setAuthHearders({ accessToken: "" });
    }
  }, [state.isLoggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<DataTable />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/add-emp" element={<AddEmploy />} />
          <Route path="/edit-emp/:id" element={<AddEmploy />} />
        </Routes>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
