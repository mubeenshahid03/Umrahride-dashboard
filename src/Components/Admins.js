import { CheckOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React, { useContext, useEffect } from 'react'
import carContext from '../context/cars/carContext'
import Spinner from './Spinner'
import { useLocation } from 'react-router-dom'
import Pkgmodel from './Pkgmodel'

function Admins() {
const{isSpin,fetchalladmins,admins,setadmins,setisSpin,currentLocation,setcurrentLocation,isPkgModelOpen,
  setisPkgModelOpen,seteditAdminId,isAddAdminBtn,setisAddAdminBtn}=useContext(carContext)
const handleEdit=(adminId)=>{
    console.log("edit")
    seteditAdminId(adminId)
    setisPkgModelOpen(true)
}
const handledelete=async(adminId)=>{
  //http://localhost:7000/api/auth/edituser/_id
    console.log("delete")
    try{
      setisSpin(true)
      
      const response = await fetch(`https://umrahride-dashboard-backend.vercel.app/api/auth/deleteuser/${adminId}`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            // "auth-token":localStorage.getItem("token")
            
          },
        });
        const json= await response.json();
      fetchalladmins()
        //   console.log(json)
      setisSpin(false)
      } 
      catch (error) {
          console.log("error in frontend api request to delete package"+error)
      }
}    
useEffect(() => {
    fetchalladmins();
    handleLocation()
}, [])
const location=useLocation()
const handleLocation=()=>{
  setcurrentLocation(location.pathname)
}


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
          <h4>Admins</h4>
          <p style={{ color: "darkgrey" }}>
            You can add delete and update admins below
          </p>
          {isSpin?(<div style={{textAlign:"center",marginBottom:"60px"}} ><Spinner  /></div>):
          (<table class="table">
            <thead className='thead-bg'>

              
                
                <th  className='tables-heading-padding'  scope="col">Id</th>
                <th  className='tables-heading-padding'  scope="col">Name</th>
                <th   className='tables-heading-padding' scope="col">Email</th>
                <th  className='tables-heading-padding'  scope="col">status</th>
                <th   className='tables-heading-padding' scope="col"></th>
                <th   className='tables-heading-padding' scope="col"></th>
                
                <th className='tables-heading-padding' scope="col">
                  <Button onClick={()=>{setisPkgModelOpen(true);setisAddAdminBtn(true)}} type="primary" style={{height:"25px",width:"80px",padding:"2px",border:"none",margin:"2px",backgroundColor:"#1677ff",color:"white"}}  >
                    Add <PlusOutlined></PlusOutlined>
                  </Button>
                </th>
              
            </thead>
            <tbody>
              {admins.map((admin,index)=>{
             return  <tr >

                <td>
                {index+1}
                </td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td><CheckOutlined style={{color:"#57e210"}} /></td>
                
                <td></td>
                <td></td>
                
                <td >
                  <EditOutlined
                     onClick={() => handleEdit(admin._id)} 
                    style={{ color: "gray", fontSize: "15px" }}
                  ></EditOutlined>{" "}
                  <DeleteFilled
                  onClick={() => handledelete(admin._id)}
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

    </>
  )
}

export default Admins