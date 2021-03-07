import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx'
import Link from 'next/link'
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import styles from './AppSlider.module.scss'

function scrollExist(ref) {
    return ref.current.clientWidth < ref.current.scrollWidth
}

function scrollLeftExist($container, $slider, scrollLeft) {
    return scrollExist($container) && $slider.current.scrollWidth + scrollLeft > $slider.current.clientWidth;
}

function scrollRightExist($container, scrollLeft) {
    return scrollExist($container) && scrollLeft < 0;
}

export function AppSlider({ items }) {
    const $slider = useRef(null);
    const $container = useRef(null);
    const $items = useRef(null);

    const [scrollLeft, setScrollLeft] = useState(0);
    const [nextBtnExist, setNextBtnExist] = useState(false);
    const [prevBtnExist, setPrevBtnExist] = useState(false);

    function handlePrevBtn() {
        setScrollLeft(scrollLeft => scrollLeft + $items.current.clientWidth);
    }

    function handleNextBtn() {
        setScrollLeft(scrollLeft => scrollLeft - $items.current.clientWidth);
    }

    useEffect(() => {
        function setBtnDisplay() {
            if ($container.current && $slider.current) {
                $slider.current.scrollLeft = scrollLeft;
                setNextBtnExist(scrollLeftExist($container, $slider, scrollLeft));
                setPrevBtnExist(scrollRightExist($container, scrollLeft));
            }
        }
        window.addEventListener('resize', setBtnDisplay)
        setBtnDisplay();
        return () => {
            window.removeEventListener('resize', setBtnDisplay)
        }
    }, [$container, $slider, scrollLeft])

    return (
        <div className={styles.sliderContainer}>
            <div ref={$slider} className={styles.slider}>
                <ul ref={$container}>
                    {items.map((item, itemIndex) => (
                        <li ref={$items} key={itemIndex}>
                            <Link href="movies/ג'יני וג'ורג'יה">
                                <article>
                                    <img alt="ג'יני וג'ורג'יה" src="https://occ-0-1390-778.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABaL3igZoHBPleC_0mp6-8MtiYDyNJH8LRyJY1xASDpfbMHQSwEJBmi_0sKyBqAu-ApGVTwsFPNRP_4kuVb9lTxPKrVt1DzRlQ2bgrwYabUhdWpI935HGD-P1JryjngbNhpMwGX1dntSGxHmOdY_a1FS5yDkj6_eIyzvRSwYhUDTZdAmNZBoMkpI.jpg?r=c55"></img>
                                    <h3>ג'יני וג'ורג'יה</h3>
                                    <p>ג'ורג'יה ושני ילדיה, ג'יני ואוסטין, עוברים צפונה בניסיון לפתוח דף חדש, ומגלים שהדרך להתחלה חדשה רצופה מהמורות.</p>
                                </article>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {prevBtnExist ? (<button onClick={handlePrevBtn} className={clsx(styles.sliderButton, styles.sliderPrev)}><FaAngleRight size="100px" /></button>) : null}
            {nextBtnExist ? (<button onClick={handleNextBtn} className={clsx(styles.sliderButton, styles.sliderNext)}><FaAngleLeft size="100px" /></button>) : null}
        </div>
    )
}