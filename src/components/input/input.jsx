const Input = ({ type, action, text, value, name }) => {
    
    const inputType = (name === "password" || name === "confirmPassword") ? "password" : "text";
        // SI EL input ES password O confirmPassword --> inputType = password  --> .......


    return (
        <div >
            <input   
                className={type} 
                name={name}
                onChange={action}
                value={value}
                placeholder={text} 
                type={inputType}
            />
        </div>
    )
}
export default Input;