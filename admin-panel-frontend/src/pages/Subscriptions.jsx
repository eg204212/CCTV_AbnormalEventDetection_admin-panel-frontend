import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Layout from '../components/Layout';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    features: [''],
    isPopular: false,
    status: 'active'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('/api/subscriptions');
      setSubscriptions(response.data.data);
    } catch (error) {
      setError('Failed to fetch subscriptions');
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

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeatureField = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration)
      };

      if (editingSubscription) {
        await axios.put(`/api/subscriptions/${editingSubscription._id}`, dataToSubmit);
      } else {
        await axios.post('/api/subscriptions', dataToSubmit);
      }

      fetchSubscriptions();
      setShowModal(false);
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save subscription');
    }
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setFormData({
      name: subscription.name,
      description: subscription.description,
      price: subscription.price.toString(),
      duration: subscription.duration.toString(),
      features: subscription.features,
      isPopular: subscription.isPopular,
      status: subscription.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await axios.delete(`/api/subscriptions/${id}`);
        fetchSubscriptions();
      } catch (error) {
        setError('Failed to delete subscription');
      }
    }
  };

  const resetForm = () => {
    setEditingSubscription(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      features: [''],
      isPopular: false,
      status: 'active'
    });
    setError('');
  };

  return (
    <Layout>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add New Plan
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map(subscription => (
          <div
            key={subscription._id}
            className={`bg-white rounded-lg shadow-md p-6 ${
              subscription.isPopular ? 'border-2 border-blue-500' : ''
            }`}
          >
            {subscription.isPopular && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
                Popular
              </span>
            )}
            <h2 className="text-xl font-bold mb-2">{subscription.name}</h2>
            <p className="text-gray-600 mb-4">{subscription.description}</p>
            <p className="text-3xl font-bold mb-4">${subscription.price}/mo</p>
            <p className="text-gray-600 mb-4">{subscription.duration} months</p>
            <ul className="mb-6">
              {subscription.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 mb-2">
                  <span className="text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(subscription)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(subscription._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingSubscription ? 'Edit Subscription Plan' : 'Add New Subscription Plan'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
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
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    rows="3"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price ($/month)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (months)</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                      min="1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Features</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border rounded"
                        placeholder="Enter a feature"
                        required
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeatureField(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeatureField}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isPopular"
                      checked={formData.isPopular}
                      onChange={handleInputChange}
                      className="form-checkbox"
                    />
                    <span>Popular Plan</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="px-3 py-2 border rounded"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
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
                  {editingSubscription ? 'Update Plan' : 'Create Plan'}
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

export default Subscriptions;
