import react, { useEffect, useState } from "react";
import carContext from "./carContext";
import { message } from "antd";

import { useNavigate } from "react-router-dom";
const CarState = (props) => {
    const navigate=useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const [cars, setcars] = useState([])
    const [isSpin, setisSpin] = useState(false)
    const [isModalOpen, setisModalOpen] = useState(false)
    const [ModalData, setModalData] = useState({})
    const [isAddCar, setisAddCar] = useState(false)
    const [admins, setadmins] = useState([])
    const [users, setusers] = useState([])
    const [packages, setpackages] = useState([])
    const [locations, setlocations] = useState([])
    const [contacts, setcontacts] = useState([])
    const [bookings, setbookings] = useState([])
    const [currentLocation, setcurrentLocation] = useState("/")
    const [isPkgModelOpen, setisPkgModelOpen] = useState(false)
    const [editAdminId, seteditAdminId] = useState()
    const [isAddAdminBtn, setisAddAdminBtn] = useState(false)
    const [editPkgId, seteditPkgId] = useState()
    const [editLocationId, seteditLocationId] = useState()
    const [todaysBooking, settodaysBooking] = useState([])
    const [latestBookings, setlatestBookings] = useState([])
    const [homeData, sethomeData] = useState([])
    const [packageBookings, setpackageBookings] = useState([])
    const [nonPackageBookings, setnonPackageBookings] = useState([])
    const [isViewModalOpen, setisViewModalOpen] = useState(false)
    const [isAddPkgfair, setisAddPkgfair] = useState(false)
    const [fairpkgs, setfairpkgs] = useState([])
    const [Imgmodal, setImgmodal] = useState(false)
    const [imgURL, setimgURL] = useState()
    const [cardData, setcardData] = useState([])
    const [todayBookings, settodayBookings] = useState([])
    const [fairLocations, setfairLocations] = useState([])
    const [destinations, setdestinations] = useState([])
// api request to fetch all vehicles
const fetchallvehicles = async () => {
  try {
    setisSpin(true)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/fetchallvehicles/123",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setcars(json);
    console.log("cars")
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchallvehicles" + error);
  }
};
// api request to fetch all admin
const fetchalladmins = async () => {
  try {
   setisSpin(true)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/auth/getallusers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setadmins(json)
   // console.log("cars")
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchalladmins" + error);
  }
};

// api request to fetch all users
const fetchallusers = async () => {
  try {
   setisSpin(true)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/auth/getusers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setusers(json)
   // console.log("cars")
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchallusers" + error);
  }
};

// api request to fetch all packages
const fetchallpackages = async () => {
  try {
   setisSpin(true)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/getallpackages",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setpackages(json)
   // console.log("cars")
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchallpackages" + error);
  }
};
// api request to fetch all locations
const fetchalllocations = async () => {
  try {
   setisSpin(true)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/getalllocations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setlocations(json)
   // console.log("cars")
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchalllocations" + error);
  }
};
// api request to fetch all contacts
const fetchallcontacts = async () => {
  try {
   setisSpin(true)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/fetchallcontacts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setcontacts(json)
   // console.log("cars")
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchallcontacts" + error);
  }
};
//http://localhost:7000/api/vehicles/getallbookings
// api request to fetch all bookings
const fetchallbookings = async () => {
  try {
   setisSpin(true)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/getallbookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setbookings(json)
    const pkgBookings = json.filter((booking) => booking.isPackage);
    const nonPKGBookings = json.filter((booking) => !booking.isPackage);
  
    setpackageBookings(pkgBookings)
  setnonPackageBookings(nonPKGBookings)
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchallbookings" + error);
  }
};

//fetchall sorted(descending order) booking
const fetchsortedbookings = async () => {
  try {
   setisSpin(true)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/getsortedbookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    
    console.log(json[0].todaybookings)
    console.log(json[0].cardData)
    setlatestBookings(json)
    setcardData(json[0].cardData)
    //settodayBookings(json[0].todaybookings)
    let tbookings = json.filter((booking) => {
      for (let index = 0; index < json[0].todaybookings.length; index++) {
        if (booking._id === json[0].todaybookings[index]._id) {
          return true;
        }
      }
      return false;
    });
    
    console.log(tbookings);
    settodayBookings(tbookings)
    // console.log("cars")
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchsortedbookings" + error);
  }
};
// fetching data for home cards
//http://localhost:7000/api/vehicles/gethomedata
// const fetchHomeData = async () => {
//   try {
//    setisSpin(true)
//     const response = await fetch(
//       "http://localhost:7000/api/vehicles/gethomedata",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     let json = await response.json();
//     console.log(json);
//     sethomeData(json)
//    // console.log("cars")
//     setisSpin(false)
    
//   } catch (error) {
//     console.log("error in frontend fetch home data" + error);
//   }
// };


///bellow are all the calls for adding and editing in modal

//1 for add an admin http://localhost:7000/api/auth/createuser
const addAdmin = async (name,email,password) => {
  try {
    console.log(name,email,password)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/auth/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email,password})
      }
    );
    let json = await response.json();
    console.log("from frontend ok ok o k")
     console.log(json);
     fetchalladmins();
     setisPkgModelOpen(false)
     setisAddAdminBtn(false)
      setisAddPkgfair(false)
    // //localStorage.setItem("jwtoken",json.authtoken)
  } catch (error) {
    console.log("error in frontend add admins" + error);
  }
};

