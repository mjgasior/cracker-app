import React, { useCallback } from "react";
import { useAddMarker } from "./../../+hooks/useAddMarker";
import { Form, Input, Button } from "antd";

export const MarkerForm = ({ marker }) => {
  const [form] = Form.useForm();
  const [addMarker] = useAddMarker();

  const handleAddMarker = useCallback(() => {
    addMarker({ variables: { position: [marker.latitude, marker.longitude] } });
  }, [addMarker, marker]);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      form={form}
    >
      <Form.Item label="Latitude">
        <Input placeholder="latitude" value={marker.latitude} />
      </Form.Item>
      <Form.Item label="Longitude">
        <Input placeholder="longitude" value={marker.longitude} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleAddMarker}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
