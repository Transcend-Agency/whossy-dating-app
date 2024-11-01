import { drinking, education, family_goal, preference, relationship_preferences, religion, smoking, workout } from '@/constants';
import { useAuthStore } from '@/store/UserId';
import { User } from '@/types/user';
import { getYearFromFirebaseDate } from '@/utils/date';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { motion, useAnimationControls } from 'framer-motion';
import { useRef, useState } from "react";
import { db } from "../../firebase";
import DashboardPageContainer from "./DashboardPageContainer";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ReportModal from './ReportModal';

interface ViewProfileProps {
    onBackClick: () => void;
    userData: User;
    loggedUserData: User;
    profile_has_been_liked?: boolean;
}

const ViewProfile: React.FC<ViewProfileProps> = (
    { onBackClick, userData, isLiked, profile_has_been_liked, loggedUserData }
) => {
    const [expanded, setExpanded] = useState(true)
    const [currentImage, setCurrentImage] = useState(0)
    const moreDetailsContainer = useRef(null)
    const likeControls = useAnimationControls()
    const { user } = useAuthStore()
    const [openModal, setOpenModal] = useState(false);

    console.log(userData)

    const goToNextPost = () => {
        if (currentImage < userData.photos!.length - 1) {
            setCurrentImage(value => value + 1)
        }
    }
    const goToPreviousPost = () => {
        if (currentImage > 0) {
            setCurrentImage(value => value - 1)
        }
    }
    const addLike = async () => {
        // const db = getFirestore();
        try {
            const likesRef = collection(db, 'likes');
            const q = query(likesRef, where('liker_id', '==', userData?.uid), where('liked_id', '==', user?.uid));
            const mutualLikeSnapshot = await getDocs(q);

            console.log(mutualLikeSnapshot)

            if (!mutualLikeSnapshot.empty) {
                await addMatch(user?.uid, userData.uid)
                toast.success(`Your Matched With ${userData.first_name}`)
            } else {
                const likeId = `${user?.uid}_${userData.uid}`;  // Combine the two IDs to create a unique ID
                await setDoc(doc(db, "likes", likeId), {
                    uid: likeId,
                    liker_id: user?.uid,
                    liked_id: userData.uid,
                    timestamp: new Date().toISOString()
                });
                toast.success(`Your Like has been sent to ${userData.first_name}`)
            }
        } catch (err) {
            toast.error("Somthing Went Wrong, Couldn't send the like")
        }
    }

    const addMatch = async (likerId: string, likedId: string) => {
        const matchesRef = collection(db, 'matches');

        // Ensure that each match is only stored once (user1_id < user2_id)
        const matchId = likerId < likedId ? `${likerId}_${likedId}` : `${likedId}_${likerId}`;

        // Create or update the match document
        await setDoc(doc(matchesRef, matchId), {
            user1_id: likerId < likedId ? likerId : likedId,
            user2_id: likerId > likedId ? likerId : likedId,
            timestamp: new Date().toISOString(),
        });

        console.log('Match created:', matchId);
    };

    const triggerHeartAnimation = async () => {
        await likeControls.start({
            scale: [1, 16, 32], // Scale up, then slightly shrink for a bounce effect
            opacity: [1, 1, 0],   // Stay visible at first, then fade out
            // y: [0, -50, -80],     // Move the heart upwards
            transition: {
                duration: 0.4,      // Overall duration of the animation
                ease: "easeOut",    // Easing for smooth animation
            },
        });
        onBackClick()
        addLike()
    };

    const navigate  = useNavigate();

    return (
        <>
        <ReportModal show={openModal} onCloseModal={() => setOpenModal(false)} />
        <DashboardPageContainer className="preview-profile preview-profile--view-profile">
            <div className="preview-profile__action-buttons">
                {!profile_has_been_liked && <div className="preview-profile__action-button">
                    <motion.img animate={likeControls} onClick={triggerHeartAnimation} src="/assets/icons/heart.svg" />
                </div>}
                {profile_has_been_liked && <div className="preview-profile__action-button liked">
                    <motion.img src="/assets/icons/white-heart.png" />
                </div>}
                <div className="preview-profile__action-button" onClick={() =>{ navigate(`/dashboard/chat?recipient-user-id=${userData.uid}`)}}>
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
                        <div className="preview-profile__action-button" >
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
                            <span className="preview-profile__navigation-button-text text-white">Back</span>
                        </button>
                    </div>
                    <motion.div initial={{ borderRadius: 0, height: '46rem' }} className="preview-profile__card">
                        <figure
                            className="preview-profile__image-bg-container">
                            {userData?.photos?.map((src, index) =>
                            (
                                <motion.img key={index} initial={{ opacity: currentImage == index ? 1 : 0 }} animate={{ opacity: currentImage == index ? 1 : 0 }} className="preview-profile__profile-image" src={src} />
                            )
                            )}
                        </figure>
                        {userData?.photos?.length !== 0 && <div className="preview-profile__overlay">
                            <div onClick={goToPreviousPost} className={`previous-button ${currentImage > 0 && 'clickable'}`}>
                                <button>
                                    <img src="/assets/icons/arrow-right.svg" />
                                </button>
                            </div>
                            <div onClick={goToNextPost} className={`next-button ${currentImage < userData?.photos?.length - 1 && 'clickable'}`}>
                                <button>
                                    <img src="/assets/icons/arrow-right.svg" />
                                </button>
                            </div>
                        </div>}
                        <div className="preview-profile__profile-details">
                            <div className="status-row">
                                {userData.status?.online && <div className="active-badge">{'Online'}</div>}
                                {userData.currentLocation && user?.currentLocation && <p className="location">~ {userData.distance}</p>}
                            </div>
                            <motion.div initial={{ marginBottom: '2.8rem' }} className="name-row">
                                <div className="left">
                                    {/* <p className="details">{userData?.first_name}, <span className="age">{userPrefencesData?.date_of_birth ? (new Date()).getFullYear() - getYearFromFirebaseDate(userPrefencesData.date_of_birth) : 'NIL'}</span></p> */}
                                    <p className="details">{userData.first_name}, <span className="age">{(new Date()).getFullYear() - getYearFromFirebaseDate(userData.date_of_birth)}</span></p>
                                    {userData.is_verified && <img src="/assets/icons/verified.svg" />}
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
                                            {userData?.interests?.map((interest: string) => (<div className="interest">{interest}</div>))}
                                            {/* <div className="interest">Travelling</div> */}
                                        </div>
                                    </div>
                                    <img onClick={() => {
                                        setExpanded(!expanded)
                                    }} className="expand-profile" src="/assets/icons/down.svg" />
                                </div>
                            </motion.div>
                            <div className="preview-profile__image-counter-container">
                                {userData.photos?.length !== 1 && <>
                                    {userData?.photos?.map((image, index) => (
                                        <div onClick={() => { setCurrentImage(index); image }} className={`preview-profile__image-counter ${index == currentImage && "preview-profile__image-counter--active"}`}></div>
                                    ))}
                                </>}
                            </div>
                        </div>
                    </motion.div>
                    <div className="preview-profile__more-details">
                        {userData.preference !== null &&
                            <div className="content-item">
                                <div className="content-item__title">
                                    <img src="/assets/icons/relationship-preference.svg" />
                                    Relationship preference
                                </div>
                                <div className="content-item__value">
                                    {<img src={relationship_preferences[userData.preference!].image} />}
                                    {preference[userData.preference!]}
                                </div>
                            </div>
                        }
                        {userData?.bio && <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/relationship-preference.svg" />
                                Bio
                            </div>
                            <div className="content-item__value">
                                {userData.bio}
                            </div>
                        </div>}
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
                        {userData.interests && userData.interests.length > 0 && <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/interests-black.svg" />
                                Interests
                            </div>
                            <div className="content-item__multi-options-container">
                                {userData?.interests.map((interest: string) => (
                                    <div className="content-item__multi-options-container__item">{interest}
                                        {user?.interests?.includes(interest) && <img src="/assets/icons/golden-star-in-circle.svg" />}
                                    </div>
                                ))}
                            </div>
                        </div>}
                        <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/about.svg" />
                                About
                            </div>
                            <div className="content-item__info">
                                <p className="content-item__info__title">Stays in</p>
                                {/* {userPrefencesData?.family_goal && <p className="content-item__info__text">{family_goal[userPrefencesData?.family_goal as number]}</p>} */}
                                <p className="content-item__info__text">{userData.state && <span>{userData.state},</span>} {userData.country_of_origin}</p>
                            </div>
                            <div className="content-item__info">
                                <p className="content-item__info__title">Gender</p>
                                {/* {userPrefencesData?.weight ? <p className="content-item__info__text">{userPrefencesData.weight}kg</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">{userData.gender}</p>
                            </div>
                            {![null, undefined].includes(userData.education as unknown as any) && <div className="content-item__info">
                                <p className="content-item__info__title">Education</p>
                                {/* {userPrefencesData?.height ? <p className="content-item__info__text">{userPrefencesData.height}cm</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">{education[userData.education]}</p>
                            </div>}
                            {![null, undefined].includes(userData.religion as unknown as any) && <div className="content-item__info">
                                <p className="content-item__info__title">Religion</p>
                                {/* {userPrefencesData?.height ? <p className="content-item__info__text">{userPrefencesData.height}cm</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">{religion[userData.religion]}</p>
                            </div>}
                        </div>
                        {([userData.family_goal, userData.weight, userData.height].some(item => item !== null && item !== undefined)) && <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/need-to-know.svg" />
                                Need To Know
                            </div>
                            {(userData.family_goal || userData.family_goal! >= 0) && <div className="content-item__info">
                                <p className="content-item__info__title">Future family goals</p>
                                {/* {userPrefencesData?.family_goal && <p className="content-item__info__text">{family_goal[userPrefencesData?.family_goal as number]}</p>} */}
                                <p className="content-item__info__text">{family_goal[userData.family_goal!]}</p>
                            </div>}
                            {userData.weight && <div className="content-item__info">
                                <p className="content-item__info__title">Weight</p>
                                {/* {userPrefencesData?.weight ? <p className="content-item__info__text">{userPrefencesData.weight}kg</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">{userData.weight ? `${Math.round(userData.weight)}kg` : null}</p>
                            </div>}
                            {userData.height && <div className="content-item__info">
                                <p className="content-item__info__title">Height</p>
                                {/* {userPrefencesData?.height ? <p className="content-item__info__text">{userPrefencesData.height}cm</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">{userData.height ? `${Math.round(userData.height)}cm` : null}</p>
                            </div>}
                        </div>}
                        {([userData.smoke, userData.drink, userData.workout].some(item => item !== null && item !== undefined)) && <div className="content-item">
                            <div className="content-item__title">
                                <img src="/assets/icons/personal-habits.svg" />
                                Personal habits
                            </div>
                            {(userData.smoke || userData.smoke == 0) && <div className="content-item__info">
                                <p className="content-item__info__title">Smoker?</p>
                                {/* {userPrefencesData?.family_goal && <p className="content-item__info__text">{family_goal[userPrefencesData?.family_goal as number]}</p>} */}
                                <p className="content-item__info__text">{smoking[userData.smoke]}</p>
                            </div>}
                            {(userData.drink || userData.drink == 0) && <div className="content-item__info">
                                <p className="content-item__info__title">Drinker?</p>
                                {/* {userPrefencesData?.weight ? <p className="content-item__info__text">{userPrefencesData.weight}kg</p> : <p className="content-item__info__text">Not specified</p>} */}
                                {<p className="content-item__info__text">{drinking[userData.drink]}</p>}
                            </div>}
                            {(userData.workout || userData.workout == 0) && <div className="content-item__info">
                                <p className="content-item__info__title">Works Out?</p>
                                {/* {userPrefencesData?.height ? <p className="content-item__info__text">{userPrefencesData.height}cm</p> : <p className="content-item__info__text">Not specified</p>} */}
                                <p className="content-item__info__text">{workout[userData.workout]}</p>
                            </div>}
                        </div>}
                        <div className="action-button">
                            <img src="/assets/icons/block.svg" />
                            Block {userData.first_name}
                        </div>
                        <button className="action-button action-button--danger" onClick={() => setOpenModal(true)}>
                            <img src="/assets/icons/report.svg" />
                            Report {userData.first_name}
                        </button>
                    </div>
                </motion.div>

            </div>
        </DashboardPageContainer>
        </>
    )
}
export default ViewProfile;