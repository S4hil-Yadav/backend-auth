import { Avatar, Dropdown } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileIcon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authUser } = useSelector((state) => state.user);

  function handleLogOut() {
    dispatch(logOut());
    navigate("/login");
  }

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={<Avatar alt="user" img={authUser.profilePic} rounded />}
    >
      <Dropdown.Header className="flex flex-col text-sm font-semibold">
        <span>{authUser.username}</span>
        <span>{authUser.email}</span>
      </Dropdown.Header>
      <Dropdown.Item as={Link} to={"/user?tab=profile"}>
        Profile
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleLogOut}>Log out</Dropdown.Item>
    </Dropdown>
  );
}
