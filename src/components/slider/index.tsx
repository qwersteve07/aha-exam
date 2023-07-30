import { useState, useRef } from 'react';

function Slider({ setPageSize }: { setPageSize: (value: number) => void }) {
  const [start, setStart] = useState(0);
  const [move, setMove] = useState(0);
  const [moving, setMoving] = useState(false);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(3);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const dataList = [3, 6, 9, 12, 15, 50];

  const actionMove = (offset: number) => {
    if (!sliderRef.current) return;
    const maxWidth = sliderRef.current.clientWidth;

    // prevent the thumb goes out of the slider
    if (current + offset >= maxWidth) {
      setMove(maxWidth - current);
    } else if (current + offset <= 0) {
      setMove(-current);
    } else {
      setMove(offset);
    }
  };

  const actionEnd = () => {
    if (!sliderRef.current) return;
    const maxWidth = sliderRef.current.clientWidth;
    const sliderStepWidth = (maxWidth / 54) * 10;
    const currentPos = current + move;
    let index = 0;

    for (let i = 0; i < 6; i += 1) {
      if (i === 0) {
        if (currentPos < sliderStepWidth / 2) {
          setCurrent(0);
          index = 0;
          break;
        }
      } else if (i === 5) {
        // last slide width is more then others
        if (currentPos > maxWidth - (maxWidth / 54) * 7) {
          index = 5;
          setCurrent(maxWidth - 12);
          break;
        }
      } else if (i === 4) {
        // fifth slide width is more then others
        if (
          currentPos > sliderStepWidth * 4 - sliderStepWidth / 2
          && currentPos <= sliderStepWidth * 4 + (maxWidth / 54) * 7
        ) {
          index = 4;
          setCurrent(sliderStepWidth * 4 - 12);
          break;
        }
      } else if (
        currentPos > sliderStepWidth * i - sliderStepWidth / 2
        && currentPos <= sliderStepWidth * i + sliderStepWidth / 2
      ) {
        index = i;
        setCurrent(sliderStepWidth * i - 12);
        break;
      }
    }
    setResult(dataList[index]);
    setPageSize(dataList[index]);
    setMoving(false);
    setStart(0);
    setMove(0);
  };

  const touchStart = (e: any) => {
    setStart(e.touches[0].clientX);
  };

  const touchMove = (e: any) => {
    if (!sliderRef.current) return;
    const offset = e.touches[0].clientX - start;
    actionMove(offset);
  };

  const dragStart = (e: any) => {
    // remove the drag image
    const img = new Image();
    img.src = '';
    img.style.display = 'none';
    img.style.opacity = '0';
    e.dataTransfer?.setDragImage(img, 0, 0);

    setMoving(true);
    setStart(e.pageX);
  };

  const dragMove = (e: any) => {
    // remove the last drag event
    if (e.pageX === 0 || !sliderRef.current) return;

    const offset = e.pageX - start;
    actionMove(offset);
  };

  return (
    <div className="w-full pb-[30px] border-b-[1px] border-solid border-white-10 mb-[30px]">
      <h3 className="text-2xl text-white font-normal mt-0 mx-0 mb-[16px]"># of Results per page</h3>
      <div className="text-base text-white my-[20px] mx-0">
        <span className="font-bold text-5xl inline-block indent-[-5px]">{result}</span>
        {' '}
        results
      </div>
      <div className="w-full relative bg-white-30 h-[8px] rounded-[16px] mb-[25px]" ref={sliderRef}>
        <div
          className="
            cursor-pointer
            w-[20px]
            h-[20px]
            rounded-full
          bg-black-dark
            absolute
            top-[-6px]
            left-[-6px]
            border-[6px]
            border-solid
          border-tutor-light"
          draggable
          onDragStart={dragStart}
          onDrag={dragMove}
          onDragEnd={actionEnd}
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={actionEnd}
          style={{
            transform: `translateX(${current + move}px)`,
            transition: moving ? 'none' : '0.2s ease transform ',
          }}
        />
        <div
          className="w-0 h-[8px] bg-gradient-to-r from-tutor-dark to-tutor-light rounded-[16px]"
          style={{
            width: `${sliderRef.current?.clientWidth
              ? (current + move) / (sliderRef.current?.clientWidth * 100)
              : 0}%`,
            transition: moving ? 'none' : '0.2s ease width ',
          }}
        />
        <ul className="flex justify-between mt-[15px]">
          {dataList.map((d) => {
            const isActive = d === result;
            return (
              <li
                key={d}
                className={`
                  text-sm
                  flex-[1_0_auto]
                  transition
                  duration-200 
                  ${isActive ? 'text-white' : 'text-white-50'}
                  last-of-type:text-right
                  last-of-type:indent-[6px]
                  last-of-type:flex-[0.4_0_auto]
                `}
              >
                {d}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Slider;
