const { ApperClient } = window.ApperSDK;

// Initialize ApperClient
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'Discussion';

// All fields for fetch operations
const allFields = [
  'ParentTableId', 'ParentRecordId', 'IsResolved', 'Name', 'Owner', 
  'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'
];

// Only Updateable fields for create/update operations
const updateableFields = [
  'ParentTableId', 'ParentRecordId', 'IsResolved', 'Name', 'Owner'
];

export const discussionService = {
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
      console.error('Error fetching discussions:', error);
      throw new Error('Failed to fetch discussions');
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
      console.error(`Error fetching discussion with ID ${id}:`, error);
      throw new Error('Failed to fetch discussion');
    }
  },

  async create(discussionData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (discussionData[field] !== undefined) {
          filteredData[field] = discussionData[field];
        }
      });

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord(tableName, params);
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      }
      throw new Error('Failed to create discussion');
    } catch (error) {
      console.error('Error creating discussion:', error);
      throw new Error('Failed to create discussion');
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
      throw new Error('Failed to update discussion');
    } catch (error) {
      console.error('Error updating discussion:', error);
      throw new Error('Failed to update discussion');
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
      throw new Error('Failed to delete discussion');
    } catch (error) {
      console.error('Error deleting discussion:', error);
      throw new Error('Failed to delete discussion');
    }
  }
};