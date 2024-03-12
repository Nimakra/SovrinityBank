import { FunctionComponent, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AllCourses from "../components/AllCourses";
import Breadcrumb from "../components/buttons/Breadcrumb";

const Courses = ({ backendActor }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [rectangleInputValue, setRectangleInputValue] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});

 
  /*useEffect(() => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(rectangleInputValue.toLowerCase())
    ).filter(course => {
      for (let filterKey in filters) {
        if (filters[filterKey].length > 0 && !filters[filterKey].includes(course[filterKey])) {
          return false;
        }
      }
      return true;
    });
    setFilteredCourses(filtered);
  }, [rectangleInputValue, courses, filters]); 
  useEffect(() => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(rectangleInputValue.toLowerCase())
    ).filter(course => {
      for (let filterKey in filters) {
        if (typeof filters[filterKey] === 'boolean' || typeof filters[filterKey] === 'string') {
          if (course[filterKey] !== filters[filterKey]) {
            return false;
          }
        } else if (filters[filterKey].length > 0 && !filters[filterKey].includes(course[filterKey])) {
          return false;
        }
      }
      return true;
    });
    setFilteredCourses(filtered);
  }, [rectangleInputValue, courses, filters]);*/

  useEffect(() => {
    const filtered = courses.filter(course => {
      // Filter by title
      if (!course.title.toLowerCase().includes(rectangleInputValue.toLowerCase())) {
        return false;
      }
  
      // Filter by other properties
      for (let filterKey in filters) {
        if (filters[filterKey] && course[filterKey] !== filters[filterKey]) {
          return false;
        }
      }
  
      return true;
    });
  
    setFilteredCourses(filtered);
  }, [rectangleInputValue, courses, filters]);

  useEffect(() => {
    getAllCourses();
  },[]);

  const getAllCourses = async () => {
    try {
      const courses = await backendActor.getAllCourses();
      setCourses(courses);
      setFilteredCourses(courses); // Update filteredCourses as well to ensure re-rendering
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  /*const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  }; */

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };


  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="relative bg-black1-200 min-h-screen overflow-hidden text-left text-[48px] md:text-[40px] text-dimgray-200 font-montserrat ">
      <Breadcrumb />
      <div className=" mx-auto max-w-[1270px] mt-10">
        <div className="font-medium text-white">Learn the fundamental skills that you need to get started with our specially curated online courses</div>
        <div className="mt-8 w-1/2 md:w-full flex flex-col items-center justify-center text-20 relative">
          <input
            className="border-none outline-none bg-gray-white self-stretch rounded-lg h-[52px] pl-4 pr-12 text-lg"
            placeholder="Search for course"
            type="text"
            style={{ fontSize: "18px" }}
            value={rectangleInputValue}
            onChange={(event) => setRectangleInputValue(event.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        {/*<AllCourses courses={courses} /> */}
        <AllCourses courses={courses} handleFilterChange={handleFilterChange} handleClearFilters={handleClearFilters} filteredCourses={filteredCourses}/>
      </div>

      <Header />
      <Footer />
    </div>
  );
};

export default Courses;
