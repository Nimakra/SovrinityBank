import { useState } from "react";
import Pagination from "./Pagination";
import CourseFilter from "./CourseFilter";

type AllCoursesProps = {
  courses: any[];
  handleFilterChange: (event: any) => void;
  handleClearFilters: () => void;
  filteredCourses: any[]; 
};

const AllCourses: React.FC<AllCoursesProps> = ({
  courses,
  handleFilterChange,
  handleClearFilters,
  filteredCourses
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  // Filter the courses based on the filters state
/*const filteredCourses = courses.filter(course => {
  for (let filterKey in filters) {
    if (filters[filterKey] && course[filterKey] !== filters[filterKey]) {
      return false;
    }
  }
  return true; 
}); */

  const coursesPerPage = 12;
  // Calculate the courses to display for the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  //const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Update the current page
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" container grid grid-cols-2 gap-4 mt-10" style={{ gridTemplateColumns: '1fr 3fr' }}>
      <CourseFilter
        handleFilterChange={handleFilterChange}
        handleClearFilters={handleClearFilters}
      />

      <div>
        <h3 className="section-title">All Courses</h3>
        <div className="popular-courses-section grid grid-cols-3 gap-4">
          {currentCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>by {course.author}</p>
              <p> {course.level}</p>
              <p>by {course.plan}</p>
              {/* Add additional course details as needed */}
            </div>
          ))}
        </div>
      </div>
      <Pagination
        totalCourses={courses.length}
        coursesPerPage={coursesPerPage}
        paginate={handlePaginate}
      />
    </div>
  );
};

export default AllCourses;
