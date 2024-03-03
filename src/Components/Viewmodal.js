import React, { useContext, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import carContext from "../context/cars/carContext";
import { Option } from "antd/es/mentions";
import { messaging } from "../firebase";

function Viewmodal(props) {
  //const serverKey="BKONrrJLFRqd3QpBgT165-ywda0-pJGmQcnzvxQsfvN7uEnnySVWpB64YDO7vi2g5PsVTTs84-YZQgofW5vDqrY"
  const {
    isViewModalOpen,
    setisViewModalOpen,
    selectedBooking,
    setSelectedBooking,
    fetchallbookings,
  } = useContext(carContext);

  const showModal = () => {
    setisViewModalOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setisViewModalOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setisViewModalOpen(false);
  };
  // const sendNotification = async () => {
  //     try {
  //         // Get the messaging token for the Umrahride website
  //         const token = await messaging.getToken();

  //         // Send a message to the Umrahride website
  //         await fetch('https://fcm.googleapis.com/fcm/send', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `key=${serverKey}`
  //             },
  //             body: JSON.stringify({
  //                 to: token,
  //                 notification: {
  //                     title: 'Booking Status Updated',
  //                     body: 'Your booking status has been updated.',
  //                 },
  //             }),
  //         });

  //         console.log('Notification sent successfully');
  //     } catch (error) {
  //         console.error('Error sending notification:', error);
  //     }
  // };

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        "https://umrahride-dashboard-backend.vercel.app/api/vehicles/editbookingstatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingid: props.booking._id,
            bookingstatus: values.bookingstatus,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }
      const data = await response.json();
      console.log("Updated booking status:", data);
      // await sendNotification()
      setisViewModalOpen(false); // Close the modal after successful update
      fetchallbookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
      message.error("Failed to update booking status");
    }
  };

  return (
    <>
      <Modal
        open={isViewModalOpen}
        title={<h3 style={{ textAlign: "center" }}>Booking Details</h3>}
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
              <img
                width="100%"
                height="270px"
                src={props.booking.vehicle.imgURL}
              />
            </Col>
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex" }}>
              <div id="booking-summary-content-left">
                <h6>Cardetails</h6>
                <p>
                  {props.booking.vehicle.name},{props.booking.vehicle.cartype}
                </p>

                <h6>destination</h6>

                <p>
                  {props.booking.isPackage
                    ? props.booking.pkg.description
                    : `${props.booking.destination.from} to ${props.booking.destination.to}`}
                </p>

                <h6>Name</h6>

                <p>
                  {props.booking.user.name
                    ? props.booking.user.name
                    : props.booking.user._id}
                </p>
                <h6>phone Number</h6>

                <p>{props.booking.user.phone}</p>
                <h6>Price</h6>
                <p>1500 SAR</p>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            label="approved/notapproved"
            name="bookingstatus"
            rules={[{ required: true, message: "Please enter bags" }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value="1">Approved</Option>
              <Option value="0">Not Approved</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              id="book-summary-btn"
              htmlType="submit"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Change
            </Button>
            <Button
              id="book-summary-btn"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={handleCancel}
            >
              Close
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Viewmodal;
