import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`;

export const UploadImage = () => {
  const [uploadFile] = useMutation(SINGLE_UPLOAD_MUTATION);

  const onDrop = useCallback(
    ([file]) => {
      console.log(file);
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );

  const onDrop2 = useCallback(
    ({ file }) => {
      console.log(file);
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <Dragger accept={"image/*"} multiple={false} customRequest={onDrop2}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </>
  );
};
