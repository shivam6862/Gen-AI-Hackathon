"use client";
import React from "react";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import classes from "@/styles/UploadFiles.module.css";
import { FaRegFilePdf } from "react-icons/fa";
import { useNotification } from "@/hooks/useNotification";

type upload_file = {
  id: string;
  file: Object;
  name: string;
};

type UploadFilesProps = {
  upload_files: upload_file[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const UploadFiles: React.FC<UploadFilesProps> = ({
  upload_files,
  setFormData,
}) => {
  const { NotificationHandler } = useNotification();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
      const invalidFiles = Array.from(fileList).filter(
        (file) => !allowedFileTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        NotificationHandler(
          "Custom ChatBot",
          "Only .jpg, .jpeg, .png, .pdf files are allowed",
          "Error"
        );
        return;
      }
    }

    const newFileList: any = [
      ...upload_files.map((file) => file.file),
      ...Array.from(fileList || []),
    ];

    const totalSize: number = Array.from(newFileList).reduce(
      (acc: number, file: any) => acc + file?.size,
      0
    );

    const totalSizeInMB: number = totalSize / 1024 / 1024;
    if (totalSizeInMB > 2) {
      NotificationHandler(
        "Custom ChatBot",
        "File size should be less than 2MB",
        "Error"
      );
      return;
    }

    if (fileList) {
      setFormData((prevData: any) => ({
        ...prevData,
        upload_files: [
          ...prevData.upload_files,
          ...Array.from(fileList).map((file) => ({
            id: file.name,
            file: file,
            name: file.name,
          })),
        ],
      }));
    }
  };

  return (
    <div className={classes["container"]}>
      {upload_files.length > 0 && (
        <div className={classes["all-uploaded-file"]}>
          <div className={classes.fileList}>
            {upload_files.map((file, index) => (
              <div key={file.id + index} className={classes.fileListItem}>
                <Link
                  href={URL.createObjectURL(file.file as Blob)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.name}
                </Link>
                <RxCross2
                  onClick={() => {
                    setFormData((prevData: any) => ({
                      ...prevData,
                      upload_files: prevData.upload_files.filter(
                        (item: any) => item.id !== file.id
                      ),
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <form className={classes["form-group"]}>
        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput">
          <FaRegFilePdf />
        </label>
      </form>
    </div>
  );
};

export default UploadFiles;
