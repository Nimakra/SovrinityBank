import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Breadcrumb from "../components/buttons/Breadcrumb";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../components/hooks/ContextWrapper";

const AddBlogs = () => {
  const { backendActor, identity, isAdmin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const id = uuidv4();

      const newData = { ...data, id };

      // Call the backendActor method to add a new blog
      await backendActor.createBlog(newData);
      console.log("Blog added successfully!");
      setSuccessMessage("Blog added successfully!");
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-black1-200 min-h-screen overflow-hidden text-left text-[18px] md:text-[40px] text-white font-montserrat">
      <Breadcrumb />
      <section className="mx-auto max-w-[1270px] px-8 mt-10  ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2  rounded-lg shadow-md px-20 text-white"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Add Blog</h2>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                {...register("image", { required: true })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="image"
                type="file"
              />
              {errors.image && (
                <p className="text-red-500 text-xs italic">
                  Please upload an image.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                {...register("title", { required: true })}
                className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="title"
                type="text"
                placeholder="Blog title"
              />
              {errors.title && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="introduction"
              >
                Introduction
              </label>
              <textarea
                {...register("introduction", { required: true })}
                className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="introduction"
                placeholder="Blog introduction"
              />
              {errors.introduction && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="body"
              >
                Body
              </label>
              <textarea
                {...register("body", { required: true })}
                className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="body"
                placeholder="Blog body"
              />
              {errors.body && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                {...register("date", { required: true })}
                className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="date"
                type="date"
              />
              {errors.date && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="author"
              >
                Author
              </label>
              <input
                {...register("author", { required: true })}
                className="appearance-none block w-full bg-gray-200  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="author"
                type="text"
                placeholder="Author's name"
              />
              {errors.author && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>
          {/* Repeat the above block for each field: image, introduction, body, date, author */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
        </form>
      </section>
      <Header />
      <Footer />
    </div>
  );
};

export default AddBlogs;
