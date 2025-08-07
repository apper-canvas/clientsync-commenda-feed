import { useState, useMemo } from "react"
import { format } from "date-fns"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import SearchBar from "@/components/molecules/SearchBar"
import TableHeader from "@/components/molecules/TableHeader"
import TableRow from "@/components/molecules/TableRow"
import { deleteContact } from "@/services/api/contactService"

const ContactTable = ({ contacts, onContactDeleted }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("company")
  const [sortOrder, setSortOrder] = useState("asc")

  const columns = [
    { key: "company", label: "Company", sortable: true },
    { key: "contactPerson", label: "Contact Person", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: false },
    { 
      key: "lastContactDate", 
      label: "Last Contact", 
      sortable: true,
      render: (date) => date ? format(new Date(date), "MMM dd, yyyy") : "Never"
    }
  ]

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(key)
      setSortOrder("asc")
    }
  }

  const filteredAndSortedContacts = useMemo(() => {
    let filtered = contacts.filter(contact =>
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
    )

    return filtered.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      if (sortBy === "lastContactDate") {
        aVal = aVal ? new Date(aVal) : new Date(0)
        bVal = bVal ? new Date(bVal) : new Date(0)
      } else if (typeof aVal === "string") {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }, [contacts, searchTerm, sortBy, sortOrder])

  const handleDeleteContact = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(contactId)
        onContactDeleted(contactId)
        toast.success("Contact deleted successfully")
      } catch (error) {
        toast.error("Failed to delete contact")
      }
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">All Contacts</h3>
          <SearchBar
            placeholder="Search contacts..."
            onSearch={setSearchTerm}
            className="w-full sm:w-80"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader
            columns={columns}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedContacts.map((contact) => (
              <TableRow
                key={contact.Id}
                item={contact}
                columns={columns}
                onDelete={handleDeleteContact}
              />
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No contacts found</p>
        </div>
      )}
    </Card>
  )
}

export default ContactTable