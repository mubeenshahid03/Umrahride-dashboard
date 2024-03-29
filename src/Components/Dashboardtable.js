import React, { useEffect } from "react";
import { useContext } from "react";
import carContext from "../context/cars/carContext";
import { Tooltip } from "antd";
function Dashboardtable(props) {
  const { todayBookings } = useContext(carContext);

  useEffect(() => {
    console.log("From today bookigns");
    console.log(props.todaybookings);
  }, []);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };
  return (
    <>
      <table class="table">
        <thead className="thead-bg">
          <th className="tables-heading-padding" scope="col">
            #id
          </th>
          <th className="tables-heading-padding" scope="col">
            Name
          </th>
          <th className="tables-heading-padding" scope="col">
            Destination
          </th>
          <th className="tables-heading-padding" scope="col">
            whatsapp
          </th>
          <th className="tables-heading-padding" scope="col">
            total fare
          </th>
          <th className="tables-heading-padding" scope="col">
            pickup date
          </th>
          <th className="tables-heading-padding" scope="col">
            time
          </th>
        </thead>
        <tbody>
          {todayBookings.map((booking, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  {booking.user.name ? booking.user.name : booking.userid}
                </td>
                <td>
                  {booking.isPackage ? (
                    <Tooltip title={booking.pkg.description}>
                      <span>booking description</span>
                    </Tooltip>
                  ) : (
                    <span>
                      {booking.destination.from} to {booking.destination.to}
                    </span>
                  )}
                </td>

                <td>{booking.user?.phone}</td>
                <td>
                  {booking.isPackage
                    ? booking.pkg.price
                    : booking.pricing.price}
                </td>

                <td>{formatDate(booking.datepicker)}</td>

                <td>{formatTime(booking.datepicker)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Dashboardtable;
