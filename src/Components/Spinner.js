import { Spin } from "antd";
import React, { useContext } from "react";
import carContext from "../context/cars/carContext";
import { LoadingOutlined } from "@ant-design/icons";

function Spinner() {
  const context = useContext(carContext);
  const { isSpin } = context;

  return (
    <>
      <Spin
        className="custom-spinner"
        spinning={isSpin}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 54,
              margin:'auto'
            }}
            spin
          />
        }
      />
    </>
  );
}

export default Spinner;
