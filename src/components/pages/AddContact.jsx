import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import ContactForm from "@/components/organisms/ContactForm"

const AddContact = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/contacts")}
          className="inline-flex items-center space-x-2"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          <span>Back to Contacts</span>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Contact</h1>
        <p className="mt-1 text-gray-600">
          Create a new contact to start building your customer relationship
        </p>
      </div>

      <ContactForm />
    </motion.div>
  )
}

export default AddContact