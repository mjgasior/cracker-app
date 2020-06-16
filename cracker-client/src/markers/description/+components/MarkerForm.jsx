import React, { useCallback } from "react";
import { useAddMarker } from "./../../+hooks/useAddMarker";
import { useRemoveMarker } from "./../../+hooks/useRemoveMarker";
import { Form, Input, Button } from "antd";

export const MarkerForm = ({ marker, reset }) => {
  const { latitude, longitude, id } = marker;
  const isSavedMarker = id !== undefined;

  const [form] = Form.useForm();
  const [addMarker] = useAddMarker();
  const [removeMarker] = useRemoveMarker();

  const handleAddMarker = useCallback(() => {
    addMarker({ variables: { position: [marker.latitude, marker.longitude] } });
    reset();
  }, [addMarker, marker, reset]);

  const handleDeleteMarker = useCallback(() => {
    removeMarker({ variables: { id } });
    reset();
  }, [removeMarker, reset]);

  const onFinish = (vvv) => console.log(vvv);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      form={form}
      onFinish={onFinish}
      fields={[
        {
          name: ["latitude"],
          value: latitude,
        },
        {
          name: ["longitude"],
          value: longitude,
        },
      ]}
    >
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
