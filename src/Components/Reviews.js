import { CheckOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React, { useContext, useEffect } from 'react'
import carContext from '../context/cars/carContext'
import Spinner from './Spinner'

function Reviews() {
    const{isSpin}=useContext(carContext)
    const handleEdit=()=>{
        console.log("edit")
    }
    const handledelete=()=>{
        console.log("delete")
    }    
    useEffect(() => {
        
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
          <h4>Reviews</h4>
          <p style={{ color: "darkgrey" }}>
            You can add delete and update reviews below
          </p>
          {isSpin?(<div style={{textAlign:"center",marginBottom:"60px"}} ><Spinner  /></div>):
          (<table class="table">
            <thead className='thead-bg'>

              
                
                <th className='tables-heading-padding'  scope="col">Id</th>
                <th className='tables-heading-padding'  scope="col">Name</th>
                <th className='tables-heading-padding'  scope="col">Image</th>
                <th className='tables-heading-padding'  scope="col">Review</th>
                <th className='tables-heading-padding'  scope="col">Rating</th>
                <th className='tables-heading-padding'  scope="col"></th>
                
                <th className='tables-heading-padding' scope="col">
                  <Button type="primary" style={{height:"25px",width:"80px",padding:"2px",border:"none",margin:"2px",backgroundColor:"#1677ff",color:"white"}}  >
                    Add <PlusOutlined ></PlusOutlined>
                  </Button>
                </th>
              
            </thead>
            <tbody>
           <tr >

                <td>
             
                </td>
                <td></td>
                <td></td>
                <td></td>
                
                <td></td>
                <td></td>
                
                {/* <td >
                  <EditOutlined
                     onClick={() => handleEdit()} 
                    style={{ color: "gray", fontSize: "15px" }}
                  ></EditOutlined>{" "}
                  <DeleteFilled
                  onClick={() => handledelete()}
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginLeft: "37px",
                    }}
                  ></DeleteFilled>
                </td> */}
              </tr>
           
            </tbody>
          </table>)
}
        </Col>
      </Row>
    
    </>
  )
}

export default Reviews