import React from 'react';

type ButtonProps = {
  type?: 'normal' | 'outlined' | 'contained';
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ type = 'normal', onClick, children }: ButtonProps) {
  const normalClass = type === 'normal'
    && 'h-[40px] w-[335px] rounded-[4px] bg-white text-black hover:bg-black hover:text-white';
  const outlinedClass = type === 'outlined'
    && 'h-[30px] px-[10px] py-0 rounded-[15px] text-[12px] bg-black text-white hover:bg-white hover:text-black';
  const containedClass = type === 'contained'
    && ' h-[30px] px-[10px] py-0 rounded-[15px] bg-white text-black text-xs hover:bg-black hover:text-white';

  return (
    <button
      className={`
    border-[1px] 
    border-solid 
    border-white 
    transition 
    duration-200 
    cursor-pointer
    hover:transition
    ${normalClass}
    ${outlinedClass}
    ${containedClass}
    `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
