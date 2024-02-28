import {
  CarOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  SendOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import carContext from "../context/cars/carContext";
import Spinner from "./Spinner";
import Model from "./Model";
import { useNavigate } from "react-router-dom";

function Vehicles() {
const navigate=useNavigate()
  const{fetchallvehicles,cars,setcars,isSpin,setisModalOpen,isModalOpen,setModalData,setisSpin,isAddCar,setisAddCar,setcarIconModal,
    carIconModal,fetchdestinations}=useContext(carContext)
  let ac = true;
  const handleEdit=(car)=>{
    setisModalOpen(true)
    console.log(isModalOpen)
    console.log(car)
console.log("clicked")
setModalData(car)
  }
  const handledelete=async(car)=>{
    try{
      setisSpin(true)
      
      const response = await fetch(`https://umrahride-dashboard-backend.vercel.app/api/vehicles/deletevehicle/${car._id}`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            // "auth-token":localStorage.getItem("token")
            
          },
        });
        const json= await response.json();
      fetchallvehicles()
        //   console.log(json)
      setisSpin(false)
      } 
      catch (error) {
          console.log("error in frontend api request to delete vehicle"+error)
      }
  }
  const handleAddVehicle=()=>{
    setisModalOpen(true)
    setisAddCar(true)
  }

  useEffect(() => {
    fetchallvehicles()
    fetchdestinations()
    
    
  }, [])
   
  const handleCarIcon=(car)=>{
    localStorage.setItem('selectedvehicle',JSON.stringify(car));
    localStorage.setItem('selectedvehicleid',car._id)
  setisSpin(true)
    navigate('/carbookings')
  }

  const handleLocationIcon=(car)=>{
    localStorage.setItem('selectedvehicle',JSON.stringify(car));
    localStorage.setItem('selectedvehicleid',car._id)
  setisSpin(true)
    navigate('/carlocations')
  }
  return (
    <>
    
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
          <h4>Vehicles</h4>
          <p style={{ color: "darkgrey" }}>
            You can add delete and update vehicles below
          </p>
          {isSpin?(<div style={{textAlign:"center",marginBottom:"60px"}} ><Spinner  /></div>):
          (<table class="table">
            <thead className='thead-bg'>

              
                
                <th className='tables-heading-padding'  scope="col">Image</th>
                <th className='tables-heading-padding'  scope="col">Vehicle Title</th>
                <th className='tables-heading-padding'  scope="col">Type</th>
                <th className='tables-heading-padding'  scope="col">Doors</th>
                <th className='tables-heading-padding'  scope="col">AC</th>
                <th className='tables-heading-padding'  scope="col">Bags Capacity</th>
                <th className='tables-heading-padding'  scope="col">Seats</th>
                <th className='tables-heading-padding'  scope="col">Routes</th>
                <th className='tables-heading-padding'  scope="col">Packages</th>
                <th className='tables-heading-padding'  scope="col">
                  <Button type="primary" style={{height:"25px",width:"80px",padding:"2px",border:"none",margin:"2px",backgroundColor:"#1677ff",color:"white"}} onClick={handleAddVehicle} >
                    Add <PlusOutlined></PlusOutlined>
                  </Button>
                </th>
              
            </thead>
            <tbody>
              {
              cars.map((car,index)=>{
            return  <tr >

                <td>
                  <img
                    height="30px"
                    width="45px"
                    alt="car.imgURL"
                    src={car.imgURL}
                  />
                </td>
                <td>{car.name}</td>
                <td>{car.cartype}</td>
                <td>4</td>
                <td>
                  {ac ? (
                    <CheckOutlined style={{ color: "#57e210" }} />
                  ) : (
                    <CloseOutlined style={{ color: "red" }} />
                  )}
                </td>
                <td>{car.bags}</td>
                <td>{car.seats}</td>
                <td>
                  <SendOutlined
                    style={{ color: "#0000ff", fontSize: "15px" }}
                    onClick={()=>handleLocationIcon(car)}
                  />{" "}
                </td>
                <td>
                  <CarOutlined onClick={()=>handleCarIcon(car)} style={{ color: "orange", fontSize: "17px" }} />
                </td>
                <td >
                  <EditOutlined
                     onClick={() => handleEdit(car)} 
                    style={{ color: "gray", fontSize: "15px" }}
                  ></EditOutlined>{" "}
                  <DeleteFilled
                  onClick={() => handledelete(car)}
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginLeft: "37px",
                    }}
                  ></DeleteFilled>
                </td>
              </tr>
              })}
            </tbody>
          </table>)
}
        </Col>
      </Row>
      <Model />
    </>
  );
}

export default Vehicles;
