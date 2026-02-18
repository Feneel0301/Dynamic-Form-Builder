import { Card, Form, Button } from "antd";
import FieldRenderer from "./FieldRenderer";

export default function DynamicForm({ fields, setResponses }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Get existing responses
    const existing = JSON.parse(localStorage.getItem("formResponses")) || [];

    // Add new submission
    const updated = [...existing, values];

    // Save to localStorage
    localStorage.setItem("formResponses", JSON.stringify(updated));

    // Update state
    setResponses(updated);

    // Reset form
    form.resetFields();
  };

  return (
    <Card title="Form Preview">
      {fields.length === 0 ? (
        <p>No fields added yet</p>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {fields.map((field) => (
            <FieldRenderer key={field.id} field={field} />
          ))}

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </Card>
  );
}
