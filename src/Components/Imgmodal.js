import React, { useContext, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import carContext from "../context/cars/carContext";
import { Option } from "antd/es/mentions";
import { messaging } from "../firebase";

function Imgmodal(props) {
  const { Imgmodal, setImgmodal, imgURL } = useContext(carContext);
  const handleOk = (e) => {
    console.log(e);
    setImgmodal(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setImgmodal(false);
  };
  return (
    <>
      <Modal
        open={Imgmodal}
        title={<h3 style={{ textAlign: "center" }}>Vehicle</h3>}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal"
        okButtonProps={{
          hidden: true,
        }}
        cancelButtonProps={{
          hidden: true,
        }}
        width={450}
      >
        <Form name="professional-login-form" layout="vertical">
          <Form.Item>
            <Col
              span={16}
              lg={16}
              sm={24}
              xs={24}
              style={{
                height: "270px",
                backgroundColor: "lightgray",
                margin: "auto",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img width="100%" height="270px" src={imgURL} />
            </Col>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Imgmodal;
