import { CheckOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import carContext from '../context/cars/carContext'
import Spinner from './Spinner'

function Contacts() {
    const{isSpin,fetchallcontacts,contacts,setcontacts}=useContext(carContext)
    
    const [date, setdate] = useState(null)
    
    useEffect(() => {
        fetchallcontacts()
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
          <h4>Contacts</h4>
          <p style={{ color: "darkgrey" }}>
            You can check contacts below
          </p>
          {isSpin?(<div style={{textAlign:"center",marginBottom:"60px"}} ><Spinner  /></div>):
          (<table class="table">
            <thead className='thead-bg'>
        
              
                
                <th className='tables-heading-padding'  scope="col">Id</th>
                <th className='tables-heading-padding'  scope="col">Name</th>
                <th className='tables-heading-padding'  scope="col">Email</th>
                <th className='tables-heading-padding'  scope="col">Subject</th>
                <th className='tables-heading-padding'  scope="col">Message</th>
                <th className='tables-heading-padding'  scope="col"></th>
{/*                 
                <th scope="col">
                  <Button type="primary"  >
                    Add <PlusOutlined></PlusOutlined>
                  </Button>
                </th> */}
            
            </thead>
            <tbody>
                {contacts.map((contact,index)=>{
           return <tr >

                <td>
                {index+1}
                </td>
                <td>{contact.name}</td>
                
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>{contact.message}</td>
                
               
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

export default Contacts