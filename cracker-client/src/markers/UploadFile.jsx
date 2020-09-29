import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export const UploadFile = () => {
  const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION);
  const apolloClient = useApolloClient();

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    console.log("A new file");
    console.log(file);
    return (
      validity.valid &&
      uploadFileMutation({ variables: { file } }).then(() => {
        apolloClient.resetStore();
      })
    );
  };

  return <input type="file" required onChange={onChange} />;
};
