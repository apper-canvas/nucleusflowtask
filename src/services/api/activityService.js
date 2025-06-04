const { ApperClient } = window.ApperSDK;

// Initialize ApperClient
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'Activity';

// All fields for fetch operations
const allFields = [
  'ParentTableId', 'ParentRecordId', 'Type', 'Name', 'Tags', 'Owner',
  'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'Discussion'
];

// Only Updateable fields for create/update operations
const updateableFields = [
  'ParentTableId', 'ParentRecordId', 'Type', 'Name', 'Tags', 'Owner', 'Discussion'
];

export const activityService = {
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
      console.error('Error fetching activities:', error);
      throw new Error('Failed to fetch activities');
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
      console.error(`Error fetching activity with ID ${id}:`, error);
      throw new Error('Failed to fetch activity');
    }
  },

  async create(activityData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (activityData[field] !== undefined) {
          filteredData[field] = activityData[field];
        }
      });

      // Format Tags field (Tag type - comma-separated)
      if (filteredData.Tags && Array.isArray(filteredData.Tags)) {
        filteredData.Tags = filteredData.Tags.join(',');
      }

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord(tableName, params);
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      }
      throw new Error('Failed to create activity');
    } catch (error) {
      console.error('Error creating activity:', error);
      throw new Error('Failed to create activity');
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

      // Format Tags field (Tag type - comma-separated)
      if (filteredData.Tags && Array.isArray(filteredData.Tags)) {
        filteredData.Tags = filteredData.Tags.join(',');
      }

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord(tableName, params);
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      }
      throw new Error('Failed to update activity');
    } catch (error) {
      console.error('Error updating activity:', error);
      throw new Error('Failed to update activity');
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
      throw new Error('Failed to delete activity');
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw new Error('Failed to delete activity');
    }
  }
};