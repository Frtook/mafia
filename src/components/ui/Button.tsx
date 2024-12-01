
export default function Button({
  text,
  handleClick,
  className,
  disabled,
  chlidren,
}:{
  text:string;
  handleClick:()=>void;
  className?:string;
  disabled?:boolean;
  chlidren?:React.ReactNode;

}) {
  return (
    <button
      className={`${className} ${
        disabled ? "bg-gray-500" : "bg-main-200"
      }  font-bold text-white rounded-lg px-5 py-2`}
      onClick={handleClick}
      disabled={disabled}
    >
      {text && <span>{text}</span>}
      {chlidren}
    </button>
  );
}
