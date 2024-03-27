import { useAuth } from "../../components/hooks/ContextWrapper";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";


interface FormInputs {
  username: string;
  handle: string;
}

const Register = ({ showRegModal, setShowRegModal, handleRegister, saving }) => {
  const { backendActor } = useAuth();
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<FormInputs>();

  useEffect(() => {
    const getUsers = async () => {
      const result = await backendActor.getAllUsers();
      setUsers(result);
    };
    getUsers();
  }, []);

  const checkHandleExists = (e: any) => {
    const handle = e.target.value;
    setValue("handle", handle);
    if (
      users.some(
        (user) => user.handle.toLowerCase() === e.target.value.toLowerCase()
      )
    ) {
        setError("handle", {
            type: "manual",
            message: "Handle already exists",
          });
          setValue("handle", ""); 
    } else {
        clearErrors("handle");
    }
  };

  return (
    <Modal
      isOpen={showRegModal}
      onRequestClose={() => setShowRegModal(false)}
      shouldCloseOnOverlayClick={false}
      contentLabel="User Info Modal"
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
        content: {
          position: "absolute",
          width: "95%",
          maxWidth: "420px",
          top: "50%",
          left: "50%",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ccc",
          background: "#fff",
          borderRadius: "20px",
          padding: "0",
          boxShadow: "0 0px 20px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <button
        onClick={() => setShowRegModal(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          zIndex: 1000,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className=" flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="py-12 px-12 bg-white font-montserrat w-full sm:w-auto "
        >
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Welcome to Sovrinity Bank!
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Let's get started by setting up your account details
            </p>
          </div>
          <div className="items-center">
            <div className="mb-6">
              <label
                htmlFor="username"
                className="mb-3 text-sm1 tracking-wide text-gray-600"
              >
                Username:
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
                className="block text-sm py-3 px-4 rounded-2xl w-full border border-black border-solid  outline-blue-500"
                style={{ boxSizing: "border-box" }}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="handle"
                className="mb-3 text-sm1 tracking-wide text-gray-600"
              >
                Surname:
              </label>
              <input
                id="handle"
                type="text"
                {...register("handle", { required: true })}
                onBlur={checkHandleExists}
                className={`block text-sm py-3 px-4 rounded-2xl w-full border border-black border-solid  outline-blue-500 ${errors.handle ? 'border-red-500' : ''}`}
                style={{ boxSizing: "border-box" }}
                required
              />
              {errors.handle && <p className="text-red-500">{errors.handle.message}</p>}
            </div>
          </div>
          <div className="text-center">
            <button
              className="w-full py-2 text-xl text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all"
              type="submit"
            >
              {saving ? (
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
                  <span>Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
            <p className="mt-4 text-sm">
              Agree to Terms and Conditions?{" "}
              <span className="underline  cursor-pointer"> Sign In</span>
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Register;
