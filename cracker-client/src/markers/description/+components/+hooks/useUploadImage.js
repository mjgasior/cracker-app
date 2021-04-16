import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";

const singleUploadQuery = loader("./singleUpload.gql");

export const useUploadImage = () => {
  const [uploadFile] = useMutation(singleUploadQuery);
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
