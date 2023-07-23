import styles from "./index.module.sass";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);

type ButtonProps = {
  type: "normal" | "outlined" | "contained";
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ type = "normal", onClick, children }: ButtonProps) => {
  const buttonClass = cx({
    button: true,
    [type]: true,
  });
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
