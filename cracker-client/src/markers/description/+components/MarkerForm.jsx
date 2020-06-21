import React, { useCallback, useEffect } from "react";
import { useAddMarker } from "./../../+hooks/useAddMarker";
import { useRemoveMarker } from "./../../+hooks/useRemoveMarker";
import { Form, Input, Button } from "antd";

export const MarkerForm = ({ marker, reset }) => {
  const { name, latitude, longitude, description, _id } = marker;
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

  useEffect(() => form.resetFields(), [marker, form]);

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      form={form}
      onFinish={handleAddMarker}
      initialValues={{ name, latitude, longitude, description }}
    >
      <Form.Item name={["name"]} label="Name">
        <Input placeholder="name" />
      </Form.Item>
      <Form.Item name={["latitude"]} label="Latitude">
        <Input placeholder="latitude" />
      </Form.Item>
      <Form.Item name={["longitude"]} label="Longitude">
        <Input placeholder="longitude" />
      </Form.Item>
      <Form.Item name={["description", "polish"]} label="Polish description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={["description", "english"]} label="English description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        {isSavedMarker ? (
          <Button htmlType="button" onClick={handleDeleteMarker}>
            Delete
          </Button>
        ) : (
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
