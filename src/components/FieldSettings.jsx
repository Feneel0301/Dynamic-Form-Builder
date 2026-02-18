import { Card, Input, Button, Space, Switch } from "antd";

export default function FieldSettings({ selectedField, fields, setFields }) {
  const updateField = (key, value) => {
    const updatedFields = fields.map((field) =>
      field.id === selectedField.id ? { ...field, [key]: value } : field,
    );
    setFields(updatedFields);
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...selectedField.options];
    updatedOptions[index] = value;
    updateField("options", updatedOptions);
  };

  const addOption = () => {
    updateField("options", [...selectedField.options, "New Option"]);
  };

  if (!selectedField) {
    return (
      <div style={{ width: 300 }}>
        <Card title="Field Settings">
          <p>Select a field to edit</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ width: 300 }}>
      <Card title="Field Settings">
        {/* Label */}
        <div style={{ marginBottom: 16 }}>
          <label>Label</label>
          <Input
            value={selectedField.label}
            onChange={(e) => updateField("label", e.target.value)}
          />
        </div>

        {/* Required Toggle */}
        <div style={{ marginBottom: 16 }}>
          <label>Required</label>
          <br />
          <Switch
            checked={selectedField.required}
            onChange={(checked) => updateField("required", checked)}
          />
        </div>

        {/* Placeholder */}
        {selectedField.type === "text" && (
          <div style={{ marginBottom: 16 }}>
            <label>Placeholder</label>
            <Input
              value={selectedField.placeholder || ""}
              onChange={(e) => updateField("placeholder", e.target.value)}
            />
          </div>
        )}

        {/* Default Value */}
        {selectedField.type === "text" && (
          <div style={{ marginBottom: 16 }}>
            <label>Default Value</label>
            <Input
              value={selectedField.defaultValue || ""}
              onChange={(e) => updateField("defaultValue", e.target.value)}
            />
          </div>
        )}

        {/* Options */}
        {(selectedField.type === "dropdown" ||
          selectedField.type === "radio" ||
          selectedField.type === "checkbox") && (
          <div>
            <label>Options</label>

            <Space direction="vertical" style={{ width: "100%" }}>
              {selectedField.options.map((opt, index) => (
                <Input
                  key={index}
                  value={opt}
                  onChange={(e) => updateOption(index, e.target.value)}
                />
              ))}
            </Space>

            <Button style={{ marginTop: 10 }} onClick={addOption} block>
              Add Option
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
