const { ApperClient } = window.ApperSDK;

// Initialize ApperClient
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'project';

// All fields for fetch operations
const allFields = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'description', 'color', 'status', 'start_date', 'end_date', 'progress'
];

// Only Updateable fields for create/update operations
const updateableFields = [
  'Name', 'Tags', 'Owner', 'description', 'color', 'status', 
  'start_date', 'end_date', 'progress'
];

export const projectService = {
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
      console.error('Error fetching projects:', error);
      throw new Error('Failed to fetch projects');
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
      console.error(`Error fetching project with ID ${id}:`, error);
      throw new Error('Failed to fetch project');
    }
  },

  async create(projectData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      updateableFields.forEach(field => {
        if (projectData[field] !== undefined) {
          filteredData[field] = projectData[field];
        }
      });

      // Format data according to field types
      if (filteredData.start_date) {
        filteredData.start_date = new Date(filteredData.start_date).toISOString().split('T')[0];
      }
      if (filteredData.end_date) {
        filteredData.end_date = new Date(filteredData.end_date).toISOString().split('T')[0];
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
      throw new Error('Failed to create project');
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
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
      if (filteredData.start_date) {
        filteredData.start_date = new Date(filteredData.start_date).toISOString().split('T')[0];
      }
      if (filteredData.end_date) {
        filteredData.end_date = new Date(filteredData.end_date).toISOString().split('T')[0];
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
      throw new Error('Failed to update project');
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
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
      throw new Error('Failed to delete project');
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error('Failed to delete project');
    }
  }
};