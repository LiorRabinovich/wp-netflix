import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx'
import Link from 'next/link'
import { AppSliderItem } from './AppSliderItem';
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

export function AppSlider({ prefixLink, items }) {
    const $slider = useRef(null);
    const $container = useRef(null);
    const [itemSite, setItemSize] = useState(0);

    const [scrollLeft, setScrollLeft] = useState(0);
    const [nextBtnExist, setNextBtnExist] = useState(false);
    const [prevBtnExist, setPrevBtnExist] = useState(false);

    function handlePrevBtn() {
        setScrollLeft(scrollLeft => scrollLeft + itemSite);
    }

    function handleNextBtn() {
        setScrollLeft(scrollLeft => scrollLeft - itemSite);
    }

    useEffect(() => {
        if ($container.current) {
            setItemSize($container.current.scrollWidth / items.length)
        }
    }, [$container]);

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
                    {items.map((item, indexItem) => (
                        <AppSliderItem
                            key={indexItem}
                            prefixLink={prefixLink}
                            databaseId={item.databaseId}
                            title={item.title}
                            description={item.extraPostInfo.description}
                            imgUrl={item.featuredImage?.node?.mediaItemUrl}
                        />
                    ))}
                </ul>
            </div>
            {prevBtnExist ? (<button onClick={handlePrevBtn} className={clsx(styles.sliderButton, styles.sliderPrev)}><FaAngleRight size="50px" /></button>) : null}
            {nextBtnExist ? (<button onClick={handleNextBtn} className={clsx(styles.sliderButton, styles.sliderNext)}><FaAngleLeft size="50px" /></button>) : null}
        </div>
    )
}