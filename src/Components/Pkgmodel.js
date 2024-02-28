import { Button, Form, Input, Modal, Select, Space, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import carContext from '../context/cars/carContext';

function Pkgmodel() {
    const{isModalOpen,setisModalOpen,ModalData,isSpin,setisSpin,fetchallvehicles,isAddCar,setisAddCar,currentLocation,isPkgModelOpen,
      setisPkgModelOpen,addAdmin,editAdmin,isAddAdminBtn,setisAddAdminBtn,
    addPackage,editPackage,addLocation,editLocation,isAddPkgfair,
    setisAddPkgfair,fetchdestinations,
    destinations,
    setdestinations,cars,setcars}=useContext(carContext)    
    useEffect(() => {
      //console.log(ModalData)
      console.log("ok")
    }, [])
    
    const handleOk = () => {
      setisPkgModelOpen(false)
    };
    const handleCancel = () => {
      setisPkgModelOpen(false)
    };
  // handle values of inputs that fill in the model 
const onFinish = async (values) => {
  console.log('Submitted values in modal:', values);
  console.log(ModalData);
  
  if (currentLocation === '/admins') {
    if (isAddAdminBtn) {
      addAdmin(values.name, values.email, values.password);
    } else {
      editAdmin(values.name, values.email, values.password);
    }
  } else if (currentLocation === '/packages') {
    if (isAddAdminBtn) {
      addPackage(values.title, values.description, values.vehicleid,values.price);
    } else {
      editPackage(values.title, values.description, values.vehicleid,values.price);
    }
  } else if (currentLocation === '/locations') {
    const selectedDestination = values.destination.split('-');
    const selectedDestinationObject = destinations.find(destination => destination.from === selectedDestination[0] && destination.to === selectedDestination[1]);
    
    
    if (isAddAdminBtn) {
      addLocation(values.vehicleid, selectedDestinationObject._id, values.price);
    } else {
      editLocation(values.vehicleid, selectedDestinationObject._id, values.price);
    }
  }
  else if (currentLocation === '/carbookings') {
    if (isAddPkgfair) {
      addPackage(values.title, values.description,localStorage.getItem('selectedvehicleid'), values.price );
    } else {
      editPackage(values.title, values.description,localStorage.getItem('selectedvehicleid'), values.price);
    }
  }
  else if (currentLocation === '/carlocations') {
    const selectedDestination = values.destination.split('-');
    const selectedDestinationObject = destinations.find(destination => destination.from === selectedDestination[0] && destination.to === selectedDestination[1]);
    
    if (isAddAdminBtn) {
      addLocation(localStorage.getItem('selectedvehicleid'),selectedDestinationObject._id, values.price);
    } else {
      editLocation(localStorage.getItem('selectedvehicleid'),selectedDestinationObject._id, values.price);
    }
  } 
  else {
    message.error("Cannot send data for add and edit in model");
  }
};

    return (
    <>
    <Space>
        {/* <Button type="primary" onClick={showModal}>
          Open Modal
        </Button> */}
      </Space>
      <Modal
        
        open={isPkgModelOpen}
        
        title={<h3 style={{ textAlign: 'center' }}>Form Details</h3>}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal" 
        okButtonProps={{
          hidden:true,
        }}
        cancelButtonProps={{
        hidden:true,
        }}
       
      >
        <Form
            name="professional-login-form"
            onFinish={onFinish}
            layout="vertical"
            
          >
            
            {currentLocation === "/admins" ? (
  <>
    <Form.Item
      label="Name"
      name="name"
      rules={[
        { required: true, message: 'Please enter admin' },
        { min: 3, message: 'admin name must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter admin name" />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: 'Please enter email' },
        { min: 3, message: 'email must be at least 5 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter email" />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[
        { required: true, message: 'Please enter password' },
        { min: 3, message: 'password must be at least 5 characters' },
      ]}
    >
      <Input.Password size="large" placeholder="Enter password" />
    </Form.Item>
  </>
) : currentLocation === "/packages" ? (
  <>
    <Form.Item
      label="Title"
      name="title"
      rules={[
        { required: true, message: 'Please enter title' },
        { min: 3, message: 'title must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter title" />
    </Form.Item>
    <Form.Item
      label="description"
      name="description"
      rules={[
        { required: true, message: 'Please enter description' },
        { min: 3, message: 'description must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter description" />
    </Form.Item>
    {/* <Form.Item
      label="vehicleid"
      name="vehicleid"
      rules={[
        { required: true, message: 'Please enter vehicleid' },
        { min: 3, message: 'vehicleid must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter vehicleid" />
    </Form.Item> */}
    <Form.Item
  style={{ color: "white" }}
  name="vehicleid"
  label='Select Vehicle'
  rules={[{ required: true, message: "Select vehicle" }]}
>
<Select
    className="destination_select"
    placeholder="Select vehicle"
  >
    {Array.isArray(cars) && cars.map((car) => (
      <Select.Option key={car._id} value={car._id} >
        {car.name}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
    <Form.Item
      label="price"
      name="price"
      rules={[
        { required: true, message: 'Please enter price' },
        { min: 3, message: 'vehicleid must be at least 3 price' },
      ]}
    >
      <Input size="large" placeholder="Enter price" />
    </Form.Item>
  </>
): currentLocation === "/carbookings" ? (
  <>
    <Form.Item
      label="Title"
      name="title"
      rules={[
        { required: true, message: 'Please enter title' },
        { min: 3, message: 'title must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter title" />
    </Form.Item>
    <Form.Item
      label="description"
      name="description"
      rules={[
        { required: true, message: 'Please enter description' },
        { min: 3, message: 'description must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter description" />
    </Form.Item>
    
    <Form.Item
      label="price"
      name="price"
      rules={[
        { required: true, message: 'Please enter price' },
        { min: 3, message: 'vehicleid must be at least 3 price' },
      ]}
    >
      <Input size="large" placeholder="Enter price" />
    </Form.Item>
  </>
)
 : currentLocation==="/locations"?(
  <>
  {/* <Form.Item
      label="vehicleid"
      name="vehicleid"
      rules={[
        { required: true, message: 'Please enter vehicleid' },
        { min: 3, message: 'vehicleid must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter vehicleid" />
    </Form.Item> */}
    <Form.Item
  style={{ color: "white" }}
  name="vehicleid"
  label='Select Vehicle'
  rules={[{ required: true, message: "Select vehicle" }]}
>
<Select
    className="destination_select"
    placeholder="Select vehicle"
  >
    {Array.isArray(cars) && cars.map((car) => (
      <Select.Option key={car._id} value={car._id} >
        {car.name}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
    <Form.Item
  style={{ color: "white" }}
  name="destination"
  label='Select Destination'
  rules={[{ required: true, message: "Select destination" }]}
>
<Select
    className="destination_select"
    placeholder="Select destination"
  >
    {Array.isArray(destinations) && destinations.map((destination) => (
      <Select.Option key={destination._id} value={`${destination.from}-${destination.to}`} >
        {destination.from} to {destination.to}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
    {/* <Form.Item
      label="destinationid"
      name="destinationid"
      rules={[
        { required: true, message: 'Please enter destinationid' },
        { min: 3, message: 'destinationid must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter destinationid" />
    </Form.Item> */}
    <Form.Item
      label="price"
      name="price"
      rules={[
        { required: true, message: 'Please enter price' },
        { min: 2, message: 'price must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter price" />
    </Form.Item>
  </>
) : currentLocation==="/carlocations"?(
  <>
  <Form.Item
  style={{ color: "white" }}
  name="destination"
  label='Select Destination'
  rules={[{ required: true, message: "Select destination" }]}
>
<Select
    className="destination_select"
    placeholder="Select destination"
  >
    {Array.isArray(destinations) && destinations.map((destination) => (
      <Select.Option key={destination._id} value={`${destination.from}-${destination.to}`} >
        {destination.from} to {destination.to}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
    {/* <Form.Item
      label="destinationid"
      name="destinationid"
      rules={[
        { required: true, message: 'Please enter destinationid' },
        { min: 3, message: 'destinationid must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter destinationid" />
    </Form.Item> */}
    <Form.Item
      label="price"
      name="price"
      rules={[
        { required: true, message: 'Please enter price' },
        { min: 2, message: 'price must be at least 3 characters' },
      ]}
    >
      <Input size="large" placeholder="Enter price" />
    </Form.Item>
  </>
) 
: (
  <p>Could not get location</p>
)}

           
            <Form.Item>
              <Button type="primary"  htmlType="submit" size="large" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
             
          </Form>
      </Modal>
    
    
    </>
  )
}

export default Pkgmodel