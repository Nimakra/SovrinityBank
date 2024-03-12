import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Breadcrumb from "../components/buttons/Breadcrumb";
import { v4 as uuidv4 } from "uuid";

const AddCourse = ({ backendActor }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [plan, setPlan] = useState("");
  const [level, setLevel] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  //-const navigate = useNavigate();
  //const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      // Call the backendActor method to add a new course
      const result = {
        id: uuidv4(),
        title,
        author,
        plan,
        level,
        url,
      };
      await backendActor.createCourse(result);

      console.log("Course added successfully!");
      setSuccessMessage("Course added successfully!");
      setTitle("");
      setAuthor("");
      setPlan("");
      setLevel("");
      setUrl("");
      /* setTimeout(() => {
          navigate("/courses");
        }, 1000); */
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-black1-200 min-h-screen overflow-hidden text-left text-[18px] md:text-[40px] text-dimgray-200 font-montserrat">
      <Breadcrumb />
      <section className=" mx-auto max-w-[1270px] px-8 mt-10">
        <div className="rounded-lg shadow-md font-montserrat">
          <h2 className="font-bold mb-4">Add New Course</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-4 md:grid-cols-2 text-white"
          >
            <div className="mb-4 ">
              <label htmlFor="title" className="block">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-3/4 mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter the course title"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="author" className="block">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-3/4 mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter the author's name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="plan" className="block">
                Plan
              </label>
              <select
                id="plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-3/4 mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select a plan
                </option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="level" className="block">
                Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-3/4 mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select a level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="url" className="block">
                Url
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-3/4 mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter the url of the course"
              />
            </div>

            {successMessage && (
              <div className="text-green-500 mb-4">
                <p>{successMessage}</p>
              </div>
            )}
            {error && (
              <div className="text-red-500 mb-4">
                <p>Error: {error}</p>
              </div>
            )}

            <div className="mb-4">
              <button
                type="submit"
                className="w-2/5 mt-7 bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Course"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Header />
      <Footer />
    </div>
  );
};

export default AddCourse;
