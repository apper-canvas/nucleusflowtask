const { ApperClient } = window.ApperSDK;

// Initialize ApperClient
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'Notification';

// All fields for fetch operations
const allFields = [
  'Activity', 'Discussion', 'Comment', 'IsRead', 'IsEmailed', 'Type', 'Name', 
  'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'Subscriber'
];

// Only Updateable fields for create/update operations
const updateableFields = [
  'Activity', 'Discussion', 'Comment', 'IsRead', 'IsEmailed', 'Type', 'Name', 
  'Tags', 'Owner', 'Subscriber'
];

export const notificationService = {
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
      console.error('Error fetching notifications:', error);
      throw new Error('Failed to fetch notifications');
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
      console.error(`Error fetching notification with ID ${id}:`, error);
      throw new Error('Failed to fetch notification');
    }
  },

  async create(notificationData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (notificationData[field] !== undefined) {
          filteredData[field] = notificationData[field];
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
      throw new Error('Failed to create notification');
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new Error('Failed to create notification');
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
      throw new Error('Failed to update notification');
    } catch (error) {
      console.error('Error updating notification:', error);
      throw new Error('Failed to update notification');
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
      throw new Error('Failed to delete notification');
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw new Error('Failed to delete notification');
    }
  }
};