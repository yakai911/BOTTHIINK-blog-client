import UserDashboard from "../../components/profile/UserDashboard";
import Private from "../../components/auth/Private";

const UserIndex = () => {
  return (
    <Private>
      <UserDashboard />
    </Private>
  );
};

export default UserIndex;
