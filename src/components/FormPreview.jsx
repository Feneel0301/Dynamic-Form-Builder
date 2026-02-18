import { Form, Input, Button, Card, Typography, Select, Checkbox, Radio } from "antd";

const { Title, Text } = Typography;

export default function FormPreview({ fields, submissions, setSubmissions }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // Create submission snapshot (IMPORTANT FIX)
    const submission = {
      id: Date.now(),
      submittedAt: new Date().toLocaleString(),
      fields: fields.map((field) => ({
        id: field.id,
        label: field.label, // snapshot label
        value: values[field.id] || "",
      })),
    };

    setSubmissions((prev) => [submission, ...prev]);
    form.resetFields();
  };

  const renderFieldInput = (field) => {
    switch (field.type) {
      case "text":
        return <Input placeholder={field.placeholder || "Enter text"} />;

      case "dropdown":
        return (
          <Select placeholder="Select option">
            {(field.options || []).map((opt, i) => (
              <Select.Option key={i} value={opt}>
                {opt}
              </Select.Option>
            ))}
          </Select>
        );

      case "checkbox":
        return (
          <Checkbox.Group
            options={(field.options || []).map((opt) => ({
              label: opt,
              value: opt,
            }))}
          />
        );

      case "radio":
        return (
          <Radio.Group>
            {(field.options || []).map((opt, i) => (
              <Radio key={i} value={opt}>
                {opt}
              </Radio>
            ))}
          </Radio.Group>
        );

      default:
        return <Input />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 24,
        padding: 20,
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* FORM SECTION */}
      <div style={{ width: "600px" }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Title level={3}>Preview Form</Title>

          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            {fields.map((field) => {
              if (field.type === "title") {
                return (
                  <Title key={field.id} level={4}>
                    {field.label}
                  </Title>
                );
              }

              return (
                <Form.Item
                  key={field.id}
                  label={field.label}
                  name={field.id}
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  {renderFieldInput(field)}
                </Form.Item>
              );
            })}

            {fields.length > 0 && (
              <Button type="primary" htmlType="submit" block size="large">
                Submit
              </Button>
            )}
          </Form>
        </Card>
      </div>

      {/* SUBMISSIONS SECTION */}
      <div style={{ width: "400px" }}>
        <Title level={4}>Submissions</Title>

        {submissions.length === 0 && (
          <Text type="secondary">No submissions yet</Text>
        )}

        {submissions.map((submission) => (
          <Card
            key={submission.id}
            style={{ marginBottom: 16, borderRadius: 10 }}
          >
            {submission.fields.map((field) => (
              <p key={field.id}>
                <Text strong>{field.label}:</Text>{" "}
                {Array.isArray(field.value)
                  ? field.value.join(", ")
                  : field.value}
              </p>
            ))}

            <Text type="secondary">
              Submitted at: {submission.submittedAt}
            </Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
