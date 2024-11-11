import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./components/layout"
import Home from "./pages/home";
import NewPage from "./pages/new-page";
import EditPage from "./pages/edit-page";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/new' element={ <NewPage /> }></Route>
        <Route path='/edit/:id' element={ <EditPage /> }></Route>
      </Routes>
    </Layout>
  )
}

export default App