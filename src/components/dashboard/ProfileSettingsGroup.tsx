interface ProfileSettingsGroupProps {
    title: string
}

const ProfileSettingsGroup: React.FC<ProfileSettingsGroupProps> = ({title}) => {
  return (
    <div className="flex justify-between px-[2.8rem] py-[1.6rem] bg-[#F6F6F6] hover:bg-[#ececec]">
        <p>{title}</p>
        <img src="/assets/icons/arrow-right.svg" />
    </div>
  )
}

export default ProfileSettingsGroup