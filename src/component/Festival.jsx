import React from "react";
import Location from "./Location";
import Banner from "./Banner";

const Festival = () => {
  return (
    <div className="festival_container" style={{ marginTop: "20px" }}>
      <Banner />
      <h4 className="festival">진행중인행사</h4>
      <Location />
    </div>
  );
};

export default Festival;
