import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button } from "antd";
import { useAddMarker } from "./../../+hooks/useAddMarker";
import { useRemoveMarker } from "./../../+hooks/useRemoveMarker";

export const MarkerForm = ({ marker, reset }) => {
  const { t } = useTranslation();
  const { english, polish, latitude, longitude, _id } = marker;
  const isSavedMarker = _id !== undefined;

  const [form] = Form.useForm();
  const [addMarker] = useAddMarker();
  const [removeMarker] = useRemoveMarker();

  const handleAddMarker = useCallback(
    (newMarker) => {
      addMarker({ variables: { marker: newMarker } });
      reset();
    },
    [addMarker, reset]
  );

  const handleDeleteMarker = useCallback(() => {
    removeMarker({ variables: { id: _id } });
    reset();
  }, [removeMarker, reset, _id]);

  const handleUpdateMarker = useCallback(() => {
    console.log(form.getFieldsValue());
  }, [form]);

  useEffect(() => form.resetFields(), [marker, form]);

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      form={form}
      onFinish={handleAddMarker}
      initialValues={{ english, polish, latitude, longitude }}
    >
      <Form.Item name={["polish", "name"]} label={t("polish_name")}>
        <Input placeholder={t("polish_name")} />
      </Form.Item>
      <Form.Item name={["english", "name"]} label={t("english_name")}>
        <Input placeholder={t("english_name")} />
      </Form.Item>
      <Form.Item name={["latitude"]} label={t("latitude")}>
        <Input placeholder={t("latitude")} />
      </Form.Item>
      <Form.Item name={["longitude"]} label={t("longitude")}>
        <Input placeholder={t("longitude")} />
      </Form.Item>
      <Form.Item
        name={["polish", "description"]}
        label={t("polish_description")}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={["english", "description"]}
        label={t("english_description")}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        {isSavedMarker ? (
          <>
            <Button htmlType="button" onClick={handleDeleteMarker}>
              {t("delete")}
            </Button>
            <Button
              htmlType="button"
              type="primary"
              onClick={handleUpdateMarker}
            >
              {t("update")}
            </Button>
          </>
        ) : (
          <Button type="primary" htmlType="submit">
            {t("save")}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
