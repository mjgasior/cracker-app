import React from "react";
import { Form, Input, Button } from "antd";

export const MarkerForm = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
      >
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
