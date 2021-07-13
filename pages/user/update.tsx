import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";

const UserProfileUpdate = () => {
  return (
    <Private>
      <div className='profile-update'>
        <ProfileUpdate />
      </div>
    </Private>
  );
};

export default UserProfileUpdate;
