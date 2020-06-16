import React, { useCallback } from "react";
import { useAddMarker } from "./../../+hooks/useAddMarker";
import { useRemoveMarker } from "./../../+hooks/useRemoveMarker";
import { Form, Input, Button } from "antd";

export const MarkerForm = ({ marker, reset }) => {
  const { latitude, longitude, id } = marker;

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

  const isSavedMarker = id !== undefined;

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      form={form}
    >
      <Form.Item label="Latitude">
        <Input placeholder="latitude" value={latitude} />
      </Form.Item>
      <Form.Item label="Longitude">
        <Input placeholder="longitude" value={longitude} />
      </Form.Item>
      <Form.Item>
        {isSavedMarker ? (
          <Button onClick={handleDeleteMarker}>Delete</Button>
        ) : (
          <Button type="primary" onClick={handleAddMarker}>
            Save
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
