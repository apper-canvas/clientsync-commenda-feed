import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import { createContact, updateContact } from "@/services/api/contactService"

const ContactForm = ({ contact = null, onContactSaved }) => {
  const navigate = useNavigate()
  const isEditing = Boolean(contact)
  
  const [formData, setFormData] = useState({
    company: contact?.company || "",
    contactPerson: contact?.contactPerson || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    industry: contact?.industry || "",
    notes: contact?.notes || ""
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const industryOptions = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail" },
    { value: "education", label: "Education" },
    { value: "consulting", label: "Consulting" },
    { value: "real-estate", label: "Real Estate" },
    { value: "other", label: "Other" }
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required"
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      let savedContact
      if (isEditing) {
        savedContact = await updateContact(contact.Id, formData)
        toast.success("Contact updated successfully")
      } else {
        savedContact = await createContact(formData)
        toast.success("Contact created successfully")
      }
      
      onContactSaved?.(savedContact)
      
      if (!isEditing) {
        navigate("/contacts")
      }
    } catch (error) {
      toast.error(isEditing ? "Failed to update contact" : "Failed to create contact")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditing ? "Edit Contact" : "Add New Contact"}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {isEditing ? "Update contact information" : "Enter details for the new contact"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Company Name"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            error={errors.company}
            required
            placeholder="Enter company name"
          />

          <FormField
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            error={errors.contactPerson}
            required
            placeholder="Enter contact person name"
          />

          <FormField
            label="Email"
            type="input"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            placeholder="Enter email address"
          />

          <FormField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            required
            placeholder="Enter phone number"
          />

          <FormField
            type="select"
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            options={industryOptions}
            placeholder="Select industry"
          />
        </div>

        <FormField
          type="textarea"
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Add any additional notes or comments"
          rows={4}
        />

        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/contacts")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : (isEditing ? "Update Contact" : "Create Contact")}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default ContactForm