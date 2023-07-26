import classnames from 'classnames/bind';
import styles from './index.module.sass';

const cx = classnames.bind(styles);

type ButtonProps = {
  type?: 'normal' | 'outlined' | 'contained';
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ type = 'normal', onClick, children }: ButtonProps) {
  const buttonClass = cx({
    button: true,
    [type]: true,
  });
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
