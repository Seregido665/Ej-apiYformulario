//import { useNavigate } from "react-router-dom"
import BotonSubmenu from '../buttons/butsSubMenu'
import Navbar from '../navbar/navbar'
import '../../styles/aboutMe.css'

const About = () => {
    //const navigate = useNavigate();
    return (
        <div>
            <div className="menu">
                <Navbar 
                    type="navbar botones"
                    text="Sobre mi"
                 />
            </div>
        </div>
    )
}

export default About;