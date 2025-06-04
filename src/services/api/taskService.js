const { ApperClient } = window.ApperSDK;

// Initialize ApperClient
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'task';

// All fields for fetch operations (including System fields for display)
const allFields = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'title', 'description', 'status', 'priority', 'due_date', 'created_at', 'updated_at',
  'assignee', 'project_id'
];

// Only Updateable fields for create/update operations
const updateableFields = [
  'Name', 'Tags', 'Owner', 'title', 'description', 'status', 'priority', 
  'due_date', 'created_at', 'updated_at', 'assignee', 'project_id'
];

export const taskService = {
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
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to fetch tasks');
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
      console.error(`Error fetching task with ID ${id}:`, error);
      throw new Error('Failed to fetch task');
    }
  },

  async create(taskData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (taskData[field] !== undefined) {
          filteredData[field] = taskData[field];
        }
      });

      // Format data according to field types
      if (filteredData.due_date) {
        filteredData.due_date = new Date(filteredData.due_date).toISOString().split('T')[0];
      }
      if (filteredData.created_at) {
        filteredData.created_at = new Date(filteredData.created_at).toISOString();
      }
      if (filteredData.updated_at) {
        filteredData.updated_at = new Date(filteredData.updated_at).toISOString();
      }
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
      throw new Error('Failed to create task');
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
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

      // Format data according to field types
      if (filteredData.due_date) {
        filteredData.due_date = new Date(filteredData.due_date).toISOString().split('T')[0];
      }
      if (filteredData.updated_at) {
        filteredData.updated_at = new Date().toISOString();
      }
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
      throw new Error('Failed to update task');
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
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
      throw new Error('Failed to delete task');
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  }
};