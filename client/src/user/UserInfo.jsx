import { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./UserInfo.css";


export default function UserInfo() {
  const {currentUser} = useContext(UserContext);

  return (
    <div className="UserInfo">
      <h1>User Information</h1>
      <div className="user-info-contaienr">
        <p>First name: {currentUser.firstName}</p>
        <p>Last name: {currentUser.lastName}</p>
        <p>Username: {currentUser.username}</p>
        <p>Email: {currentUser.email}</p>
      </div>
    </div>

  )
}