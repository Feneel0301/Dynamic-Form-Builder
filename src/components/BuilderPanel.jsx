import { Card, Button, Space } from "antd";

export default function BuilderPanel({ fields, setFields }) {
  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${type.toUpperCase()} Field`,
      placeholder: "",
      required: false,
      defaultValue: "",
      options:
        type === "dropdown" || type === "radio" || type === "checkbox"
          ? ["Option 1", "Option 2"]
          : [],
    };

    setFields((prev) => [...prev, newField]);
  };

  return (
    <div style={{ width: 260, padding: 16 }}>
      <Card title="Form Builder">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button block onClick={() => addField("text")}>
            Add Text
          </Button>

          <Button block onClick={() => addField("dropdown")}>
            Add Dropdown
          </Button>

          <Button block onClick={() => addField("checkbox")}>
            Add Checkbox
          </Button>

          <Button block onClick={() => addField("radio")}>
            Add Radio
          </Button>

          <Button block onClick={() => addField("title")}>
            Add Title
          </Button>
        </Space>
      </Card>
    </div>
  );
}
