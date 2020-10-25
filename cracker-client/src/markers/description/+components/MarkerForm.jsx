import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, notification } from "antd";

export const MarkerForm = ({
  isAllowed,
  marker,
  onDeleteMarker,
  onCreateMarker,
  onUpdateMarker,
}) => {
  const { t, i18n } = useTranslation();
  const { english, polish, latitude, longitude, _id } = marker;
  const isSavedMarker = _id !== undefined;

  const [form] = Form.useForm();

  const handleAddMarker = useCallback(
    async (newMarker) => {
      await onCreateMarker(newMarker);

      const title = setTitle(newMarker, i18n, t("saved"));
      openNotification(title, t("saved_marker"));
    },
    [onCreateMarker, i18n, t]
  );

  const handleDeleteMarker = useCallback(async () => {
    const fieldsValues = form.getFieldsValue();

    await onDeleteMarker(_id);

    const title = setTitle(fieldsValues, i18n, t("deleted"));
    openNotification(title, t("deleted_marker"));
  }, [onDeleteMarker, t, i18n, form, _id]);

  const handleUpdateMarker = useCallback(async () => {
    const fieldsValues = form.getFieldsValue();

    await onUpdateMarker(_id, fieldsValues);

    const title = setTitle(fieldsValues, i18n, t("updated"));
    openNotification(title, t("updated_marker"));
  }, [onUpdateMarker, t, i18n, form, _id]);

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
      {isAllowed && (
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
      )}
    </Form>
  );
};

const openNotification = (message, description) => {
  notification.info({
    message,
    description,
    placement: "bottomRight",
  });
};

const setTitle = (marker, i18n, actionLabel) => {
  let name = marker.polish.name;
  if (i18n.language === "en") {
    name = marker.english.name;
  }

  return `${actionLabel} ${name}`;
};
