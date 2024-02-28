import { CheckOutlined, CloseOutlined, CompressOutlined, DeleteFilled, EditOutlined, EyeFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tooltip } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import carContext from '../context/cars/carContext'
import Spinner from './Spinner'
import { useLocation } from 'react-router-dom'
import Viewmodal from './Viewmodal'
function Booking() {
    const{isSpin,fetchallbookings,bookings,setbookings,setisSpin,currentLocation,setcurrentLocation,nonPackageBookings,packageBookings,isViewModalOpen,
      setisViewModalOpen}=useContext(carContext)
  const [ispkg, setispkg] = useState(false)
    const [btn, setbtn] = useState('1')
    const [selectedBooking, setselectedBooking] = useState()
    

    const handleEdit=()=>{
        console.log("edit")
    }
    const handledelete=async(bookingid)=>{
        console.log("delete")
        try{
          setisSpin(true)
          
          const response = await fetch("https://umrahride-dashboard-backend.vercel.app/api/vehicles/delbooking", {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
                // "auth-token":localStorage.getItem("token")
                
              },
              body:JSON.stringify({bookingid:bookingid})
            });
            const json= await response.json();
          fetchallbookings()
            //   console.log(json)
          setisSpin(false)
          } 
          catch (error) {
              console.log("error in frontend api request to delete booking"+error)
          }
    }    
    const handleConfirmBooking=()=>{
      setbtn("1")
      setispkg(false)
      fetchallbookings()
    }
    const packageBtn=()=>{
      setbtn("2")
      setispkg(true)
      fetchallbookings()
    }
    const visitedBtn=()=>{
      setbtn("3")
    }
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const formatTime = (timeString) => {
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      return new Date(timeString).toLocaleTimeString(undefined, options);
    };
    useEffect(() => {
       fetchallbookings()
       //console.log(bookings)
       handleLocation()
    }, [])
    const location=useLocation()
const handleLocation=()=>{
  setcurrentLocation(location.pathname)
}
const handlEyeIcon=(value)=>{
  setisSpin(true)
setselectedBooking(value)
setisViewModalOpen(true)
setisSpin(false)
}


    return (
    <>
    {selectedBooking? (
<Viewmodal

booking={selectedBooking}
/>):(<span style={{display:"none"}}><Spinner /></span>)
}
    
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
          <h4>Bookings</h4>
          <p style={{ color: "darkgrey" }}>
            You can add delete and update booking below
          </p>
          <div style={{width:"20%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Button type={btn === '1' ? 'primary' : 'none'} onClick={handleConfirmBooking} >Confirm Bookings</Button>
          <Button type={btn === '2' ? 'primary' : 'none'} onClick={packageBtn}>Package</Button>
          
          </div>
          {!ispkg?
         (<div>
          {isSpin?(<div style={{textAlign:"center",marginBottom:"60px"}} ><Spinner  /></div>):
          (<table class="table mt-4">
            <thead className='thead-bg'>

              
                
                <th  className='tables-heading-padding'  scope="col">Id</th>
                <th  className='tables-heading-padding'  scope="col">Name</th>
                <th   className='tables-heading-padding' scope="col">Destination</th>
                <th  className='tables-heading-padding'  scope="col">Whatsapp</th>
                <th   className='tables-heading-padding' scope="col">Total Fare</th>
                <th   className='tables-heading-padding' scope="col">PickupDate</th>
                <th   className='tables-heading-padding' scope="col">Time</th>
                <th   className='tables-heading-padding' scope="col">Status</th>
                <th   className='tables-heading-padding' scope="col">View More</th>
                <th   className='tables-heading-padding' scope="col">Action</th>
                
              
            </thead>
            <tbody>
              {nonPackageBookings.map((booking,index)=>{
               
               return <tr >

                <td>
                {index+1}
                </td>
                <td>{booking.user.name? booking.user.name : booking.user._id}</td>
                <td>{booking.destination.from}to{booking.destination.to}</td>
                <td>{booking.user?.phone}</td>
                <td>{booking.pricing === null ? "N/A" : (booking.pricing ? booking.pricing.price : "N/A")}</td>
                
      <td>{formatDate(booking.datepicker)}</td>
      
      <td>{formatTime(booking.datepicker)}</td>
      <td>
      
  {booking.bookingstatus === "1" ? (
    <CheckOutlined style={{ color: "#57e210" }} />
  ) : (
    <CloseOutlined style={{ color: "red" }}/>
  )}
</td>
<td>
<EyeFilled
  style={{ color: "#1677ff" }}
  onClick={()=>handlEyeIcon(booking)}
/>

</td>
                
                
                <td >
                  
                  <DeleteFilled
                  onClick={() => handledelete(booking._id)}
                    style={{
                      color: "red",
                      fontSize: "15px",
                     marginLeft:"10px"
                    }}
                  ></DeleteFilled>
                
                </td>
              </tr>
            })} 
            </tbody>
          </table>)
}
</div>):
(<div>

{isSpin?(<div style={{textAlign:"center",marginBottom:"60px"}} ><Spinner  /></div>):
          (<table class="table mt-4">
            <thead className='thead-bg'>

              
                
                <th  className='tables-heading-padding'  scope="col">Id</th>
                <th  className='tables-heading-padding'  scope="col">Name</th>
                <th   className='tables-heading-padding' scope="col">title</th>
                <th  className='tables-heading-padding'  scope="col">Whatsapp</th>
               
                <th   className='tables-heading-padding' scope="col">PickupDate</th>
                <th   className='tables-heading-padding' scope="col">Time</th>
                <th   className='tables-heading-padding' scope="col">Status</th>
                <th   className='tables-heading-padding' scope="col">View more</th>
                <th   className='tables-heading-padding' scope="col">Action</th>
                
              
            </thead>
            <tbody>
              {packageBookings.map((booking,index)=>{
               
               return <tr >

                <td>
                {index+1}
                </td>
                <td>{booking.user.name? booking.user.name : booking.user._id}</td>
                <td>{booking.pkg.title}</td>
                <td>{booking.user.phone}</td>
                
      <td>{formatDate(booking.datepicker)}</td>
      
      <td>{formatTime(booking.datepicker)}</td>
    
      <td>
  {booking.bookingstatus === "1" ? (
    <CheckOutlined style={{ color: "#57e210" }} />
  ) : (
    <CloseOutlined style={{ color: "red" }}/>
  )}
</td>
<td>
<EyeFilled
  style={{ color: "#1677ff" }}
  onClick={()=>handlEyeIcon(booking)}
/>

</td>
                
                
                
                <td >
                  
                  <DeleteFilled
                  onClick={() => handledelete(booking._id)}
                    style={{
                      color: "red",
                      fontSize: "15px",
                     marginLeft:"10px"
                    }}
                  ></DeleteFilled>
                
                </td>
              </tr>
            })} 
            </tbody>
          </table>)
}

</div>)}
        </Col>
      </Row>

    </>
  )
}

export default Booking