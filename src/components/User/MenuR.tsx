import { Avatar, Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store";

const MenuR = () => {
  const user = useSelector((state: RootState) => state.users.currentUser);

  return (
    <div>
      <Card title="Thông tin của bạn">
        <NavLink
          to=""
          style={() => ({
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "inherit",
          })}
        >
          <Avatar src={user?.avatar} size={40} />
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            {user?.name}
          </span>
        </NavLink>
      </Card>
      <Card title="Người liên hệ" style={{ marginTop: 16 }}>
        <NavLink
          to=""
          style={() => ({
            display: "block",
            textDecoration: "none",
            color: "inherit",
            marginBottom: "8px",
          })}
        >
          User 1
        </NavLink>
        <NavLink
          to="/user/2"
          style={() => ({
            display: "block",
            textDecoration: "none",
            color: "inherit",
            marginBottom: "8px",
          })}
        >
          User 2
        </NavLink>
        <NavLink
          to="/user/3"
          style={() => ({
            display: "block",
            textDecoration: "none",
            color: "inherit",
          })}
        >
          User 3
        </NavLink>
      </Card>
    </div>
  );
};

export default MenuR;
