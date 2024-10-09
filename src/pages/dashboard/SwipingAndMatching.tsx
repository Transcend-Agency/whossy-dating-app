import { family_goal, preference } from "@/constants";
import { db } from "@/firebase";
import { useAuthStore } from "@/store/UserId";
import { collection, doc, GeoPoint, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { AnimatePresence, AnimationControls, motion, MotionValue, useAnimationControls, useMotionValue, useTransform } from 'framer-motion';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from 'react-uid';
import { GeoFirestore, GeoCollectionReference } from "geofirestore";

interface ProfileCardProps {
    profiles: number[],
    setProfiles: Dispatch<SetStateAction<number[]>>,
    item: number
    setActionButtonsOpacity: Dispatch<SetStateAction<MotionValue<number>>>
    setChosenActionButtonOpacity: Dispatch<SetStateAction<MotionValue<number>>>
    setChosenActionScale: Dispatch<SetStateAction<MotionValue<number>>>;
    setActiveAction: Dispatch<SetStateAction<'like' | 'cancel'>>;
    controls: AnimationControls;
    index: number, nextCardOpacity: number, setNextCardOpacity: Dispatch<SetStateAction<MotionValue<number>>>
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    profiles, setProfiles, item, setActiveAction, setActionButtonsOpacity, setChosenActionButtonOpacity, setChosenActionScale, controls, index, nextCardOpacity, setNextCardOpacity
}) => {
    const x = useMotionValue(0)
    const activeCardOpacity = useTransform(x, [-160, -30, 0, 30, 160], [0, 1, 1, 1, 0])
    const activeCardRotation = useTransform(x, [-200, 200], [18, -18])
    const actionButtonsOpacity = useTransform(x, [-160, -150, -20, -5, 0, 5, 20, 150, 160], [1, 0, 0, 1, 1, 1, 0, 0, 1])
    const chosenActionButtonOpacity = useTransform(x, [-160, -140, -20, -10, 0, 10, 20, 140, 160], [0, 1, 1, 0, 0, 0, 1, 1, 0])
    const chosenActionScale = useTransform(x, [-160, -100, -10, 0, 10, 100, 160], [1.6, 1, 1, 1, 1, 1, 1.6])
    const nextCardOpacityValue = useTransform(x, [-160, 0, 160], [1, 0, 1])
    const { user } = useAuthStore()

    const [userPreferencesData] = useState({
        photos: ["/assets/images/dashboard/sample-person.png", "/assets/images/auth-bg/1.webp", "/assets/images/auth-bg/2.webp", "/assets/images/auth-bg/3.webp", "/assets/images/auth-bg/4.webp", "/assets/images/auth-bg/5.webp"],
        distance: '24',
        bio: 'My name is ronald dosunmu',
        interests: ['Ronald', 'Ronald', 'Ronald', 'Ronald', 'Ronald'],
        height: 0,
        weight: 0,
        family_goal: 1,
        preference: 1,
        date_of_birth: ''
    })
    const [userData] = useState({
        first_name: 'Ronald'
    })
    const profileContainer = useRef(null);
    const moreDetailsContainer = useRef(null)
    const [currentImage, setCurrentImage] = useState(0)
    const [expanded, setExpanded] = useState(false)

    const goToNextPost = () => {
        if (currentImage < userPreferencesData.photos.length - 1) {
            setCurrentImage(value => value + 1)
        }
    }
    const goToPreviousPost = () => {
        if (currentImage > 0) {
            setCurrentImage(value => value - 1)
        }
    }
    const handleDragEnd = () => {
        if (Math.abs(x.get()) > 160) {
            setProfiles(profiles.filter((profileItem) => item !== profileItem))
            controls.start((item) => {
                return (item == profiles[profiles.length - 2] ? {
                    y: 0,
                    width: '100%'
                } : (item == profiles[profiles.length - 3] ? {
                    y: 12,
                    width: 'calc(100% - 48px)'
                } : { y: 24, width: 'calc(100% - 96px)' }))
            })
            nextCardOpacityValue.set(0)
            setNextCardOpacity(nextCardOpacityValue)
        }
    }

    x.on("change", latest => {
        setActionButtonsOpacity(actionButtonsOpacity)
        setChosenActionButtonOpacity(chosenActionButtonOpacity)
        setChosenActionScale(chosenActionScale)
        setNextCardOpacity(nextCardOpacityValue)
        if (latest < 0) setActiveAction('cancel')
        else setActiveAction('like')
    })

    useEffect(() => {
        nextCardOpacityValue.set(0)
        setNextCardOpacity(nextCardOpacityValue)
    }, [profiles.length])

    const handleShortcuts = useCallback(
        (e: Event) => {
            // @ts-expect-error type errpr
            if (e.keyCode == 32) {
                if (currentImage < userPreferencesData.photos.length - 1) {
                    setCurrentImage(currentImage + 1)
                } else {
                    setCurrentImage(0)
                }
            }

        }, [currentImage])
    useEffect(() => {
        window.addEventListener('keydown', handleShortcuts)
        return () => {
            window.removeEventListener('keydown', handleShortcuts)
        }
    }, [handleShortcuts])
    useEffect(() => {
        setCurrentImage(0)
    }, [profiles.length])

    return (
        <>
            {<motion.div onDragEnd={handleDragEnd} style={{ x, opacity: activeCardOpacity, rotate: activeCardRotation, overflowY: expanded ? 'scroll' : 'hidden' }} ref={profileContainer} custom={item} initial={{ y: item == profiles[profiles.length - 1] ? 0 : (item == profiles[profiles.length - 2] ? 12 : 24), width: item == profiles[profiles.length - 1] ? '100%' : (profiles[profiles.length - 2] == item ? 'calc(100% - 48px)' : 'calc(100% - 96px)') }} animate={controls} drag={index == profiles.length - 1 ? "x" : undefined} dragConstraints={{ left: 0, right: 0 }} className="profile-card preview-profile">
                <motion.div initial={{ opacity: item == profiles[profiles.length - 1] ? 1 : 0 }}
                    style={index == profiles.length - 2 ? { opacity: nextCardOpacity } : {}}
                    // animate={{ opacity: item == profiles[profiles.length - 1] ? 1 : 0 }}
                    animate={expanded ? { padding: 0, height: '46rem' } : {}}
                    className="preview-profile__profile-container">
                    <motion.div initial={{ borderTopRightRadius: '1.42rem', borderTopLeftRadius: '1.42rem', borderBottomRightRadius: '2.84rem', borderBottomLeftRadius: '2.84rem' }} animate={expanded ? {
                        // borderRadius: 0,
                        borderBottomRightRadius: 0, borderBottomLeftRadius: 0,
                    } : {
                        borderTopRightRadius: '1.42rem', borderTopLeftRadius: '1.42rem', borderBottomRightRadius: '2.84rem', borderBottomLeftRadius: '2.84rem'
                    }} className={`preview-profile__card ${index == profiles.length - 1 ? 'hover:cursor-grab active:cursor-grabbing' : ''}`}>
                        <figure
                            className="preview-profile__image-bg-container">
                            {/* <div className="preview-profile__image-bg-wrapper">

                            </div> */}
                            {userPreferencesData?.photos?.map((src, index) =>
                            (
                                <motion.img key={index} animate={{ opacity: currentImage == index ? 1 : 0 }} className="preview-profile__profile-image" src={src} />
                            )
                            )}
                        </figure>
                        <div className="preview-profile__overlay">
                            <div onClick={goToPreviousPost} className={`previous-button ${currentImage > 0 && 'clickable'}`}>
                                <button>
                                    <img src="/assets/icons/arrow-right.svg" />
                                </button>
                            </div>
                            <div onClick={goToNextPost} className={`next-button ${currentImage < userPreferencesData.photos.length - 1 && 'clickable'}`}>
                                <button>
                                    <img src="/assets/icons/arrow-right.svg" />
                                </button>
                            </div>
                        </div>
                        <div className="preview-profile__profile-details">
                            <div className="status-row">
                                <div className="active-badge">Active</div>
                                <p className="location">~ {userPreferencesData?.distance} miles away</p>
                            </div>
                            <motion.div animate={expanded ? { marginBottom: '2.8rem' } : { marginBottom: '1.2rem' }} className="name-row">
                                <div className="left">
                                    <p className="details">{userData?.first_name}, <span className="age">20</span></p>
                                    {/* <p className="details">{userData?.first_name}, <span className="age">{userPreferencesData?.date_of_birth ? (new Date()).getFullYear() - getYearFromFirebaseDate(userPreferencesData.date_of_birth) : 'NIL'}</span></p> */}
                                    <img src="/assets/icons/verified.svg" />
                                </div>
                                <AnimatePresence>
                                    {expanded && <motion.img exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="contract-icon" onClick={() => {
                                            (profileContainer.current as unknown as { scrollTop: number }).scrollTop = 0
                                            console.log(profileContainer)
                                            setExpanded(!expanded)
                                        }} src="/assets/icons/down.svg" />}
                                </AnimatePresence>
                            </motion.div>
                            <motion.div initial={{ height: 'auto' }} animate={expanded ? { height: 0, opacity: 0 } : { height: 'auto' }} ref={moreDetailsContainer} className="more-details">
                                {userPreferencesData?.bio && <p className="bio">
                                    {userPreferencesData.bio.slice(0, 200)}...
                                </p>}
                                <div className="interests-row">
                                    <img src="/assets/icons/interests.svg" />
                                    <div className="interests">
                                        {userPreferencesData?.interests?.slice(0, 4)?.map((item, i) => <div key={i} className="interest">{item}</div>)}
                                        {/* <div className="interest">Travelling</div> */}
                                    </div>
                                    <img onClick={() => {
                                        setExpanded(!expanded)
                                    }} className="expand-profile" src="/assets/icons/down.svg" />
                                </div>
                            </motion.div>
                            <div className="preview-profile__image-counter-container">
                                {userPreferencesData.photos.map((image, index) => (
                                    <div key={index} onClick={() => { setCurrentImage(index); image }} className={`preview-profile__image-counter ${index == currentImage && "preview-profile__image-counter--active"}`}></div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
                <div className="preview-profile__more-details">
                    <div className="content-item">
                        <div className="content-item__title">
                            <img src="/assets/icons/relationship-preference.svg" />
                            Relationship preference
                        </div>
                        <div className="content-item__value">
                            {/* <img src="/assets/images/onboarding/onboarding-fun.svg" /> */}
                            {preference[userPreferencesData?.preference as number]}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="content-item__title">
                            <img src="/assets/icons/relationship-preference.svg" />
                            Bio
                        </div>
                        {userPreferencesData?.bio && <div className="content-item__value">
                            {userPreferencesData.bio}
                        </div>}
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
                            {userPreferencesData?.interests?.map((item, i) => <div key={i} className="content-item__multi-options-container__item">
                                {item}
                            </div>)}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="content-item__title">
                            <img src="/assets/icons/need-to-know.svg" />
                            Personal habits
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Future family goals</p>
                            {userPreferencesData?.family_goal && <p className="content-item__info__text">{family_goal[userPreferencesData?.family_goal as number]}</p>}
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Weight</p>
                            {userPreferencesData?.weight ? <p className="content-item__info__text">{userPreferencesData.weight}kg</p> : <p className="content-item__info__text">Not specified</p>}
                        </div>
                        <div className="content-item__info">
                            <p className="content-item__info__title">Height</p>
                            {userPreferencesData?.height ? <p className="content-item__info__text">{userPreferencesData.height}cm</p> : <p className="content-item__info__text">Not specified</p>}
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
            </motion.div>}
        </>
    )
}
const SwipingAndMatching = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const x = useMotionValue(0)
    const controls = useAnimationControls()
    const { user } = useAuthStore()
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0
    })

    // Initialize GeoFirestore
    const geoFirestore = new GeoFirestore(db);

    // Reference to your 'users' collection in Firestore
    const geoCollectionRef = geoFirestore.collection('users');

    const cancelProfile = async () => {
        await controls.start((item) => ({
            x: item == profiles[profiles.length - 1] ? -180 : 0,
            transition: { duration: 0.5 }
        }))
        // @ts-expect-error unused var
        await setProfiles(profiles.filter((profileItem, index) => index !== profiles.length - 1))
        controls.start((item) => {
            return (item == profiles[profiles.length - 2] ? {
                y: 0,
                width: '100%'
            } : (item == profiles[profiles.length - 3] ? {
                y: 12,
                width: 'calc(100% - 48px)'
            } : { y: 24, width: 'calc(100% - 96px)' }))
        })
    }
    const likeProfile = async () => {
        // controls.start((item) => ({ y: item == profiles[profiles.length - 1] ? 0 : (item == profiles[profiles.length - 2] ? 12 : 24), width: item == profiles[profiles.length - 1] ? '100%' : (profiles[profiles.length - 2] == item ? 'calc(100% - 48px)' : 'calc(100% - 96px)') }))
        await controls.start((item) => ({
            x: item == profiles[profiles.length - 1] ? 180 : 0,
            transition: { duration: 0.5 }
        }))
        // @ts-expect-error unused vars
        await setProfiles(profiles.filter((profileItem, index) => index !== profiles.length - 1))
        // assert(profileI)
        controls.start((item) => {
            return (item == profiles[profiles.length - 2] ? {
                y: 0,
                width: '100%'
            } : (item == profiles[profiles.length - 3] ? {
                y: 12,
                width: 'calc(100% - 48px)'
            } : { y: 24, width: 'calc(100% - 96px)' }))
        })
    }
    const [actionButtonsOpacity, setActionButtonsOpacity] = useState(1)
    const [nextCardOpacity, setNextCardOpacity] = useState(1)
    const [chosenActionButtonOpacity, setChosenActionButtonOpacity] = useState(0)
    const [chosenActionScale, setChosenActionScale] = useState(1)
    const [activeAction, setActiveAction] = useState<'like' | 'cancel'>('like')
    const [profilesShowing, setProfilesShowing] = useState(false)

    const handleShortcuts = (e: any) => {
        if (e.keyCode == 37)
            cancelProfile()
        else if (e.keyCode == 39)
            likeProfile()
    }
    useEffect(() => {
        window.addEventListener('keydown', handleShortcuts)
        return () => {
            window.removeEventListener('keydown', handleShortcuts)
        }
    }, [handleShortcuts])
    x.on("change", latest => {
        if (latest < 0) setActiveAction('cancel')
        else setActiveAction('like')
    })

    const saveUserLocationToFirebase = async (latitude: number, longitude: number) => {
        try {
            const userId = user?.uid;  // Get the current user's ID

            // Create a document reference for the user
            const userDocRef = doc(db, 'users', userId!);

            // Save location data under the user document with merge option
            await setDoc(userDocRef, {
                location: new GeoPoint(latitude, longitude)
            }, { merge: true });
            setProfilesShowing(true)
            // await updateAllUsersLocation()
            console.log("Location saved successfully!");
        } catch (error) {
            console.error("Error saving location: ", error);
        }
    }


    async function queryUsersNearLocation(latitude, longitude, radiusInMiles = 50) {
        // Initialize GeoFirestore
        const geoFirestore = new GeoFirestore(db);

        const geoCollectionRef = geoFirestore.collection('users');

        try {
            // Convert miles to kilometers (GeoFirestore uses kilometers)
            const radiusInKm = radiusInMiles * 1.60934;

            // Perform a geospatial query using GeoFirestore
            const query = geoCollectionRef.near({
                center: new GeoPoint(latitude, longitude),  // Center point
                radius: radiusInKm,  // Radius in kilometers
                field: 'location'  // The location field in Firestore
            });

            // Get query results
            const querySnapshot = await query.get();

            // Process the query results
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });

        } catch (error) {
            console.error("Error querying users by location: ", error);
        }
    }

    // function toRadians(degrees) {
    //     return degrees * (Math.PI / 180);
    // }

    // // Function to convert radians to degrees
    // function toDegrees(radians) {
    //     return radians * (180 / Math.PI);
    // }



    // Function to generate a random location within a 50-mile radius
    // function generateRandomLocation(latitude, longitude, radiusInMiles) {
    //     const earthRadiusMiles = 3958.8;  // Radius of the Earth in miles

    //     // Convert distance to radians
    //     const radiusInRadians = radiusInMiles / earthRadiusMiles;

    //     // Generate a random bearing (direction)
    //     const bearing = Math.random() * 2 * Math.PI;

    //     // Generate a random distance from the center point
    //     const distance = Math.random() * radiusInRadians;

    //     const newLatitude = Math.asin(Math.sin(toRadians(latitude)) * Math.cos(distance) +
    //         Math.cos(toRadians(latitude)) * Math.sin(distance) * Math.cos(bearing));

    //     const newLongitude = toRadians(longitude) + Math.atan2(
    //         Math.sin(bearing) * Math.sin(distance) * Math.cos(toRadians(latitude)),
    //         Math.cos(distance) - Math.sin(toRadians(latitude)) * Math.sin(newLatitude)
    //     );

    //     return {
    //         latitude: toDegrees(newLatitude),
    //         longitude: toDegrees(newLongitude)
    //     };
    // }

    // async function updateAllUsersLocation(radiusInMiles = 50) {
    //     try {
    //         const usersCollection = collection(db, 'users');

    //         // Fetch all users from Firestore
    //         const querySnapshot = await getDocs(usersCollection);

    //         // Loop through all users
    //         querySnapshot.forEach(async (userDoc) => {
    //             const userData = userDoc.data();

    //             const { latitude, longitude } = currentLocation;

    //             // Generate a random location within the radius
    //             const randomLocation = generateRandomLocation(latitude, longitude, radiusInMiles);

    //             // Update the user's location in Firestore
    //             const userDocRef = doc(db, 'users', userData.uid);
    //             await updateDoc(userDocRef, {
    //                 location: new GeoPoint(randomLocation.latitude, randomLocation.longitude)
    //             });

    //             console.log(`Updated location for user: ${userDoc.id}`);

    //         });

    //         console.log("All user locations updated successfully!");

    //     } catch (error) {
    //         console.error("Error updating user locations: ", error);
    //     }
    // }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setCurrentLocation({
                    latitude, longitude
                })
                // Save the location data to Firebase
                saveUserLocationToFirebase(latitude, longitude);
                console.log(latitude, longitude)
            }, function (error) {
                console.error("Error getting location: ", error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [])
    return (
        <>
            <nav className="dashboard-layout__mobile-top-nav">
                <div className="dashboard-layout__moblie-top-nav__logo"></div>
                <div className="icons">
                    <img src="/assets/icons/notification.svg" />
                    <img src="/assets/icons/control.svg" />
                </div>
            </nav>
            <AnimatePresence mode="sync">
                {profilesShowing &&
                    <div className="swipe-and-match-page">
                        <motion.div
                            style={{ opacity: actionButtonsOpacity }}
                            className="action-buttons">
                            <button className="action-buttons__button action-buttons__button--small">
                                <img src="/assets/icons/redo.svg" />
                            </button>
                            <button onClick={cancelProfile} className="action-buttons__button">
                                <img src="/assets/icons/cancel.svg" />
                            </button>
                            <button onClick={likeProfile} className="action-buttons__button">
                                <img src="/assets/icons/heart.svg" />
                            </button>
                            <button className="action-buttons__button action-buttons__button--small" onClick={() => navigate(`/dashboard/chat?recipient-user-id=${'MWBawIlrsDarKK1Cjnm3FIGj8vz2'}`)}>
                                <img src="/assets/icons/message-heart.svg" />
                            </button>
                        </motion.div>
                        <motion.div style={{ opacity: chosenActionButtonOpacity, scale: chosenActionScale }} className="chosen-action-button">
                            {activeAction == 'cancel' && <img src="/assets/icons/cancel.svg" />}
                            {activeAction == 'like' && <img src="/assets/icons/heart.svg" />}
                        </motion.div>
                        {/* @ts-expect-error type errors */}
                        {profiles.map((item, index) => <ProfileCard key={uid(item)} controls={controls} profiles={profiles} setProfiles={setProfiles} item={item} setActiveAction={setActiveAction} setActionButtonsOpacity={setActionButtonsOpacity} setChosenActionButtonOpacity={setChosenActionButtonOpacity} setChosenActionScale={setChosenActionScale} index={index} nextCardOpacity={nextCardOpacity} setNextCardOpacity={setNextCardOpacity} />)}
                    </div>
                }
            </AnimatePresence>
        </>
    )
}

export default SwipingAndMatching