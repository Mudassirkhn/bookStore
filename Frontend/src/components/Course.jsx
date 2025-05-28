import React from "react";
import list from "../../public/List.json";
import Cards from "../components/Cards"; // Adjust path if needed
import {Link} from "react-router-dom"
function Course() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Header Section */}
        <div className="mt-28 text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you <span className="text-pink-500">Here!</span>
          </h1>
          <p className="mt-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quidem eligendi ea qui in, quos voluptatum animi excepturi at aliquid reprehenderit quaerat explicabo eveniet officia.
          </p>
          <Link to="/">
          <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300 mt-6">
            Back
          </button></Link>
        </div>

        {/* Card Grid Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
