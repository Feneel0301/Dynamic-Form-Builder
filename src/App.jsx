import { useState } from "react";
import { Button } from "antd";
import BuilderPanel from "./components/BuilderPanel";
import BuilderCanvas from "./components/BuilderCanvas";
import FieldSettings from "./components/FieldSettings";
import FormPreview from "./components/FormPreview";

export default function App() {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  // IMPORTANT: submissions stored here
  const [submissions, setSubmissions] = useState([]);

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div style={{ padding: 20 }}>
      <Button
        type="primary"
        onClick={() => setPreviewMode(!previewMode)}
        style={{ marginBottom: 20 }}
      >
        {previewMode ? "Back to Builder" : "Preview Form"}
      </Button>

      {!previewMode ? (
        <div style={{ display: "flex", gap: 20 }}>
          <BuilderPanel fields={fields} setFields={setFields} />

          <BuilderCanvas
            fields={fields}
            setFields={setFields}
            selectedFieldId={selectedFieldId}
            setSelectedFieldId={setSelectedFieldId}
          />

          <FieldSettings
            selectedField={selectedField}
            fields={fields}
            setFields={setFields}
          />
        </div>
      ) : (
        <FormPreview
          fields={fields}
          submissions={submissions}
          setSubmissions={setSubmissions}
        />
      )}
    </div>
  );
}
