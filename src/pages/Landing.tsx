import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type LandingProps = {

};

const Landing: React.FC<LandingProps> = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/auth')
    }, [])
    return <div></div>
}
export default Landing;