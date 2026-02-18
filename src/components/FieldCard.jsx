import { Card } from "antd";

export default function FieldCard({ field, isSelected, onSelect }) {
  return (
    <Card
      onClick={onSelect}
      style={{
        marginBottom: 10,
        cursor: "pointer",
        border: isSelected ? "2px solid #1677ff" : "1px solid #ddd"
      }}
    >
      <strong>{field.label}</strong>
      <div style={{ fontSize: 12, color: "#888" }}>
        Type: {field.type}
      </div>
    </Card>
  );
}
