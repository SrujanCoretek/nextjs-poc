"use client";

import { NftInput } from "@/src/utils/ui";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToIpfs } from "./createServerFunctions";

import { acceptedTypes } from "@/src/utils/constants";
import { INPUT_LABEL } from "@/src/styles/theme";

const NftCreate = () => {
  let isDark = false;
  const inputFileRef = useRef<any>(null);
  const [fileObject, setFileObject] = useState(null);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<NftInput>();

  const fileUploadHandler = async (event: any) => {
    if (event.target.files.length) {
      setValue("file", null);
      clearErrors("file");
      // update({ fileUploadLoader: true });
      setValue("mimeType", "");
      try {
        const file = event.target.files[0];
        // update({ fileObject: file });
        setFileObject(file);

        if (file.type.includes("image")) {
          setValue("file", file);
          setValue("mimeType", file.type);
        } else {
          // toast.error("Only image files are accepted");
          throw new Error("Only image files are accepted");
        }
      } catch (error) {
        // Intentionally empty
      } finally {
        // update({ fileUploadLoader: false });
      }
    }
  };

  async function onSubmit(data: any) {
    const { title, description, file } = data;
    console.log(data);
    console.log({ file });

    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadToIpfs(formData);
    console.log({ result });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative h-auto p-10 text-center flex flex-col gap-8 my-20">
          <span className="text-sm md:text-lg text-gray-500 font-bold block">
            PNG, GIF, WEBP, MP4 or MP3, Max 100mb
          </span>
          <div className="flex justify-center">
            <div
              className="bg-gradient-to-r from-[#73e8f4] via-[#441af5] to-[#E18D9F] p-1 rounded-full cursor-pointer"
              onClick={() => inputFileRef.current?.click()}
            >
              <div
                className={`px-20 ${
                  isDark ? "bg-[#14215D]" : "bg-white"
                } text-sm py-2 rounded-full`}
              >
                <div className="flex flex-col items-center text-slate-500 font-bold">
                  Choose file
                </div>
                <input
                  type="file"
                  className="h-full w-full hidden"
                  {...register("file", {
                    required: "File is required",
                  })}
                  name="nftFile"
                  ref={inputFileRef}
                  accept={acceptedTypes.toString()}
                  onChange={fileUploadHandler}
                />
              </div>
            </div>
          </div>
          <span className="text-center relative w-full">
            <span className="text-red-600 text-sm -bottom-5 left-0">
              {errors.file?.message}
            </span>
          </span>
        </div>
        {/* <div
          className={` rounded-xl overflow-hidden flex gap-4 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
        >
          <input
            type="text"
            className="border-2 rounded-md px-2 py-2"
            placeholder="title"
            {...register("title", {
              required: "Please enter title.",
            })}
          />

          <span className="text-red-500 text-sm absolute  -bottom-5 left-2">
            {errors.title?.message}
          </span>
        </div>

        <div
          className={` rounded-xl overflow-hidden flex gap-4 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
        >
          <input
            type="text"
            className="border-2 rounded-md px-2 py-2"
            placeholder="description"
            {...register("description", {
              required: "Please enter your description.",
            })}
          />

          <span className="text-red-500 text-sm absolute  -bottom-5 left-2">
            {errors.description?.message}
          </span>
        </div> */}
        <div className="w-full h-full col-span-2 lg:col-span-1 md:order-4 lg:order-4 px-3 md:px-3">
          <div className="w-full my-2 relative">
            <input
              placeholder="Title"
              className=""
              {...register("title", {
                required: "Title is required",
                pattern: {
                  value: /^(?=.*\S).*$/,
                  message: "Title is required",
                },
              })}
            />
            <span>{errors.title?.message}</span>
          </div>
          <div className="w-full mt-8 flex flex-col relative">
            <span className={`${INPUT_LABEL} ${isDark && "text-white"}`}>
              <label htmlFor="description">Description</label>
            </span>
            <textarea
              rows={3}
              className={`${
                isDark && "bg-[#14215D]"
              } w-full text-xl border-b-2 h-24 outline-none transition duration-200 overflow-none focus:outline-none mt-6 font-light ${
                isDark
                  ? "text-white focus:border-gray-400 hover:border-gray-700"
                  : "text-black focus:border-black hover:border-black"
              }`}
              id="description"
              placeholder="e.g. “You’ll also get exclusive event access”"
              {...register("description", {
                required: "Description is required",
                pattern: {
                  value: /^(?=.*\S).*$/,
                  message: "Description is required",
                },
              })}
            />

            <span>{errors.description?.message} </span>
          </div>
        </div>
        <button type="submit" className="bg-red-500">
          Create NFT{" "}
        </button>
      </form>
    </div>
  );
};

export default NftCreate;
