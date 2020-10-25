import React, { useCallback } from "react";

import { useTranslation } from "react-i18next";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useUploadImage } from "./+hooks/useUploadImage";

const { Dragger } = Upload;

export const UploadImage = ({ marker }) => {
  const { t } = useTranslation();
  const uploadFile = useUploadImage();

  const onDrop = useCallback(
    async ({ file, onSuccess }) => {
      const isDone = await uploadFile(marker._id, file);
      if (isDone) {
        onSuccess("Ok");
      }
    },
    [uploadFile, marker]
  );

  if (marker._id) {
    return (
      <div>
        <Dragger accept={"image/*"} multiple={false} customRequest={onDrop}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{t("upload_dragger")}</p>
          <p className="ant-upload-hint">{t("upload_dragger_hint")}</p>
        </Dragger>
      </div>
    );
  }
  return null;
};
