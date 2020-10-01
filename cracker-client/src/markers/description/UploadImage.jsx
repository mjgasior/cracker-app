import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`;

export const UploadImage = () => {
  const [uploadFile] = useMutation(SINGLE_UPLOAD_MUTATION);

  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
