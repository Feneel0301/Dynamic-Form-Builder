import {
  Card,
  Input,
  Select,
  Checkbox,
  Radio,
  Typography,
  Button,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function BuilderCanvas({
  fields,
  setFields,
  selectedFieldId,
  setSelectedFieldId,
}) {
  const handleDragStart = (index) => {
    event.dataTransfer.setData("dragIndex", index);
  };

  const handleDrop = (dropIndex) => {
    const dragIndex = event.dataTransfer.getData("dragIndex");

    const updated = [...fields];
    const draggedItem = updated[dragIndex];

    updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, draggedItem);

    setFields(updated);
  };

  const deleteField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div style={{ flex: 1, padding: 20 }}>
      <h2>Form Canvas (Drag to reorder)</h2>

      {fields.map((field, index) => (
        <Card
          key={field.id}
          draggable
          onDragStart={(e) => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(index)}
          onClick={() => setSelectedFieldId(field.id)}
          style={{
            marginBottom: 12,
            cursor: "grab",
            border:
              selectedFieldId === field.id
                ? "2px solid #1677ff"
                : "1px solid #ddd",
          }}
        >
          {field.type === "title" ? (
            <Title level={4}>{field.label}</Title>
          ) : (
            <>
              <label>{field.label}</label>

              {field.type === "text" && <Input disabled />}
              {field.type === "dropdown" && (
                <Select disabled style={{ width: "100%" }} />
              )}
              {field.type === "checkbox" && <Checkbox disabled />}
              {field.type === "radio" && <Radio disabled />}
            </>
          )}

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              deleteField(field.id);
            }}
            style={{ marginTop: 10 }}
          />
        </Card>
      ))}
    </div>
  );
}
