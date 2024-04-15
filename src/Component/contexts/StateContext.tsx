import { createContext } from "react";

let initialValue = {
  isLoggedIn: false,
  token: '',
  user: '',
}

const StateContext = createContext(initialValue)

export default StateContext;