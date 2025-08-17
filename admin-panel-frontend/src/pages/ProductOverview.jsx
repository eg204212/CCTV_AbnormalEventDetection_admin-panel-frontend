import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Layout from '../components/Layout';

const detectableOptions = [
  'Fire',
  'Accident',
  'Theft',
  'Violence',
  'Intrusion',
  'Unusual Behavior',
];

const ProductOverview = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productCode: '',
    name: '',
    category: '',
    shortDescription: '',
    fullDescription: '',
    keyFeatures: '',
    installationType: '',
    unitPrice: '',
    warranty: '',
    detectableEvents: [],
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/product`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else if (name === 'detectableEvents') {
      const updatedEvents = checked
        ? [...formData.detectableEvents, value]
        : formData.detectableEvents.filter((event) => event !== value);
      setFormData({ ...formData, detectableEvents: updatedEvents });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'keyFeatures') {
        value.split(',').map(f => f.trim()).forEach(f => form.append('keyFeatures', f));
      } else if (key === 'detectableEvents') {
        value.forEach(event => form.append('detectableEvents', event));
      } else {
        form.append(key, value);
      }
    });

    try {
      if (editingId) {
        await axios.put(`${API}/product/${editingId}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product updated!');
      } else {
        await axios.post(`${API}/product/add`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Product added!');
      }

      setFormData({
        productCode: '',
        name: '',
        category: '',
        shortDescription: '',
        fullDescription: '',
        keyFeatures: '',
        installationType: '',
        unitPrice: '',
        warranty: '',
        detectableEvents: [],
        image: null,
      });
      setEditingId(null);
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API}/product/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      productCode: product.productCode || '',
      name: product.name || '',
      category: product.category || '',
      shortDescription: product.shortDescription || '',
      fullDescription: product.fullDescription || '',
      keyFeatures: product.keyFeatures?.join(', ') || '',
      installationType: product.installationType || '',
      unitPrice: product.unitPrice || '',
      warranty: product.warranty || '',
      detectableEvents: product.detectableEvents || [],
      image: null,
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      productCode: '',
      name: '',
      category: '',
      shortDescription: '',
      fullDescription: '',
      keyFeatures: '',
      installationType: '',
      unitPrice: '',
      warranty: '',
      detectableEvents: [],
      image: null,
    });
    setShowModal(true);
  };

  return (
    <Layout>
    <div className="p-6 pt-1 text-white">
  <h2 className="text-2xl font-bold text-black mt-0">Product Overview</h2>
      {/*<button
        onClick={handleAddNew}
        className="mb-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Product
      </button>*/}

      {products.map((product) => (
        <div key={product._id} className="bg-gray-800 p-4 rounded mb-4 flex gap-4 relative">
          {product.imageUrl && (
            <img
              src={`${API.replace('/api', '')}/uploads/${product.imageUrl}`}
              alt="product"
              className="w-32 h-32 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p><strong>Code:</strong> {product.productCode}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.shortDescription}</p>
            <p>{product.fullDescription}</p>

            <p><strong>Key Features:</strong></p>
            <ul className="list-disc list-inside text-sm mb-2">
              {product.keyFeatures?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <p><strong>Installation Type:</strong> {product.installationType}</p>
            <p><strong>Unit Price:</strong> Rs. {product.unitPrice}</p>
            <p><strong>Warranty:</strong> {product.warranty}</p>

            <p><strong>Detectable Events:</strong></p>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.detectableEvents?.map((event, i) => (
                <span
                  key={i}
                  className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                >
                  {event}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute top-2 right-2 flex gap-3">
            <button onClick={() => handleEdit(product)}>
              <FaEdit className="text-yellow-400 hover:text-yellow-600" />
            </button>
            <button onClick={() => handleDelete(product._id)}>
              <FaTrash className="text-red-500 hover:text-red-700" />
            </button>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-lg relative">
            <button
                className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-500 focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
            >
                &times;
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="productCode"
                type="text"
                placeholder="Product Code"
                value={formData.productCode}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
                required
              />
              <input
                name="name"
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
                required
              />
              <input
                name="category"
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
              />
              <textarea
                name="shortDescription"
                placeholder="Short Description"
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
              />
              <textarea
                name="fullDescription"
                placeholder="Full Description"
                value={formData.fullDescription}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
              />
              <input
                name="keyFeatures"
                type="text"
                placeholder="Key Features (comma separated)"
                value={formData.keyFeatures}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
              />
              <input
                name="installationType"
                type="text"
                placeholder="Installation Type"
                value={formData.installationType}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
              />
              <input
                name="unitPrice"
                type="number"
                placeholder="Unit Price"
                value={formData.unitPrice}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
              />
              <input
                name="warranty"
                type="text"
                placeholder="Warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white"
              />

              {/* Detectable Events checkboxes */}
              <div className="text-sm">
                <p className="mb-2 font-semibold">Detectable Events:</p>
                <div className="grid grid-cols-2 gap-2">
                  {detectableOptions.map((event) => (
                    <label key={event} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="detectableEvents"
                        value={event}
                        checked={formData.detectableEvents.includes(event)}
                        onChange={handleChange}
                      />
                      {event}
                    </label>
                  ))}
                </div>
              </div>

              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="text-white"
              />

              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default ProductOverview;
