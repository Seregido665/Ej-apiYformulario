import Navbar from '../navbar/navbar'
import '../../styles/aboutMe.css'

const About = () => {
    return (
        <div>
            <div className="">
                <Navbar
                    text="Sobre mi"
                />
            </div>

            <div className="about-content">
                <div className="about-text1">
                    <h3>No sé como pasé de hacer esto:</h3>
                </div>

                <div className="images-container">
                    <div className="image-wrapper">
                        <img src="/imgPort/port1.jpg" alt="Proyecto 1" className="about-image" />
                    </div>
                    <div className="image-wrapper">
                        <img src="/imgPort/port2.jpg" alt="Proyecto 2" className="about-image" />
                    </div>
                    <div className="image-wrapper">
                        <img src="/imgPort/port3.jpg" alt="Proyecto 3" className="about-image" />
                    </div>
                    <div className="image-wrapper">
                        <img src="/imgPort/port4.jpg" alt="Proyecto 4" className="about-image" />
                    </div>
                </div>

                <div className="pb-3">
                    <a href="https://www.artstation.com/sergioluque" target="_blank" className="link1">
                        Portfolio de ARTE
                    </a>
                </div>

                <div className="about-text2">
                    <h2>A hacer una web para aprender ajedrez por TFG:</h2>
                    <div>
                        <a href="https://chess-teacher-rust.vercel.app/" target="_blank" className="link2">
                            Probar APP
                        </a>
                    </div>
                </div>

                <div className="new-images-section">
                    <div className="new-block">
                        <div className="new-img-wrapper"><img src="/imgChess/web1.jpg" className="about-image" /></div>
                        <div className="new-img-wrapper"><img src="/imgChess/code1.jpg" className="about-image" /></div>
                    </div>

                    <div className="new-block">
                        <div className="new-img-wrapper"><img src="/imgChess/web3.jpg" className="about-image" /></div>
                        <div className="new-img-wrapper"><img src="/imgChess/code3.jpg" className="about-image" /></div>
                        <div className="new-img-wrapper"><img src="/imgChess/code4.jpg" className="about-image" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
