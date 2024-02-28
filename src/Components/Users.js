import { CheckOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import carContext from '../context/cars/carContext'
import Spinner from './Spinner'

function Users() {
    const{isSpin,fetchallusers,users,setusers}=useContext(carContext)
    
    const [date, setdate] = useState(null)
    

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const formatTime = (timeString) => {
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      return new Date(timeString).toLocaleTimeString(undefined, options);
    };
    useEffect(() => {
        fetchallusers()
    }, [])
    


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
          <h4>Users</h4>
          <p style={{ color: "darkgrey" }}>
            You can add delete and update users below
          </p>
          {isSpin?(<div style={{textAlign:"center",marginBottom:"60px"}} ><Spinner  /></div>):
          (<table class="table">
            <thead className='thead-bg'>
        
              
                
                <th className='tables-heading-padding'  scope="col">Id</th>
                <th className='tables-heading-padding'  scope="col">Phone</th>
                <th className='tables-heading-padding'  scope="col">Status</th>
                <th className='tables-heading-padding'  scope="col">Whatsapp</th>
                <th className='tables-heading-padding'  scope="col">Created at</th>
                <th className='tables-heading-padding'  scope="col">Created at</th>
                <th className='tables-heading-padding'  scope="col"></th>
{/*                 
                <th scope="col">
                  <Button type="primary"  >
                    Add <PlusOutlined></PlusOutlined>
                  </Button>
                </th> */}
            
            </thead>
            <tbody>
              {users.map((user,index)=>{ 
            
             return <tr >

                <td>
                {user.name? user.name :  user._id}
                </td>
                <td>{user.phone}</td>
                
                <td><CheckOutlined style={{color:"#57e210"}} /></td>
                
                <td>{user.phone}</td>
                <td>{user.date}</td>
              
      
      <td>{formatTime(user.date)}</td>
                <td></td>
                
                {/* <td >
                  <EditOutlined
                     onClick={() => handleEdit()} 
                    style={{ color: "gray", fontSize: "20px" }}
                  ></EditOutlined>{" "}
                  <DeleteFilled
                  onClick={() => handledelete()}
                    style={{
                      color: "red",
                      fontSize: "20px",
                      marginLeft: "37px",
                    }}
                  ></DeleteFilled>
                </td> */}
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

export default Users