import React from 'react';

const Pagination = ({ totalCourses, coursesPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;


/*import React from 'react';

const AllCourses = ({ courses }) => {
  // Define number of courses per page
  const coursesPerPage = 12; // 3 courses per row * 4 rows

  // State to keep track of current page
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate index of courses to display based on current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Function to handle page navigation
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="popular-courses-section flex flex-col mt-20">
      <h3 className="section-title">All Courses</h3>
      <div className="courses-container">
        {currentCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>by {course.author}</p>
            {/* Add additional course details as needed 
            </div>
            ))}
          </div>
          {/* Pagination 
          <div className="pagination">
            {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      );
    };
    
    export default AllCourses; */
        