//2 for editadmin http://localhost:7000/api/auth/edituser/_id
const editAdmin = async (name,email,password) => {
  try {
    console.log(name,email,password)
    const response = await fetch(
      `https://umrahride-dashboard-backend.vercel.app/api/auth/edituser/${editAdminId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email,password})
      }
    );
    let json = await response.json();
    console.log("from frontend editadmin")
     console.log(json);
     fetchalladmins();
     setisPkgModelOpen(false)
    

    // //localStorage.setItem("jwtoken",json.authtoken)
  } catch (error) {
    console.log("error in frontend edit admins" + error);
  }
};
//3 for add package http://localhost:7000/api/vehicles/addpackage
const addPackage = async (title,description,vehicleid,price) => {
  try {
    console.log(title,description,vehicleid)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/addpackage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title,description,vehicleid,price})
      }
    );
    let json = await response.json();
    console.log("from frontend addpackage")
     console.log(json);
    fetchallpackages()
     setisPkgModelOpen(false)
     setisAddAdminBtn(false)
        fetchPkgs()
    // //localStorage.setItem("jwtoken",json.authtoken)
  } catch (error) {
    console.log("error in frontend add package" + error);
  }
};


//4 for edit package http://localhost:7000/api/vehicles/editpkg/_id
const editPackage = async (title,description,vehicleid,price) => {
  //console.log(title,description,vehicleid)
  //console.log(editPkgId)
  try {
    const response = await fetch(
      `https://umrahride-dashboard-backend.vercel.app/api/vehicles/editpkg/${editPkgId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title,description,vehicleid,price})
      }
    );
    let json = await response.json();
    console.log("from frontend editpackage")
     console.log(json);
    fetchallpackages()
     setisPkgModelOpen(false)
     setisAddAdminBtn(false)
fetchPkgs()
    // //localStorage.setItem("jwtoken",json.authtoken)
  } catch (error) {
    console.log("error in frontend edit package" + error);
  }
};
// 5 for add location http://localhost:7000/api/vehicles/addlocations
const addLocation = async (vehicleid,destinationid,price) => {
  try {
    console.log(vehicleid,destinationid,price)
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/addlocations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleid,destinationid,price})
      }
    );
    let json = await response.json();
    console.log("from frontend addlocation")
     console.log(json);
    fetchalllocations()
     setisPkgModelOpen(false)
     setisAddAdminBtn(false)
setisAddPkgfair(false)
fetchParticularLocations()
    // //localStorage.setItem("jwtoken",json.authtoken)
  } catch (error) {
    console.log("error in frontend add location" + error);
  }
};

