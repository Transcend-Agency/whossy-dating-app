interface ProfileHeaderProps {
  title: string;
}

const ProfileHeader:React.FC<ProfileHeaderProps> = ({ title }) => {
  return (
    <header className="profile__header">
      <div className="profile__header__name">
        <img src="/assets/icons/left-arrow-black.svg" alt="Back Arrow" />
        <h1
          onClick={() => {
            window.history.back();
          }}
        >
          {title}
        </h1>
      </div>
      <h2 className="profile__header__save">Save</h2>
    </header>
  );
};

export default ProfileHeader;
