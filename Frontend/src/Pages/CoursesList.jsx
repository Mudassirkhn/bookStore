import React from "react";
import Navbar from "../components/Navbar";
import Courese from "../components/Course";
import Footer from "../components/Footer";

function Courses() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Courese />
      </div>
      <Footer />
    </>
  );
}

export default Courses;
