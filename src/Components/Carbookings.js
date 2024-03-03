import {
  CheckOutlined,
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import carContext from "../context/cars/carContext";
import Spinner from "./Spinner";
import { useLocation } from "react-router-dom";
import Pkgmodel from "./Pkgmodel";

function Carbookings() {
  const {
    isSpin,
    setisSpin,
    isAddPkgfair,
    setisAddPkgfair,
    isPkgModelOpen,
    setisPkgModelOpen,
    setcurrentLocation,
    fetchPkgs,
    fairpkgs,
    setfairpkgs,
    seteditPkgId,
  } = useContext(carContext);

  const [selectedCar, setselectedCar] = useState({});
  const handleEdit = (pkgid) => {
    console.log("edit");
    seteditPkgId(pkgid);
    setisPkgModelOpen(true);
  };
  const handledelete = async (pkgid) => {
    //`http://localhost:7000/api/vehicles/deletepkg/${pkgid}`
    console.log("delete");
    try {
      setisSpin(true);

      const response = await fetch(
        `https://umrahride-dashboard-backend.vercel.app/api/vehicles/deletepkg/${pkgid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "auth-token":localStorage.getItem("token")
          },
        }
      );
      const json = await response.json();
      fetchPkgs();
      //   console.log(json)
      setisSpin(false);
    } catch (error) {
      console.log("error in frontend api request to delete package" + error);
    }
  };

  const fetchingCar = () => {
    const car = JSON.parse(localStorage.getItem("selectedvehicle"));
    setselectedCar(car);
  };
  useEffect(() => {
    handleLocation();
    fetchingCar();
    fetchPkgs();
  }, []);
  const location = useLocation();

  const handleLocation = () => {
    setcurrentLocation(location.pathname);
  };

  return (
    <>
      <Pkgmodel />
      <Row>
        <Col
          span={22}
          style={{
            backgroundColor: "white",
            margin: "auto",
            marginBlock: "40px",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h4>Packages Fair</h4>
          <p style={{ color: "darkgrey" }}>
            You can add delete and update packages below
          </p>
          {isSpin ? (
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <Spinner />
            </div>
          ) : (
            <table class="table">
              <thead className="thead-bg">
                <th className="tables-heading-padding" scope="col">
                  Id
                </th>
                <th className="tables-heading-padding" scope="col">
                  IMG
                </th>
                <th className="tables-heading-padding" scope="col">
                  Car type
                </th>
                <th className="tables-heading-padding" scope="col">
                  Description
                </th>
                <th className="tables-heading-padding" scope="col">
                  Fare
                </th>
                <th className="tables-heading-padding" scope="col"></th>

                <th></th>
                <th className="tables-heading-padding" scope="col">
                  <Button
                    onClick={() => {
                      setisPkgModelOpen(true);
                      setisAddPkgfair(true);
                    }}
                    type="primary"
                    style={{
                      height: "25px",
                      width: "80px",
                      padding: "2px",
                      border: "none",
                      margin: "2px",
                      backgroundColor: "#1677ff",
                      color: "white",
                    }}
                  >
                    Add <PlusOutlined></PlusOutlined>
                  </Button>
                </th>
              </thead>
              <tbody>
                {fairpkgs.map((pkg, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          height="30px"
                          width="45px"
                          alt="car.imgURL"
                          src={selectedCar.imgURL}
                        />
                      </td>
                      <td>{selectedCar.cartype}</td>
                      <td>{pkg.description}</td>
                      <td>{pkg.price}</td>
                      <td></td>
                      <td></td>

                      <td>
                        <EditOutlined
                          onClick={() => handleEdit(pkg._id)}
                          style={{ color: "gray", fontSize: "15px" }}
                        ></EditOutlined>{" "}
                        <DeleteFilled
                          onClick={() => handledelete(pkg._id)}
                          style={{
                            color: "red",
                            fontSize: "15px",
                            marginLeft: "37px",
                          }}
                        ></DeleteFilled>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Carbookings;
