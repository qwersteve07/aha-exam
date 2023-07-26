import { useState, useRef } from 'react';
import styles from './index.module.sass';

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
  }

  const actionEnd = () => {
    if (!sliderRef.current) return;
    const maxWidth = sliderRef.current.clientWidth;
    const sliderStepWidth = (maxWidth / 54) * 10;
    const currentPos = current + move;
    let index = 0;

    for (let i = 0; i < 6; i++) {
      if (i == 0) {
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
    setPageSize(dataList[index])
    setMoving(false);
    setStart(0);
    setMove(0);
  }

  const touchStart = (e: any) => {
    setStart(e.touches[0].clientX)
  }

  const touchMove = (e: any) => {
    if (!sliderRef.current) return;
    const offset = e.touches[0].clientX - start;
    actionMove(offset)
  }


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
    actionMove(offset)
  };

  return (
    <div className={styles.container}>
      <h3># of Results per page</h3>
      <div className={styles.results}>
        <span>{result}</span>
        {' '}
        results
      </div>
      <div className={styles.slider} ref={sliderRef}>
        <div
          className={styles.thumb}
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
          className={styles.progress}
          style={{
            width: `${sliderRef.current?.clientWidth
              ? (current + move) / sliderRef.current?.clientWidth * 100
              : 0}%`,
            transition: moving ? 'none' : '0.2s ease width ',
          }}
        />
        <ul>
          {dataList.map((d) => (
            <li key={d} className={d === result ? styles.active : ''}>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Slider;
