import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./components/layout"
import Home from "./pages/home";
import Recent from "./pages/recent";
import Starred from "./pages/starred";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/recent' element={ <Recent /> }></Route>
        <Route path='/starred' element={ <Starred /> }></Route>
      </Routes>
    </Layout>
  )
}

export default App