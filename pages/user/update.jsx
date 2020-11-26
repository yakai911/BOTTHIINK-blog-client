import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";

const UserProfileUpdate = () => {
  return (
    <Private>
      <div>
        <div>
          <ProfileUpdate />
        </div>
      </div>
    </Private>
  );
};

export default UserProfileUpdate;
