import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  BookOutlined,
  CarOutlined,
  CarTwoTone,
  CaretRightOutlined,
  ContactsOutlined,
  HiOutlineHome,
  HomeFilled,
  LaptopOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import carContext from "../context/cars/carContext";
import { useContext } from "react";
function Navbar(props) {
  const navigate = useNavigate();

  return (
    <>
      <Menu
        style={{ position: "sticky", paddingInline: "10px" }}
        id="menu"
        onClick={({ key }) => {
          navigate(key);
        }}
        mode="inline"
        theme="dark"
      >
        <div id="companylogo">
          <img
            style={{
              marginInline: props.collapse ? 20 : 23,
              borderRadius: "3px",
              marginBlock: "22px",
            }}
            src="favicon.png"
            alt="Company Logo"
            height={props.collapse ? 40 : 110}
            width={props.collapse ? 40 : 110}
          />
        </div>

        <Menu.Item key="/" icon={<LaptopOutlined />}>
          <span>Dashboard</span>
        </Menu.Item>
        <Menu.Item key="/vehicles" icon={<CarOutlined />}>
          <span>Vehicles</span>
        </Menu.Item>
        <Menu.Item key="/packages" icon={<CarOutlined />}>
          <span>Packages</span>
        </Menu.Item>
        <Menu.Item key="/bookings" icon={<BookOutlined />}>
          <span>Bookings</span>
        </Menu.Item>
        <Menu.Item key="/admins" icon={<UserOutlined />}>
          <span>Admins</span>
        </Menu.Item>
        <Menu.Item key="/users" icon={<UsergroupAddOutlined />}>
          <span>Users</span>
        </Menu.Item>
        <Menu.Item key="/locations" icon={<SendOutlined />}>
          <span>Locations</span>
        </Menu.Item>
        <Menu.Item key="/reviews" icon={<MailOutlined />}>
          <span>Reviews</span>
        </Menu.Item>
        <Menu.Item key="/contacts" icon={<ContactsOutlined />}>
          <span>Contacts</span>
        </Menu.Item>
        <hr style={{ color: "yellowgreen" }} />
        <Menu.Item icon={<SettingOutlined />}>
          <span>Settings</span>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;
