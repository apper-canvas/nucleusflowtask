const { ApperClient } = window.ApperSDK;

// Initialize ApperClient
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'Attachment';

// All fields for fetch operations
const allFields = [
  'Path', 'Size', 'Type', 'IsExternal', 'Ordinal', 'ParentTableId', 'ParentRecordId',
  'FieldId', 'Name', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'
];

// Only Updateable fields for create/update operations
const updateableFields = [
  'Path', 'Size', 'Type', 'IsExternal', 'Ordinal', 'ParentTableId', 'ParentRecordId',
  'FieldId', 'Name', 'Owner'
];

export const attachmentService = {
  async getAll() {
    try {
      const params = {
        fields: allFields,
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching attachments:', error);
      throw new Error('Failed to fetch attachments');
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: allFields
      };
      
      const response = await apperClient.getRecordById(tableName, id, params);
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching attachment with ID ${id}:`, error);
      throw new Error('Failed to fetch attachment');
    }
  },

  async create(attachmentData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (attachmentData[field] !== undefined) {
          filteredData[field] = attachmentData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord(tableName, params);
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      }
      throw new Error('Failed to create attachment');
    } catch (error) {
      console.error('Error creating attachment:', error);
      throw new Error('Failed to create attachment');
    }
  },

  async update(id, updateData) {
    try {
      // Filter to only include updateable fields
      const filteredData = { Id: id };
      updateableFields.forEach(field => {
        if (updateData[field] !== undefined) {
          filteredData[field] = updateData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord(tableName, params);
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      }
      throw new Error('Failed to update attachment');
    } catch (error) {
      console.error('Error updating attachment:', error);
      throw new Error('Failed to update attachment');
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      if (response?.success) {
        return true;
      }
      throw new Error('Failed to delete attachment');
    } catch (error) {
      console.error('Error deleting attachment:', error);
      throw new Error('Failed to delete attachment');
    }
  }
};