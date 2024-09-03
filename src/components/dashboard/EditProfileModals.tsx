import { useEffect, useRef, useState } from "react"
import DashboardSettingsModal from "./DashboardSettingsModal"
import { DashboardSettingsModalProps } from "./DashboardSettingsModal"
import { AnimatePresence, motion } from "framer-motion"
import * as Slider from "@radix-ui/react-slider"

export const NameSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Name">
            <div className="">
                <div className="modal__input-group">
                    <label className="modal__input-group__label">First Name</label>
                    <input className="modal__input-group__input" />
                </div>
                <div className="modal__input-group">
                    <label className="modal__input-group__label">Last Name</label>
                    <input className="modal__input-group__input" />
                </div>
            </div>
        </DashboardSettingsModal>
    )
}

export const GenderSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [gender, setGender] = useState("")
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Gender">
            <div className="modal__gender-options">
                <div onClick={() => setGender("Male")} className={`modal__gender-option ${gender == 'Male' && 'modal__gender-option--selected'}`}>Male</div>
                <div onClick={() => setGender("Female")} className={`modal__gender-option ${gender == 'Female' && 'modal__gender-option--selected'}`}>Female</div>
            </div>
        </DashboardSettingsModal>
    )
}

export const EmailSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [email, setEmail] = useState('ronaldosunmu@gmail.com')
    const [isEditable, setIsEditable] = useState(false)
    const inputRef = useRef(null)
    useEffect(() => {
        setIsEditable(false)
    }, [showing])
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Email">
            <div className="modal__verified-changeable-input">
                <div className="modal__verified-changeable-input__left">
                    <p>Email</p>
                    <div className="modal__verified-badge">Verified</div>
                </div>
                {!isEditable && <p className="modal__verified-changeable-input__value">{email}</p>}
                {isEditable && <input ref={inputRef} className="modal__verified-changeable-input__input" onChange={(e) => setEmail(e.target.value)} value={email} />}
            </div>
            {/* <AnimatePresence></AnimatePresence> */}
            <motion.p initial={{ opacity: isEditable ? 0 : 1 }} animate={{ opacity: isEditable ? 0 : 1 }} exit={{ opacity: 0 }} className="modal__verified-changeable-input__click-to-edit" onClick={() => { setIsEditable(true); inputRef.current?.focus() }}>Click to change email</motion.p>
        </DashboardSettingsModal>
    )
}

export const PhoneNumberSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [email, setEmail] = useState('+2348140697549')
    const [isEditable, setIsEditable] = useState(false)
    const inputRef = useRef(null)
    useEffect(() => {
        setIsEditable(false)
    }, [showing])
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Phone Number">
            <div className="modal__verified-changeable-input">
                <div className="modal__verified-changeable-input__left">
                    <p>Phone Number</p>
                    <div className="modal__verified-badge">Verified</div>
                </div>
                {!isEditable && <p className="modal__verified-changeable-input__value">{email}</p>}
                {isEditable && <input ref={inputRef} className="modal__verified-changeable-input__input" onChange={(e) => setEmail(e.target.value)} value={email} />}
            </div>
            {/* <AnimatePresence></AnimatePresence> */}
            <motion.p initial={{ opacity: isEditable ? 0 : 1 }} animate={{ opacity: isEditable ? 0 : 1 }} exit={{ opacity: 0 }} className="modal__verified-changeable-input__click-to-edit" onClick={() => { setIsEditable(true); inputRef.current?.focus() }}>Click to update phone number</motion.p>
        </DashboardSettingsModal>
    )
}

