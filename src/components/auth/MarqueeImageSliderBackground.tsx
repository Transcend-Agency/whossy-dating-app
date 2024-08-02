import React from 'react';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';

type MarqueeImageSliderBackgroundProps = {

};

const MarqueeImageSliderBackground: React.FC<MarqueeImageSliderBackgroundProps> = () => {
    const imageNumbers = Array.from({ length: 40 }, (_, i) => i + 1);

    return <motion.div
        initial={{ scale: 1.1 }} animate={{ scale: 1, transition: { duration: 5, ease: 'easeOut' } }}
        className='marquee-background'>
        <div className='marquee-background__overlay'></div>
        <div className='marquee-background__container'>
            <Marquee speed={20}>
                {imageNumbers.slice(0, 10).map(image => (
                    <img key={image} src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='right' speed={20}>
                {imageNumbers.slice(10, 20).map(image => (
                    <img key={image} src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='left' speed={20}>
                {imageNumbers.slice(20, 30).map(image => (
                    <img key={image} src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='right' speed={20}>
                {imageNumbers.slice(30, 40).map(image => (
                    <img key={image} src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee speed={20}>
                {imageNumbers.slice(0, 10).map(image => (
                    <img key={image} src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='right' speed={20}>
                {imageNumbers.slice(10, 20).map(image => (
                    <img key={image} src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='left' speed={20}>
                {imageNumbers.slice(20, 30).map(image => (
                    <img key={image} src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
            <Marquee direction='right' speed={20}>
                {imageNumbers.slice(30, 40).map(image => (
                    <img key={image} src={`/assets/images/auth-bg/${image}.webp`} className='marquee-background__image' />
                ))}
            </Marquee>
        </div>
    </motion.div>
}
export default MarqueeImageSliderBackground;