interface InputProps {
  type: string;
  action: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  value: string;
  name: string;
}

const Input = ({ type, action, text, value, name }: InputProps) => {

    const inputType = (name === "password" || name === "confirmPassword") ? "password" : "text";
      
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
