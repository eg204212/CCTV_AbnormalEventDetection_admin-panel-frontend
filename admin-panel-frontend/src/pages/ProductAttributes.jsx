import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Layout from '../components/Layout';

function ProductAttributes() {
  const [attributes, setAttributes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'text',
    required: false,
    options: ['']
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const response = await axios.get('/api/product-attributes');
      setAttributes(response.data);
    } catch (error) {
      setError('Failed to fetch attributes');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData(prev => ({
      ...prev,
      options: updatedOptions
    }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        options: formData.options.filter(opt => opt.trim() !== '')
      };

      if (editingAttribute) {
        await axios.put(`/api/product-attributes/${editingAttribute._id}`, dataToSubmit);
      } else {
        await axios.post('/api/product-attributes', dataToSubmit);
      }

      fetchAttributes();
      setShowModal(false);
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save attribute');
    }
  };

  const handleEdit = (attribute) => {
    setEditingAttribute(attribute);
    setFormData({
      name: attribute.name,
      type: attribute.type,
      required: attribute.required,
      options: attribute.type === 'select' ? [...attribute.options] : ['']
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attribute?')) {
      try {
        await axios.delete(`/api/product-attributes/${id}`);
        fetchAttributes();
      } catch (error) {
        setError('Failed to delete attribute');
      }
    }
  };

  const resetForm = () => {
    setEditingAttribute(null);
    setFormData({
      name: '',
      type: 'text',
      required: false,
      options: ['']
    });
    setError('');
  };

  return (
    <Layout>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Attributes</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add New Attribute
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Required
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attributes.map(attribute => (
              <tr key={attribute._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {attribute.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {attribute.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {attribute.required ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4">
                  {attribute.type === 'select' && (
                    <div className="text-sm text-gray-500">
                      {attribute.options.join(', ')}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleEdit(attribute)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(attribute._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingAttribute ? 'Edit Attribute' : 'Add New Attribute'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="select">Select</option>
                    <option value="checkbox">Checkbox</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="required"
                      checked={formData.required}
                      onChange={handleInputChange}
                    />
                    <span>Required</span>
                  </label>
                </div>
                {formData.type === 'select' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Options</label>
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border rounded"
                          placeholder="Enter option"
                          required
                        />
                        {formData.options.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addOption}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      + Add Option
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingAttribute ? 'Update Attribute' : 'Create Attribute'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default ProductAttributes;
