import React, { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import gql from "graphql-tag";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`;

export const UploadImage = () => {
  const { t } = useTranslation();
  const [uploadFile] = useMutation(SINGLE_UPLOAD_MUTATION);

  const onDrop = useCallback(
    ({ file }) => uploadFile({ variables: { file } }),
    [uploadFile]
  );

  return (
    <Dragger accept={"image/*"} multiple={false} customRequest={onDrop}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{t("upload_dragger")}</p>
      <p className="ant-upload-hint">{t("upload_dragger_hint")}</p>
    </Dragger>
  );
};
