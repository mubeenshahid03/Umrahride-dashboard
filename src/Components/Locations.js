import { CheckOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import carContext from '../context/cars/carContext'
import Spinner from './Spinner'
import { useLocation } from 'react-router-dom'
import Pkgmodel from './Pkgmodel'
import Imgmodal from './Imgmodal'

function Locations(locationid) {
const location=useLocation()
    const [numbering, setnumbering] = useState(0)
    const{isSpin,fetchalllocations,locations,setlocations,setisSpin,currentLocation,setcurrentLocation,isPkgModelOpen,
      setisPkgModelOpen,editLocationId, seteditLocationId,setImgmodal,setimgURL,imgURL,setisAddAdminBtn,fetchdestinations,fetchallvehicles}=useContext(carContext)
const handleEdit=(locationid)=>{
    console.log("edit")
    setisPkgModelOpen(true)
    seteditLocationId(locationid)
    
}
const handledelete=async(locationid)=>{
  //http://localhost:7000/api/vehicles/deletelocation/:id
    console.log("delete")
    try{
      setisSpin(true)
      
      const response = await fetch(`https://umrahride-dashboard-backend.vercel.app/api/vehicles/deletelocation/${locationid}`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            // "auth-token":localStorage.getItem("token")
            
          },
        });
        const json= await response.json();
        fetchalllocations()
        //   console.log(json)
        setisSpin(false)
      } 
      catch (error) {
        console.log("error in frontend api request to delete package"+error)
      }
    }    
    useEffect(() => {
      fetchalllocations()
      fetchdestinations()
      fetchallvehicles()
      handleLocation()
      console.log(locations)
      
    }, [])
    const handleLocation=()=>{
      
      setcurrentLocation(location.pathname)
      //console.log(currentLocation)
    }
    const handleimg=(imi)=>{
      setisSpin(true)
      setimgURL(imi)
      setisSpin(false)
  setImgmodal(true);
  
  
}
  return (
    <>
{!imgURL? (<span style={{display:'none'}}><Spinner /></span>)
     : (<Imgmodal />)
}

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
          <h4>Locations</h4>
          <p style={{ color: "darkgrey" }}>
            You can add delete and update locations below
          </p>
          {isSpin?(<div style={{textAlign:"center",marginBottom:"60px"}} ><Spinner  /></div>):
          (<table class="table">
            <thead className='thead-bg'>

              
                
                <th className='tables-heading-padding' scope="col">Id</th>
                <th className='tables-heading-padding' scope="col">From</th>
                <th className='tables-heading-padding' scope="col">To</th>
                <th className='tables-heading-padding' scope="col">Images</th>
                <th className='tables-heading-padding' scope="col">Created Date</th>
                <th className='tables-heading-padding' scope="col"></th>
                
                <th className='tables-heading-padding' scope="col">
                  <Button type="primary" onClick={()=>{setisPkgModelOpen(true);setisAddAdminBtn(true)}} style={{height:"25px",width:"80px",padding:"2px",border:"none",margin:"2px",backgroundColor:"#1677ff",color:"white"}}  >
                    Add <PlusOutlined></PlusOutlined>
                  </Button>
                </th>
              
            </thead>
            <tbody>
              {locations.map((location,index)=>{
             return <tr >

                <td>
               {index+1}                 
                </td>
                <td>{location.destination.from}</td>
                <td>{location.destination.to}</td>
                <td><Button type='primary' onClick={()=>handleimg(location.vehicle.imgURL)}
>Images</Button></td>
                
                <td>feb-27-2024</td>
                <td></td>
                
                <td >
                  <EditOutlined
                     onClick={() => handleEdit(location._id)} 
                    style={{ color: "gray", fontSize: "15px" }}
                  ></EditOutlined>{" "}
                  <DeleteFilled
                  onClick={() => handledelete(location._id)}
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

export default Locations