// 6 for edit location http://localhost:7000/api/vehicles/editlocation/:id
const editLocation = async (vehicleid,destinationid,price) => {
  //console.log(title,description,vehicleid)
  // console.log("hi",editLocationId)
  // console.log(vehicleid)
  try {
    const response = await fetch(
      `https://umrahride-dashboard-backend.vercel.app/api/vehicles/editlocation/${editLocationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({vehicleid,destinationid,price})
      }
    );
    let json = await response.json();
    //console.log("from frontend editpackage")
     console.log(json);
    fetchalllocations()
    fetchParticularLocations()
     setisPkgModelOpen(false)
     setisAddAdminBtn(false)

    // //localStorage.setItem("jwtoken",json.authtoken)
  } catch (error) {
    console.log("error in frontend edit package" + error);
  }
};


/// bellow are the calls for /carbookings in vehicle.js 
const fetchPkgs=async()=>{
        
  try {
  
    const response = await fetch(
      `https://umrahride-dashboard-backend.vercel.app/api/vehicles/fetchpkgsfair/${localStorage.getItem('selectedvehicleid')}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setfairpkgs(json.packages)
   // console.log("cars")
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchallpackages" + error);
  }


}
// bellow are the calls for /carlocations in vehicle.js
const fetchParticularLocations=async()=>{
        
  try {
  
    const response = await fetch(
      `https://umrahride-dashboard-backend.vercel.app/api/vehicles/fetchlocationsfair/${localStorage.getItem('selectedvehicleid')}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    console.log(json);
    setfairLocations(json.locationsWithDetails)
    
   
    setisSpin(false)
    
  } catch (error) {
    console.log("error in frontend fetchallLocations in fair locations" + error);
  }


}

const fetchdestinations = async () => {
  try {
    
    const response = await fetch(
      "https://umrahride-dashboard-backend.vercel.app/api/vehicles/fetchdestinations",
      {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }
    );
    let json = await response.json();
    console.log(json);
    console.log("above from fetchdestiantion")
    setdestinations(json)
    
  } catch (error) {
    console.log("error in frontend fetchdestinations" + error);
  }
};



  return (
    <carContext.Provider
    value={{
        collapsed,
        setCollapsed,
        fetchallvehicles,
        cars,
        setcars,
        isSpin,
        setisSpin,
        isModalOpen,
        setisModalOpen,
        ModalData,
        setModalData,
        isAddCar,
        setisAddCar,
        fetchalladmins,
        admins,
        setadmins,
        fetchallusers,
        users,
        setusers,
        fetchallpackages,
        packages,
        setpackages,
        fetchalllocations,
        locations,
        setlocations,
        fetchallcontacts,
        contacts,
        setcontacts,
        fetchallbookings,
        bookings,
        setbookings,
        currentLocation,
        setcurrentLocation,
        isPkgModelOpen,
        setisPkgModelOpen,
        addAdmin,
        editAdmin,
        editAdminId,
        seteditAdminId,
        isAddAdminBtn,
        setisAddAdminBtn,
        addPackage,
        editPackage,
        editPkgId,
        seteditPkgId,
        addLocation,
        editLocation,
        editLocationId, 
        seteditLocationId,
        setisSpin,
        todaysBooking,
        settodaysBooking,
        latestBookings,
        setlatestBookings,
        fetchsortedbookings,
        
        homeData,
        sethomeData,
        packageBookings,
        nonPackageBookings,
        isViewModalOpen,
        setisViewModalOpen,
        isAddPkgfair,
        setisAddPkgfair,
        fetchPkgs,
        fairpkgs,
        setfairpkgs,
        Imgmodal,
        setImgmodal,
        imgURL,
        setimgURL,
        
        todayBookings,
        settodayBookings,
        cardData,
        setcardData,
        fetchParticularLocations,
        fairLocations,
        setfairLocations,
        fetchdestinations,
        destinations,
        setdestinations
        
    }}>
      {props.children}
    </carContext.Provider>
  );
};
export default CarState;
