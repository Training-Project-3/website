import React from "react"
import Routers from "./Router/index"
import "./Css/fontStyle.css"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}
export default App
