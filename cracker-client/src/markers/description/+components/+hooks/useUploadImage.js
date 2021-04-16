import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($id: ID, $file: Upload!) {
    singleUpload(id: $id, file: $file)
  }
`;

export const useUploadImage = () => {
  const [uploadFile] = useMutation(SINGLE_UPLOAD_MUTATION);
  const history = useHistory();

  return useCallback(
    async (id, file) => {
      const isDone = await uploadFile({ variables: { id, file } });
      if (isDone) {
        history.go(0);
      }
      return isDone;
    },
    [uploadFile, history]
  );
};
