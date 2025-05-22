import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormComponent from "./FormComponent.jsx"
import SuccessComponent from './SuccessComponent.jsx'
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormComponent />} />
      <Route path="/success" element={<SuccessComponent />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
