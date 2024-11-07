import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./components/layout"
import Home from "./pages/home";
import Editor from "./pages/editor";
import EditPage from "./pages/edit-editor";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/new' element={ <Editor /> }></Route>
        <Route path='/edit/:id' element={ <EditPage /> }></Route>
      </Routes>
    </Layout>
  )
}

export default App