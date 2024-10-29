import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./components/layout"
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={ <Dashboard /> }></Route>
        <Route path='/login' element={ <Login /> }></Route>
      </Routes>
    </Layout>
  )
}

export default App