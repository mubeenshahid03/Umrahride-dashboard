import { Button, Form, Input, Modal, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import carContext from "../context/cars/carContext";

function Model() {
  const {
    isModalOpen,
    setisModalOpen,
    ModalData,
    isSpin,
    setisSpin,
    fetchallvehicles,
    isAddCar,
    setisAddCar,
  } = useContext(carContext);
  useEffect(() => {
    //console.log(ModalData)
    console.log("ok");
  }, []);

  const handleOk = () => {
    setisModalOpen(false);
  };
  const handleCancel = () => {
    setisModalOpen(false);
  };
  // handle values of inputs that fill in the model
  const onFinish = async (values) => {
    console.log("Submitted values in modal:", values);
    console.log(ModalData);
    if (!isAddCar) {
      try {
        setisSpin(true);
        const response = await fetch(
          `https://umrahride-dashboard-backend.vercel.app/api/vehicles/editvehicle/${ModalData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              //   "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({
              name: values.name,
              cartype: values.cartype,
              seats: values.seats,
              bags: values.bags,
              price: values.price,
              imgURL: values.imgURL,
              userid: "123",
            }),
          }
        );
        const json = await response.json();
        console.log(json);
        fetchallvehicles();
        setisSpin(false);
      } catch (error) {
        console.log("ererer");
      }
    } else {
      console.log("here add car");
      try {
        setisSpin(true);
        const response = await fetch(
          "https://umrahride-dashboard-backend.vercel.app/api/vehicles/addvehicle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //   "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({
              name: values.name,
              cartype: values.cartype,
              seats: values.seats,
              bags: values.bags,
              price: values.price,
              imgURL: values.imgURL,
              userid: "123",
            }),
          }
        );
        const json = await response.json();
        console.log(json);
        fetchallvehicles();
        setisSpin(false);
      } catch (error) {
        console.log("ererer in add");
      }
    }
    setisAddCar(false);
  };
  return (
    <>
      <Space>
        {/* <Button type="primary" onClick={showModal}>
          Open Modal
        </Button> */}
      </Space>
      <Modal
        open={isModalOpen}
        title={<h3 style={{ textAlign: "center" }}>Form Details</h3>}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal"
        okButtonProps={{
          hidden: true,
        }}
        cancelButtonProps={{
          hidden: true,
        }}
      >
        <Form
          name="professional-login-form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Img URL"
            name="imgURL"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input size="large" placeholder="Enter Image URL" />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter carname" },
              { min: 3, message: "carname must be at least 3 characters" },
            ]}
          >
            <Input size="large" placeholder="Enter carname" />
          </Form.Item>
          <Form.Item
            label="CarType"
            name="cartype"
            rules={[
              { required: true, message: "Please enter cartype" },
              { min: 3, message: "title must be at least 3 characters" },
            ]}
          >
            <Input size="large" placeholder="Enter Cartype" />
          </Form.Item>
          <Form.Item
            label="seats"
            name="seats"
            rules={[{ required: true, message: "Please enter seats" }]}
          >
            <Input size="large" placeholder="Enter seats" />
          </Form.Item>
          <Form.Item
            label="bags"
            name="bags"
            rules={[{ required: true, message: "Please enter bags" }]}
          >
            <Input size="large" placeholder="Enter bags" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input size="large" placeholder="Enter price" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Model;
