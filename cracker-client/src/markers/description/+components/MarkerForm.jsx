import React from "react";
import { Form, Input, Button } from "antd";

export const MarkerForm = ({ marker }) => {
  const [form] = Form.useForm();

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
        <Button type="primary">Save</Button>
      </Form.Item>
    </Form>
  );
};
