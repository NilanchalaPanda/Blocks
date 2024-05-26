"use client";

import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FileUpload = ({ setImages }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (e) => {
    try {
      const newfiles = Array.from(e.target.files);
      console.log(newfiles);

      const combinedFiles = [...fileList, ...newfiles];
      console.log(combinedFiles);
      setFileList(combinedFiles);
      console.log(fileList);
      setImages(combinedFiles);

      const images = Array.from(newfiles).map((file) =>
        URL.createObjectURL(file)
      );

      console.log("PREVIEW -", previewImages);
      setPreviewImages((prevImages) => [...prevImages, ...images]);
    } catch (err) {
      console.log(err);
    } finally {
      setFileList([]);
    }
  };

  const handleRemoveImage = (e, image) => {
    e.preventDefault();
    setPreviewImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud color="gray" size={35} />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpg, image/jpeg, image/svg, image/gif"
          />
        </label>
      </div>
      <div className="px-4 pt-5 grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-10 gap-3">
        {previewImages.map((image) => (
          <div key={image} className="relative">
            <Image
              src={image}
              alt={`image`}
              width={100}
              height={100}
              className="rounded-sm border border-black"
            />
            <button
              type="button"
              onClick={(e) => handleRemoveImage(e, image)}
              className="bg-red-300 p-[1px] rounded-sm absolute -top-2 -right-2 hover:cursor-pointer lg:p-[3px] ld:rounded-lg"
            >
              <X size={15} color="red" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
