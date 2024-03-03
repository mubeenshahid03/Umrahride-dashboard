import { MenuOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import Dashboardcard from "./Dashboardcard";
import Dashboardtable from "./Dashboardtable";
import Bookingtable from "./Bookingtable";
import { useEffect, useState } from "react";
import { useContext } from "react";
import carContext from "../context/cars/carContext";
import Spinner from "./Spinner";

function Home() {
  const [cardDataValue, setcardDataValue] = useState([]);
  const {
    isSpin,
    setisSpin,

    fetchsortedbookings,
    todayBookings,
    latestBookings,
    cardData,
  } = useContext(carContext);
  // const cardData = [
  //   { title: 'Admins', tag: '1', icon: 'laptop' },
  //   { title: 'Users', tag: '100', icon: 'user' },
  //   { title: 'Vehicles', tag: '7', icon: 'vehicle' },
  //   { title: 'Packages', tag: '10', icon: 'package' },
  //   { title: 'Bookings', tag: '96', icon: 'booking' },
  //   { title: 'Reveiws', tag: '0', icon: 'review' },
  //   { title: 'Admin Notif', tag: '0', icon: 'adminnotif' },
  //   { title: 'Contacts', tag: '21', icon: 'contact' },
  // ];

  useEffect(() => {
    setisSpin(true);

    fetchsortedbookings();
    setisSpin(false);
  }, []);

  //below for understanding how sorting works
  // const descending=()=>{
  // let nums=[1,2,3,4]
  // let oks=nums.sort((a,b)=>{
  //   let numa=a
  //   let numb=b
  //   return numb-numa
  // })
  // console.log(oks)
  // }

  return (
    <>
      {/* {console.log(cardData,todayBookings,latestBookings)} */}
      <div style={{ backgroundColor: "#e9ebee" }}>
        <div>
          {isSpin ? (
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <Spinner />
            </div>
          ) : (
            <Row id="dashboard-cards">
              {cardData.map((card, index) => (
                <Col
                  key={index}
                  span={5}
                  xl={5}
                  lg={8}
                  md={10}
                  sm={24}
                  xs={24}
                  className="dashboard-card"
                  style={{ backgroundColor: "white" }}
                >
                  <Dashboardcard {...card} />
                </Col>
              ))}
            </Row>
          )}
        </div>

        <div id="hometablea">
          <div
            className="table-responsive"
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
            }}
          >
            <h5 className="mb-4">PickUps (Today & Tomorrow) </h5>
            {todayBookings ? (
              <Dashboardtable todayBookings={todayBookings} />
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        <div id="hometableb">
          <div
            className="table-responsive"
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
            }}
          >
            <h5 className="mb-4">Bookings</h5>

            <Bookingtable />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
