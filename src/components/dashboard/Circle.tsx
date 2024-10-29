import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';

interface CircleProps {
    percentage: number;
    imageUrl: string | null;
}

const Circle: React.FC<CircleProps> = ({ percentage,imageUrl}) => {
    return (
        <div className="flex h-[200px] w-[200px] self-center items-center justify-center">
            {!imageUrl && <div className='rounded-full h-[140px] w-[140px] overflow-hidden'>
                <Skeleton width={"140px"} height={"140px"} />
            </div>}
            {imageUrl && <svg width="200" height="200">
                <defs>
                    <clipPath id="clip-circle">
                        <circle r="70" cx="100" cy="100" />
                    </clipPath>
                </defs>
                <g transform="rotate(-90, 100, 100)">
                    <circle
                        r="70"
                        cx="100"
                        cy="100"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth={10}
                        strokeDasharray="439.8"
                        strokeDashoffset="0"
                        className="text-[#E5E5E5]"
                    />
                    <motion.circle
                        r="70"
                        cx="100"
                        cy="100"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth={10}
                        strokeDasharray="439.8"
                        strokeDashoffset="0"
                        className="text-[#F2243E] rounded-full"
                        initial={{ strokeDashoffset: 440 }} // Start from 0%
                        animate={{ strokeDashoffset: 440 - (percentage * (440 / 100)) }} // Animate to percentage
                        transition={{ duration: 1, ease: "easeInOut" }} // Customize the transition
                    />
                </g>
                {imageUrl && <image
                    href={imageUrl as string}
                    x="30"
                    y="30"
                    width="140"
                    height="140"
                    overflow={'hidden'}
                    style={{borderRadius: '100%'}}
                    clipPath="url(#clip-circle)"
                    preserveAspectRatio="xMidYMid slice"
                 />}
            </svg>}
        </div>
    );
};

export default Circle;