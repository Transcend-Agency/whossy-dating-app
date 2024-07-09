import React from 'react';
import Marquee from "react-fast-marquee";

type MarqueeImageSliderBackgroundProps = {

};

const MarqueeImageSliderBackground: React.FC<MarqueeImageSliderBackgroundProps> = () => {
    const imageNumbers = Array.from({ length: 40 }, (_, i) => i + 1);

    return <div className='marquee-background'>
        <div className='marquee-background__overlay'></div>
        <div className='marquee-background__container'>
            <Marquee speed={20}>
                {imageNumbers.slice(0, 10).map(image => (
                    <img src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='right' speed={20}>
                {imageNumbers.slice(10, 20).map(image => (
                    <img src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='left' speed={20}>
                {imageNumbers.slice(20, 30).map(image => (
                    <img src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='right' speed={20}>
                {imageNumbers.slice(30, 40).map(image => (
                    <img src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
        </div>
    </div>
}
export default MarqueeImageSliderBackground;