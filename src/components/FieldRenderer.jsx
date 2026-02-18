import { Form, Input, Select, Checkbox, Radio, Typography } from "antd";

const { Title } = Typography;

export default function FieldRenderer({ field }) {
  const { type, label, options } = field;

  switch (type) {
    case "text":
      return (
        <Form.Item name={label} label={label}>
          <Input placeholder={`Enter ${label}`} />
        </Form.Item>
      );

    case "dropdown":
      return (
        <Form.Item name={label} label={label}>
          <Select placeholder="Select option">
            {options.map((opt, index) => (
              <Select.Option key={index} value={opt}>
                {opt}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      );

    case "checkbox":
      return (
        <Form.Item name={label} valuePropName="checked">
          <Checkbox>{label}</Checkbox>
        </Form.Item>
      );

    case "radio":
      return (
        <Form.Item name={label} label={label}>
          <Radio.Group>
            {options.map((opt, index) => (
              <Radio key={index} value={opt}>
                {opt}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      );

    case "title":
      return <Title level={4}>{label}</Title>;

    default:
      return null;
  }
}
