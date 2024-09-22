import { AnimatePresence } from "framer-motion";
import DashboardPageContainer from "./DashboardPageContainer";
import { motion } from 'framer-motion'
import { useRef, useState } from "react";

interface ViewProfileProps {
    onBackClick: () => void;
    onNextClick: () => void;
    userData: {
        future_family_goals: string;
        id: number;
        name: string;
        age: number;
        verified: boolean;
        status: string; // Can define other possible statuses
        distance: string;
        profile_images: string[];
        relationship_preferences: string;
        bio: string;
        interests: string[];
        stays_in: string;
        gender: string; // Can add other gender options if needed
        education: string;
    }
}

const ViewProfile: React.FC<ViewProfileProps> = (
    { onBackClick,
        onNextClick, userData }
) => {
    const [expanded, setExpanded] = useState(true)
    const [currentImage, setCurrentImage] = useState(0)
    const profileImages = ["/assets/images/dashboard/sample-person.png", "/assets/images/auth-bg/1.webp", "/assets/images/auth-bg/2.webp", "/assets/images/auth-bg/3.webp", "/assets/images/auth-bg/4.webp", "/assets/images/auth-bg/5.webp"]
    const profileContainer = useRef(null);
    const moreDetailsContainer = useRef(null)

    const goToNextPost = () => {
        if (currentImage < userData.profile_images.length - 1) {
            setCurrentImage(value => value + 1)
        }
    }
    const goToPreviousPost = () => {
        if (currentImage > 0) {
            setCurrentImage(value => value - 1)
        }
    }
    return (
        <DashboardPageContainer className="preview-profile preview-profile--view-profile">
            <div className="preview-profile__action-buttons">
                <div className="preview-profile__action-button">
                    <img src="/assets/icons/heart.svg" />
                </div>
                <div className="preview-profile__action-button">
                    <img src="/assets/icons/message-heart.svg" />
                </div>
            </div>
            <div className="preview-profile__parent-container">
                <motion.div
                    // initial={{ paddingLeft: '3.2rem', paddingRight: '3.2rem', paddingTop: '2.4rem', paddingBottom: '2.4rem' }}
                    initial={{ padding: 0, height: '46rem' }}
                    className="preview-profile__profile-container">
                    <div className="preview-profile__action-buttons">
                        <div className="preview-profile__action-button">
                            <img src="/assets/icons/heart.svg" />
                        </div>
                        <div className="preview-profile__action-button">
                            <img src="/assets/icons/message-heart.svg" />
                        </div>
                    </div>
                    <div className="preview-profile__fake-next-card"></div>
                    <div className="preview-profile__fake-next-card"></div>
                    <div className="preview-profile__navigation-buttons">
                        <button onClick={onBackClick} className="preview-profile__navigation-button">
                            <div className="preview-profile__navigation-button-icon-container">
                                <img src="/assets/icons/arrow-left-white.svg" />
                            </div>
                            <span className="preview-profile__navigation-button-text">Back</span>
                        </button>
                        <button onClick={onNextClick} className="preview-profile__navigation-button">
                            <span className="preview-profile__navigation-button-text">Next</span>
                            <div className="preview-profile__navigation-button-icon-container">
                                <img src="/assets/icons/arrow-left-white.svg" />
                            </div>
                        </button>
                    </div>
                    <motion.div initial={{ borderRadius: 0, height: '46rem' }} className="preview-profile__card">
                        <figure
                            className="preview-profile__image-bg-container">
                            {/* <div className="preview-profile__image-bg-wrapper">

                            </div> */}
                            {userData.profile_images?.map((src, index) =>
                            (
                                <motion.img initial={{ opacity: currentImage == index ? 1 : 0 }} animate={{ opacity: currentImage == index ? 1 : 0 }} className="preview-profile__profile-image" src={src} />
                            )
                            )}
                        </figure>
                        <div className="preview-profile__overlay">
                            <div onClick={goToPreviousPost} className={`previous-button ${currentImage > 0 && 'clickable'}`}>
                                <button>
                                    <img src="/assets/icons/arrow-right.svg" />
                                </button>
                            </div>
                            <div onClick={goToNextPost} className={`next-button ${currentImage < userData.profile_images.length - 1 && 'clickable'}`}>
                                <button>
                                    <img src="/assets/icons/arrow-right.svg" />
                                </button>
                            </div>
                        </div>
                        <div className="preview-profile__profile-details">
                            <div className="status-row">
                                <div className="active-badge">{userData.status}</div>
                                <p className="location">~ {userData.distance}</p>
                            </div>
                            <motion.div initial={{ marginBottom: '2.8rem' }} className="name-row">
                                <div className="left">
                                    {/* <p className="details">{userData?.first_name}, <span className="age">{userPrefencesData?.date_of_birth ? (new Date()).getFullYear() - getYearFromFirebaseDate(userPrefencesData.date_of_birth) : 'NIL'}</span></p> */}
                                    <p className="details">{userData.name}, <span className="age">{userData.age}</span></p>
                                    <img src="/assets/icons/verified.svg" />
                                </div>
                                {/* <AnimatePresence>
                                {expanded && <motion.img exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="contract-icon" onClick={() => {
                                        (profileContainer.current as unknown as { scrollTop: number })!.scrollTop = 0
                                        setExpanded(!expanded)
                                    }} src="/assets/icons/down.svg" />}
                            </AnimatePresence> */}
                            </motion.div>
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 0, opacity: 0 }} ref={moreDetailsContainer} className="more-details">
                                {/* {userPrefencesData?.bio && <p className="bio">
                                {userPrefencesData.bio.slice(0, 200)}...
                            </p>} */}
                                <p className="bio">{userData.bio}</p>
                                <div className="interests-row">
                                    <img src="/assets/icons/interests.svg" />
                                    <div className="interests">
                                        {/* {userPrefencesData?.interests?.slice(0, 4)?.map((item, i) => <div className="interest">{item}</div>)} */}
                                        {/* <div className="interest">Travelling</div> */}
                                        <div className="interests">
                                            <div className="interest">Travelling</div>
                                            <div className="interest">Travelling</div>
                                            <div className="interest">Travelling</div>
                                            <div className="interest">Travelling</div>
                                            <div className="interest">Travelling</div>
                                            <div className="interest">Travelling</div>
                                            {userData.interests.map((interest: string) => (<div className="interest">{interest}</div>))}
                                            {/* <div className="interest">Travelling</div> */}
                                        </div>
                                    </div>
                                    <img onClick={() => {
                                        setExpanded(!expanded)
                                    }} className="expand-profile" src="/assets/icons/down.svg" />
                                </div>
                            </motion.div>
                            <div className="preview-profile__image-counter-container">
                                {userData.profile_images?.map((image, index) => (
                                    <div onClick={() => { setCurrentImage(index); image }} className={`preview-profile__image-counter ${index == currentImage && "preview-profile__image-counter--active"}`}></div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    <div className="preview-profile__more-details">
                        <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/relationship-preference.svg" />
                                Relationship preference
                            </div>
                            <div className="content-item__value">
                                {/* <img src="/assets/images/onboarding/onboarding-fun.svg" /> */}
                                {/* {preference[userPrefencesData?.preference as number]} */}
                                {userData.relationship_preferences}
                            </div>
                        </div>
                        <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/relationship-preference.svg" />
                                Bio
                            </div>
                            {/* {userPrefencesData?.bio && <div className="content-item__value">
                            {userPrefencesData.bio}
                        </div>} */}
                            <div className="content-item__value">
                                {userData.bio.slice(0, 200)}
                            </div>
                        </div>
                        {/* <div className="content-item">
                        <div className="content-item__title">
                            <img src="/assets/icons/about.svg" />
                            About
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Future family goals</p>
                            <p className="content-item__info__text">I want children</p>
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Future family goals</p>
                            <p className="content-item__info__text">I want children</p>
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Future family goals</p>
                            <p className="content-item__info__text">I want children</p>
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="content-item__title">
                            <img src="/assets/icons/need-to-know.svg" />
                            Need to know
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Future family goals</p>
                            <p className="content-item__info__text">I want children</p>
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Future family goals</p>
                            <p className="content-item__info__text">I want children</p>
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Future family goals</p>
                            <p className="content-item__info__text">I want children</p>
                        </div>
                    </div> */}
                        <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/interests-black.svg" />
                                Interests
                            </div>
                            <div className="content-item__multi-options-container">
                                {userData.interests.map((interest: string) => (
                                    <div className="content-item__multi-options-container__item">{interest}</div>
                                ))}
                            </div>
                        </div>
                        <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/about.svg" />
                                About
                            </div>
                            <div className="content-item__info">
                                <p className="content-item__info__title">Stays in</p>
                                {/* {userPrefencesData?.family_goal && <p className="content-item__info__text">{family_goal[userPrefencesData?.family_goal as number]}</p>} */}
                                <p className="content-item__info__text">{userData.stays_in}</p>
                            </div>
                            <div className="content-item__info">
                                <p className="content-item__info__title">Gender</p>
                                {/* {userPrefencesData?.weight ? <p className="content-item__info__text">{userPrefencesData.weight}kg</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">{userData.gender}</p>
                            </div>
                            <div className="content-item__info">
                                <p className="content-item__info__title">Education</p>
                                {/* {userPrefencesData?.height ? <p className="content-item__info__text">{userPrefencesData.height}cm</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">{userData.education}</p>
                            </div>
                        </div>
                        <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/need-to-know.svg" />
                                Personal habits
                            </div>
                            <div className="content-item__info">
                                <p className="content-item__info__title">Future family goals</p>
                                {/* {userPrefencesData?.family_goal && <p className="content-item__info__text">{family_goal[userPrefencesData?.family_goal as number]}</p>} */}
                                <p className="content-item__info__text">{userData.future_family_goals}</p>
                            </div>
                            <div className="content-item__info">
                                <p className="content-item__info__title">Weight</p>
                                {/* {userPrefencesData?.weight ? <p className="content-item__info__text">{userPrefencesData.weight}kg</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">I want children</p>
                            </div>
                            <div className="content-item__info">
                                <p className="content-item__info__title">Height</p>
                                {/* {userPrefencesData?.height ? <p className="content-item__info__text">{userPrefencesData.height}cm</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">I want children</p>
                            </div>
                        </div>
                        <div className="action-button">
                            <img src="/assets/icons/block.svg" />
                            Block Stephanie
                        </div>
                        <div className="action-button action-button--danger">
                            <img src="/assets/icons/report.svg" />
                            Report Stephanie
                        </div>
                    </div>
                </motion.div>

            </div>
        </DashboardPageContainer>
    )
}
export default ViewProfile;