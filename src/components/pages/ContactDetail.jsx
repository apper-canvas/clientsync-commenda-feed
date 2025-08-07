import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import ContactForm from "@/components/organisms/ContactForm"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { getContactById, deleteContact } from "@/services/api/contactService"

const ContactDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const loadContact = async () => {
    setLoading(true)
    setError("")
    
    try {
      const data = await getContactById(parseInt(id))
      if (data) {
        setContact(data)
      } else {
        setError("Contact not found")
      }
    } catch (err) {
      setError("Failed to load contact details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      loadContact()
    }
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(contact.Id)
        toast.success("Contact deleted successfully")
        navigate("/contacts")
      } catch (error) {
        toast.error("Failed to delete contact")
      }
    }
  }

  const handleContactSaved = (savedContact) => {
    setContact(savedContact)
    setIsEditing(false)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadContact} />
  if (!contact) return <Error message="Contact not found" />

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setIsEditing(false)}
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            <span>Back to Details</span>
          </Button>
        </div>
        
        <ContactForm
          contact={contact}
          onContactSaved={handleContactSaved}
        />
      </motion.div>
    )
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {contact.company.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{contact.company}</h1>
                  <p className="text-lg text-gray-600">{contact.contactPerson}</p>
                  {contact.industry && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary bg-opacity-10 text-primary rounded-full mt-2">
                      {contact.industry}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center space-x-2"
                >
                  <ApperIcon name="Edit" size={16} />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="inline-flex items-center space-x-2"
                >
                  <ApperIcon name="Trash2" size={16} />
                  <span>Delete</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Mail" size={16} className="text-gray-400" />
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                      {contact.email}
                    </a>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Phone" size={16} className="text-gray-400" />
                    <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Last Contact</label>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Calendar" size={16} className="text-gray-400" />
                    <span className="text-gray-900">
                      {contact.lastContactDate 
                        ? format(new Date(contact.lastContactDate), "MMM dd, yyyy")
                        : "Never"
                      }
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Created</label>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Plus" size={16} className="text-gray-400" />
                    <span className="text-gray-900">
                      {format(new Date(contact.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Notes Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            {contact.notes ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{contact.notes}</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="FileText" size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No notes added yet</p>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="mt-2"
                >
                  Add Notes
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`mailto:${contact.email}`)}
              >
                <ApperIcon name="Mail" size={16} className="mr-2" />
                Send Email
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`tel:${contact.phone}`)}
              >
                <ApperIcon name="Phone" size={16} className="mr-2" />
                Make Call
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.info("Feature coming soon!")}
              >
                <ApperIcon name="Calendar" size={16} className="mr-2" />
                Schedule Meeting
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.info("Feature coming soon!")}
              >
                <ApperIcon name="FileText" size={16} className="mr-2" />
                Create Task
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Total Deals</span>
                <span className="text-lg font-bold text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Open Tasks</span>
                <span className="text-lg font-bold text-warning">2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Last Activity</span>
                <span className="text-lg font-bold text-success">Today</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactDetail