import contactsData from "@/services/mockData/contacts.json"

let contacts = [...contactsData]

export const getAllContacts = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...contacts]
}

export const getContactById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  const contact = contacts.find(c => c.Id === id)
  return contact ? { ...contact } : null
}

export const createContact = async (contactData) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const maxId = contacts.reduce((max, contact) => 
    contact.Id > max ? contact.Id : max, 0)
  
  const newContact = {
    Id: maxId + 1,
    ...contactData,
    lastContactDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  contacts.push(newContact)
  return { ...newContact }
}

export const updateContact = async (id, contactData) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const index = contacts.findIndex(c => c.Id === id)
  if (index === -1) {
    throw new Error("Contact not found")
  }
  
  contacts[index] = {
    ...contacts[index],
    ...contactData,
    updatedAt: new Date().toISOString()
  }
  
  return { ...contacts[index] }
}

export const deleteContact = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 250))
  
  const index = contacts.findIndex(c => c.Id === id)
  if (index === -1) {
    throw new Error("Contact not found")
  }
  
  contacts.splice(index, 1)
  return true
}