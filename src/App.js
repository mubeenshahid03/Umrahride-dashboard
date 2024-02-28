import React, { useEffect, useState } from "react";
import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Button } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Vehicles from "./Components/Vehicles";
import { MenuOutlined } from "@ant-design/icons";
import Carpk from "./context/cars/Carpk"
import Admins from "./Components/Admins";
import Users from "./Components/Users";
import Packages from "./Components/Packages";
import Locations from "./Components/Locations";
import Reviews from "./Components/Reviews";
import Booking from "./Components/Booking";
import Contacts from "./Components/Contacts";
import Carbookings from "./Components/Carbookings";
import Carlocations from "./Components/Carlocations";
const { Header, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  

  return (
    <Router>
      <Carpk>
      <Layout style={{ minHeight: "100vh", backgroundColor: "lightgrey" }}>
        <Layout.Sider
          width={180} 
          collapsedWidth={80}
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
          style={{
            position: 'fixed',
            minHeight: "100vh",
            overflow: 'auto',
          }}
        >
          <Navbar collapse={collapsed} />
        </Layout.Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 180 }}>
          <Header style={{backgroundColor:"white"}}>
            <MenuOutlined style={{fontSize:"23px",marginBottom:"16"}} onClick={toggleCollapsed} />
          </Header>
          <Content>
            <Routes>
              <Route exact path="/" element={<Home  />} />
              <Route exact path="/locations" element={<Locations />} />
              <Route exact path="/vehicles" element={<Vehicles />} />
              <Route exact path="/admins" element={<Admins />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/packages" element={<Packages />} />
              <Route exact path="/locations" element={<Packages />} />
              <Route exact path="/reviews" element={<Reviews />} />
              <Route exact path="/bookings" element={<Booking />} />
              <Route exact path="/contacts" element={<Contacts />} />
              <Route exact path="/carbookings" element={<Carbookings />} />
              <Route exact path="/carlocations" element={<Carlocations />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      </Carpk>
    </Router>
  );
}

export default App;