export const RelationshipPreferenceSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState(['Looking to date', 'Chatting and connecting', 'Just for fun', 'Ready for commitment', 'Undecided or exploring'])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Relationship Preference">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const LoveLanguageSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState(['Giving and receiving gifts', 'Touch and hugging', 'Heartfelt Compliments', 'Doing Things for Each Other', 'Spending Time Togther'])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Love Language">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const ZodiacSignSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState(['Cancer', 'Leo', 'Taurus', 'Virgo', 'Aquarius', 'Capricorn', 'Pisces', 'Gemini', 'Libra', 'Aries', 'Scorpio', 'Sagittarius'])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Zodiac Sign">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const FutureFamilyPlansSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState(['I want children', 'Not sure yet', 'Not interested for now', 'I don’t want children', 'I have children', 'I want more'])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Future Family Plans">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const SmokerStatusSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState(['Working on quitting', 'Drinks and smokes', 'Occasional smoker', 'Frequent smoker', 'Doesn’t smoke'])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Smoker">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const ReligionSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState([
        "Christianity",
        "Islam",
        "Hinduism",
        "Buddhism",
        "Sikhism",
        "Judaism",
        "Bahá'í Faith",
        "Jainism",
        "Zoroastrianism",
        "Atheism"
    ])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Religion">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const DrinkingSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState([
        "Mindful drinking",
        "100% Sober",
        "Special moments only",
        "Regular nights out",
        "Not my thing"
    ])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Drinking">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const WorkoutSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState([
        "Yes, regularly",
        "Occasionally",
        "Only on weekends",
        "Rarely",
        "Not at all"
    ])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Workout">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const PetsSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState([
        "🐕 Dog",
        "🐈 Cat",
        "🐍 Reptile",
        "🐸 Amphibian",
        "🦜 Bird",
        "🐟 Fish",
        "😩 Don’t like pets",
        "🐇 Rabbits",
        "🐀 Mouse",
        "😉 Planning on getting",
        "🤮 Allergic",
        "🐎 Other",
        "🙃 Want a pet"
    ])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Pets">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const MaritalStatusSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState(
        [
            "Single",
            "Married",
            "Divorced",
            "Widowed",
            "Separated",
            "In a Relationship"
        ])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Marital Status">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const EducationSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [options] = useState(
        [
            "High School",
            "Associate Degree",
            "Bachelor's Degree",
            "Master's Degree",
            "Doctorate (Ph.D.)"
        ])
    const [selectedOption, setSelectedOption] = useState('')
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Marital Status">
            <div className="modal__select-options">
                {options.map(option => (
                    <div onClick={() => setSelectedOption(option)} className={`modal__select-options__option ${selectedOption == option && 'modal__select-options__option--selected'}`}>{option}</div>
                ))}
            </div>
        </DashboardSettingsModal>
    )
}

export const HeightSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [heightInCm, setHeightInCm] = useState<number[]>([55])
    const cmToFeetAndInches = (cm: number) => {
        // 1 inch = 2.54 cm
        // 1 foot = 12 inches
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);

        return `${feet}'${inches}"`;
    }
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Height">
            <div className="modal__slider-container">
                <div className="modal__slider-container__value">
                    {heightInCm}cm ({cmToFeetAndInches(heightInCm[0])})
                </div>
                <form>
                    <Slider.Root className="SliderRoot" value={heightInCm} onValueChange={(value) => setHeightInCm(value)} defaultValue={[50]} min={55} max={251} step={1}>
                        <Slider.Track className="SliderTrack">
                            <Slider.Range className="SliderRange" />
                        </Slider.Track>
                        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                    </Slider.Root>
                </form>
            </div>
        </DashboardSettingsModal>
    )
}

export const WeightSettingsModal: React.FC<DashboardSettingsModalProps> = ({ showing, hideModal }) => {
    const [weightInKg, setWeightInKg] = useState<number[]>([55])
    const kilogramsToPounds = (kg: number) => {
        const lbs = kg * 2.20462;
        return lbs.toFixed(2); // Rounds to 2 decimal places
    }
    return (
        <DashboardSettingsModal showing={showing} hideModal={hideModal} title="Weight">
            <div className="modal__slider-container">
                <div className="modal__slider-container__value">
                    {weightInKg}kg ({kilogramsToPounds(weightInKg[0])}lbs)
                </div>
                <form>
                    <Slider.Root className="SliderRoot" value={weightInKg} onValueChange={(value) => setWeightInKg(value)} defaultValue={[50]} min={40} max={250} step={0.5}>
                        <Slider.Track className="SliderTrack">
                            <Slider.Range className="SliderRange" />
                        </Slider.Track>
                        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                    </Slider.Root>
                </form>
            </div>
        </DashboardSettingsModal>
    )
}