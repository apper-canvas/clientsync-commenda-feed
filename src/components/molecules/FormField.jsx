import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Textarea from "@/components/atoms/Textarea"

const FormField = ({ 
  type = "input", 
  label, 
  error, 
  required = false, 
  options = [],
  ...props 
}) => {
  return (
    <div className="space-y-1">
      <Label required={required}>{label}</Label>
      {type === "input" && (
        <Input error={error} {...props} />
      )}
      {type === "select" && (
        <Select error={error} {...props}>
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
      {type === "textarea" && (
        <Textarea error={error} {...props} />
      )}
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  )
}

export default FormField