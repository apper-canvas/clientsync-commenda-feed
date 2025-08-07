import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import ContactTable from "@/components/organisms/ContactTable"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { getAllContacts } from "@/services/api/contactService"

const Contacts = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadContacts = async () => {
    setLoading(true)
    setError("")
    
    try {
      const data = await getAllContacts()
      setContacts(data)
    } catch (err) {
      setError("Failed to load contacts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const handleContactDeleted = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.Id !== contactId))
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadContacts} />

  if (contacts.length === 0) {
    return (
      <Empty
        title="No contacts yet"
        message="Start building your customer relationships by adding your first contact"
        actionLabel="Add First Contact"
        actionPath="/contacts/add"
        icon="Users"
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="mt-1 text-gray-600">
            Manage your customer relationships and contact information
          </p>
        </div>
        <Button
          onClick={() => navigate("/contacts/add")}
          variant="primary"
          className="inline-flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Add Contact</span>
        </Button>
      </div>

      <ContactTable
        contacts={contacts}
        onContactDeleted={handleContactDeleted}
      />
    </motion.div>
  )
}

export default Contacts