//import React, { useState } from "react";
import {Link} from "react-router-dom";

const FeaturedCourses = ({ searchValue }: { searchValue: string }) => {
  // Placeholder content for now
  const featuredCourses = [
    { id: 1, title: "TypeScript Smart Contract 101", author: "Dacade" },
    { id: 2, title: "Rust Smart Contract 101", author: "Dacade" },
    { id: 3, title: "Blockchain: Understanding Its Uses and Implications", author: "LinuxFoundationX" },
    { id: 4, title: "Introduction to Hyperledger Blockchain Technologies", author: "LinuxFoundationX" },   
  ];

  const filteredCourses = featuredCourses.filter((course) =>
    course.id.toString().includes(searchValue)
  );

  return (
     <section className="popular-courses-section flex flex-col mt-20">
      <h3 className="section-title">Featured Courses</h3>
      <div className="courses-container">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>by {course.author}</p>
            {/* Add additional course details as needed */}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-5">
      <div className="explore-more-button">
        <Link to="/courses">
        <button className="cursor-pointer [border:none]  px-4 py-2 p-4 rounded-lg bg-blue-600 hover:bg-blue-700">
            <div className=" text-lg font-raleway font-semibold text-white text-left">
                  Explore More Courses
            </div>
        </button>
        </Link>      
      </div>
      <div className="add-courses-button">
        <Link to="/addCourses">
        <button className="cursor-pointer [border:none]  px-4 py-2 p-4 rounded-lg bg-blue-600 hover:bg-blue-700 ">
            <div className=" text-lg font-raleway font-semibold text-white text-left">
                  Add Courses
            </div>
        </button>
        </Link>      
      </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;