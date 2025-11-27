import {Routes, Route } from "react-router-dom"
import MainMenu from "./components/views/main"
import Details from "./components/views/detail"
import Profile from "./components/views/profile"
import Contact from "./components/views/contact"
import About from "./components/views/aboutMe"
import './App.css'

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/main" element={<MainMenu />} />
          <Route path="/detail/:id" element={<Details />} />
                            {/* id PASA A SER UN "parametro dinamico": Parte de la URL que va cambiando.*/}
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/edit/:id" element={<Profile />} />
          <Route path="/aboutMe" element={<About />} />
          <Route path="*" element={<MainMenu />} /> 
        </Routes>
      </div>
    </>
  )
}
export default App;
