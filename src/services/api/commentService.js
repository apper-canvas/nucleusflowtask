const { ApperClient } = window.ApperSDK;

// Initialize ApperClient
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'Comment';

// All fields for fetch operations
const allFields = [
  'Attachments', 'Reactions', 'Mentions', 'Name', 'Owner', 'CreatedOn', 
  'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'Discussion'
];

// Only Updateable fields for create/update operations
const updateableFields = [
  'Attachments', 'Reactions', 'Mentions', 'Name', 'Owner', 'Discussion'
];

export const commentService = {
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
      console.error('Error fetching comments:', error);
      throw new Error('Failed to fetch comments');
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
      console.error(`Error fetching comment with ID ${id}:`, error);
      throw new Error('Failed to fetch comment');
    }
  },

  async create(commentData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (commentData[field] !== undefined) {
          filteredData[field] = commentData[field];
        }
      });

      // Format Mentions field (People type - comma-separated)
      if (filteredData.Mentions && Array.isArray(filteredData.Mentions)) {
        filteredData.Mentions = filteredData.Mentions.join(',');
      }

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.createRecord(tableName, params);
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      }
      throw new Error('Failed to create comment');
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Failed to create comment');
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

      // Format Mentions field (People type - comma-separated)
      if (filteredData.Mentions && Array.isArray(filteredData.Mentions)) {
        filteredData.Mentions = filteredData.Mentions.join(',');
      }

      const params = {
        records: [filteredData]
      };

      const response = await apperClient.updateRecord(tableName, params);
      if (response?.success && response?.results?.[0]?.success) {
        return response.results[0].data;
      }
      throw new Error('Failed to update comment');
    } catch (error) {
      console.error('Error updating comment:', error);
      throw new Error('Failed to update comment');
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
      throw new Error('Failed to delete comment');
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw new Error('Failed to delete comment');
    }
  }
};