import React from 'react';
import { LaptopOutlined, UserOutlined, CalendarOutlined, CarOutlined, CarryOutOutlined, CreditCardOutlined, SendOutlined, BellFilled, CreditCardFilled } from '@ant-design/icons';

function Dashboardcard({ title, tag, value, icon }) {
  const getIcon = () => {
    switch (icon) {
      case 'laptop':
        return <LaptopOutlined style={{ fontSize: "33px", margin: "auto", padding: "30px", boxSizing: "border-box", color: "#57e210" }} />;
      case 'user':
        return <UserOutlined style={{ fontSize: "33px", margin: "auto", padding: "30px", boxSizing: "border-box", color: "#108ee9" }} />;
      case 'vehicle':
        return <CarOutlined style={{ fontSize: "33px", margin: "auto", padding: "30px", boxSizing: "border-box", color: "orange" }} />;
        case 'package':
            return <CarryOutOutlined  style={{ fontSize: "33px", margin: "auto", padding: "30px", boxSizing: "border-box", color: "#FF0000" }} />;
        case 'booking':
            return <CreditCardOutlined  style={{ fontSize: "33px", margin: "auto", padding: "30px", boxSizing: "border-box", color: "#808080" }} />;
            case 'review':
                return <SendOutlined  style={{ fontSize: "33px", margin: "auto", padding: "30px", boxSizing: "border-box", color: "#FF0000" }} />;
                case 'adminnotif':
                    return <BellFilled  style={{ fontSize: "33px", margin: "auto", padding: "30px", boxSizing: "border-box", color: "#57e210" }} />;
                    case 'contact':
                        return <CreditCardFilled  style={{ fontSize: "33px", margin: "auto", padding: "30px", boxSizing: "border-box", color: "#108ee9" }} />;
                  
            default:
        return null;
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%", backgroundColor: "white", display: "flex", flexDirection: "row", borderRadius: "8px" }}>
        <div style={{ width: "25%" }}>
          {getIcon()}
        </div>
        <div style={{ width: "75%", padding: "20px" }}>
          <p style={{ fontSize: "15px", fontWeight: "bold" }}>{title}</p>
          <p>{tag} {value}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboardcard;
