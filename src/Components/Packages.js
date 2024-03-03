import {
  CheckOutlined,
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import React, { useContext, useEffect } from "react";
import carContext from "../context/cars/carContext";
import Spinner from "./Spinner";
import Pkgmodel from "./Pkgmodel";
import { useLocation } from "react-router-dom";

function Packages() {
  const {
    isSpin,
    fetchallpackages,
    packages,
    setpackages,
    setisSpin,
    currentLocation,
    setcurrentLocation,
    isPkgModelOpen,
    setisPkgModelOpen,
    isAddAdminBtn,
    setisAddAdminBtn,
    editPkgId,
    seteditPkgId,
    fetchallvehicles,
  } = useContext(carContext);
  const handleEdit = (pkgid) => {
    // console.log("edit")
    // console.log(pkgid)
    seteditPkgId(pkgid);
    setisPkgModelOpen(true);
  };
  const handledelete = async (pkgid) => {
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
      fetchallpackages();
      //   console.log(json)
      setisSpin(false);
    } catch (error) {
      console.log("error in frontend api request to delete package" + error);
    }
  };
  useEffect(() => {
    fetchallpackages();
    handleLocation();
    fetchallvehicles();
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
          <h4>Packages</h4>
          <p style={{ color: "darkgrey" }}>
            You can add , delete and update packages below
          </p>
          {isSpin ? (
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <Spinner />
            </div>
          ) : (
            <table class="table">
              <thead className="thead-bg" style={{ height: "40px" }}>
                <th className="tables-heading-padding" scope="col">
                  Id
                </th>
                <th className="tables-heading-padding" scope="col">
                  Title
                </th>
                <th className="tables-heading-padding" scope="col">
                  Description
                </th>

                <th className="tables-heading-padding" scope="col">
                  <Button
                    type="primary"
                    onClick={() => {
                      setisPkgModelOpen(true);
                      setisAddAdminBtn(true);
                    }}
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
                {packages.map((pkg, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{pkg.title}</td>
                      <td style={{ maxWidth: "400px" }}>{pkg.description}</td>
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

export default Packages;
