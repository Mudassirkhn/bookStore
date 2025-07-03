import React from "react";
import Navbar from "../../website/components/Navbar";
import Courese from "../../website/components/Course";
import Footer from "../../website/components/Footer";

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
