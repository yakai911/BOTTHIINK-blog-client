import MyIcon from "./MyIcon";
import { APP_NAME } from "../config";

const MyBrand = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }}>
    <h3>{APP_NAME}</h3>
    <MyIcon />
  </div>
);

export default MyBrand;
