import { toast } from 'react-toastify'

// Initialize ApperClient for database operations
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const TABLE_NAME = 'contact_c';

// Helper function to map UI data to database fields for create/update operations
const mapToDbFields = (contactData) => {
  const mapped = {};
  
  // Map UI fields to database fields (only Updateable fields)
  if (contactData.company !== undefined) mapped.company_c = contactData.company;
  if (contactData.contactPerson !== undefined) mapped.Name = contactData.contactPerson;
  if (contactData.email !== undefined) mapped.email_c = contactData.email;
  if (contactData.phone !== undefined) mapped.phone_c = contactData.phone;
  if (contactData.notes !== undefined) mapped.notes_c = contactData.notes;
  if (contactData.industry !== undefined) mapped.Tags = contactData.industry;
  if (contactData.firstName !== undefined) mapped.first_name_c = contactData.firstName;
  if (contactData.lastName !== undefined) mapped.last_name_c = contactData.lastName;
  if (contactData.jobTitle !== undefined) mapped.job_title_c = contactData.jobTitle;
  if (contactData.address !== undefined) mapped.address_c = contactData.address;
  if (contactData.city !== undefined) mapped.city_c = contactData.city;
  if (contactData.country !== undefined) mapped.country_c = contactData.country;
  if (contactData.postalCode !== undefined) mapped.postal_code_c = contactData.postalCode;
  if (contactData.status !== undefined) mapped.status_c = contactData.status;
  if (contactData.source !== undefined) mapped.source_c = contactData.source;
  if (contactData.lastContactDate !== undefined) mapped.last_contact_date_c = contactData.lastContactDate;
  
  return mapped;
};

// Helper function to map database fields to UI structure
const mapFromDbFields = (dbContact) => {
  if (!dbContact) return null;
  
  return {
    Id: dbContact.Id,
    company: dbContact.company_c || '',
    contactPerson: dbContact.Name || '',
    email: dbContact.email_c || '',
    phone: dbContact.phone_c || '',
    notes: dbContact.notes_c || '',
    industry: dbContact.Tags || '',
    firstName: dbContact.first_name_c || '',
    lastName: dbContact.last_name_c || '',
    jobTitle: dbContact.job_title_c || '',
    address: dbContact.address_c || '',
    city: dbContact.city_c || '',
    country: dbContact.country_c || '',
    postalCode: dbContact.postal_code_c || '',
    status: dbContact.status_c || 'Active',
    source: dbContact.source_c || '',
    lastContactDate: dbContact.last_contact_date_c || null,
    createdAt: dbContact.created_at_c || dbContact.CreatedOn || new Date().toISOString(),
    updatedAt: dbContact.updated_at_c || dbContact.ModifiedOn || new Date().toISOString()
  };
};

export const getAllContacts = async () => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Name" } },
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "email_c" } },
        { field: { Name: "phone_c" } },
        { field: { Name: "company_c" } },
        { field: { Name: "job_title_c" } },
        { field: { Name: "address_c" } },
        { field: { Name: "city_c" } },
        { field: { Name: "country_c" } },
        { field: { Name: "postal_code_c" } },
        { field: { Name: "notes_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "source_c" } },
        { field: { Name: "last_contact_date_c" } },
        { field: { Name: "created_at_c" } },
        { field: { Name: "updated_at_c" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "ModifiedOn" } }
      ],
      orderBy: [
        { fieldName: "created_at_c", sorttype: "DESC" }
      ],
      pagingInfo: {
        limit: 1000,
        offset: 0
      }
    };

    const response = await apperClient.fetchRecords(TABLE_NAME, params);

    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }

    if (!response.data || response.data.length === 0) {
      return [];
    }

    return response.data.map(mapFromDbFields);
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching contacts:", error?.response?.data?.message);
    } else {
      console.error(error.message);
    }
    return [];
  }
};

export const getContactById = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      fields: [
        { field: { Name: "Id" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Name" } },
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "email_c" } },
        { field: { Name: "phone_c" } },
        { field: { Name: "company_c" } },
        { field: { Name: "job_title_c" } },
        { field: { Name: "address_c" } },
        { field: { Name: "city_c" } },
        { field: { Name: "country_c" } },
        { field: { Name: "postal_code_c" } },
        { field: { Name: "notes_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "source_c" } },
        { field: { Name: "last_contact_date_c" } },
        { field: { Name: "created_at_c" } },
        { field: { Name: "updated_at_c" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "ModifiedOn" } }
      ]
    };

    const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);

    if (!response || !response.data) {
      return null;
    }

    return mapFromDbFields(response.data);
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching contact with ID ${id}:`, error?.response?.data?.message);
    } else {
      console.error(error.message);
    }
    return null;
  }
};

export const createContact = async (contactData) => {
  try {
    const apperClient = getApperClient();
    
    const dbFields = mapToDbFields(contactData);
    
    const params = {
      records: [dbFields]
    };

    const response = await apperClient.createRecord(TABLE_NAME, params);

    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }

    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);

      if (failedRecords.length > 0) {
        console.error(`Failed to create contact ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        
        failedRecords.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) toast.error(record.message);
        });
      }

      if (successfulRecords.length > 0) {
        return mapFromDbFields(successfulRecords[0].data);
      }
    }
    
    return null;
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error creating contact:", error?.response?.data?.message);
    } else {
      console.error(error.message);
    }
    return null;
  }
};

export const updateContact = async (id, contactData) => {
  try {
    const apperClient = getApperClient();
    
    const dbFields = mapToDbFields(contactData);
    dbFields.Id = parseInt(id);
    
    const params = {
      records: [dbFields]
    };

    const response = await apperClient.updateRecord(TABLE_NAME, params);

    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }

    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);

      if (failedUpdates.length > 0) {
        console.error(`Failed to update contact ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) toast.error(record.message);
        });
      }

      if (successfulUpdates.length > 0) {
        return mapFromDbFields(successfulUpdates[0].data);
      }
    }
    
    return null;
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error updating contact:", error?.response?.data?.message);
    } else {
      console.error(error.message);
    }
    return null;
  }
};

export const deleteContact = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      RecordIds: [parseInt(id)]
    };

    const response = await apperClient.deleteRecord(TABLE_NAME, params);

    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return false;
    }

    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);

      if (failedDeletions.length > 0) {
        console.error(`Failed to delete contact ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) toast.error(record.message);
        });
      }

      return successfulDeletions.length === 1;
    }
    
    return false;
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error deleting contact:", error?.response?.data?.message);
    } else {
      console.error(error.message);
    }
    return false;
  }
};