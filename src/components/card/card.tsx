interface CartaProps {
  type?: string;
  text: string;
  action: () => void;
  img: string;
}

const Carta = ({ type, text, action, img }: CartaProps) => {
    return (
        <div
            className={type}
            onClick={action}>
                <img src={img} alt={text}/>
                <p className="nombre">{text}</p>
        </div>
    )
}
export default Carta;
