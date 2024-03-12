import { useState } from "react";

const filters = [
  {
    title: "Plans",
    items: [
      { id: "free", name: "Free" },
      { id: "paid", name: "Paid" },
    ],
  },
  {
    title: "Level",
    items: [
      { id: "beginner", name: "Beginner" },
      { id: "intermediate", name: "Intermediate" },
      { id: "advanced", name: "Advanced" },
    ],
  },
];

const CourseFilter = ({ handleFilterChange, handleClearFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  /*const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters({ ...selectedFilters, [name]: checked });
    handleFilterChange({ ...selectedFilters, [name]: checked });
  }; */

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [name]: checked };
      handleFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <section className="sidebar text-[16px] ">
     <div className="flex justify-start items-center gap-4"> 
      <h3 className=" text-dimgray-400 text-[28px]">Filter by</h3>
      <button onClick={handleClearFilters} className="text-dimgray-400 cursor-pointer font-semibold [border:none] bg-transparent hover:text-whitesmoke-200 ">Clear Filters</button>
      </div>
      <div className="text-white">
        {filters.map((filter) => (
          <div key={filter.title}>
            <h5 className="font-bold uppercase pt-2">{filter.title}</h5>
            {filter.items.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={item.id}
                  name={item.id}
                  checked={selectedFilters[item.id]}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={item.id}>{item.name}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseFilter;
