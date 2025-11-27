import "../../styles/contact.css"

const Usuario = ({ mail, name, number, img, actionDel, actionEdit }) => {
    
    return (
        <div className="user-card">
            <div>
                {img ? (
                    <img // --> FOTO SELECCIONADA.
                        src={img} 
                        className="user-card-img"
                    />
                ) : (
                    <div className="profile-preview">Foto</div> 
                )}
                <h3> {name}</h3>
                <p><strong>Email:</strong> {mail}</p>
                <p><strong>Teléfono:</strong> {number}</p>
            </div>
            <div>
            <button 
                className="buttonEdit"
                onClick={actionEdit}        // --> contact.jsx          
                title="Editar usuario"
            >
                Editar
            </button>
            <button 
                    className="buttonDel"
                    onClick={actionDel}     // --> contact.jsx
                    title="Eliminar usuario"
                >
                    X
            </button>
            </div>
        </div>
    )
}
export default Usuario;