import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'routes', label: 'Routes' },
  { id: 'categories', label: 'Vehicle Categories' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'pricing-rules', label: 'Pricing Rules' },
  { id: 'offers', label: 'Offers' }
];

export default function PriceManagement() {
  const { fetchWithAuth } = useApi();
  const [activeTab, setActiveTab] = useState('routes');
  const [data, setData] = useState({
    routes: [],
    categories: [],
    vehicles: [],
    'pricing-rules': [],
    offers: [],
    cars: [] // For listing cars from Car Services
  });
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Toast & Confirm State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/pricing/admin/${tab}`);
      setData(prev => ({ ...prev, [tab]: res }));
      
      // If we are on the vehicles tab, also fetch the cars from Car Services for the dropdown
      if (tab === 'vehicles') {
        const carsRes = await fetchWithAuth('/guide/cars');
        setData(prev => ({ ...prev, cars: carsRes }));
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      // Form date parsing for offers
      let initData = { ...item };
      if (activeTab === 'offers') {
        initData.startDate = item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '';
        initData.endDate = item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '';
      }
      // Normalize populated ObjectId fields to plain _id strings
      // so the <select> value matches the <option value={c._id}> exactly
      if (activeTab === 'vehicles' && initData.categoryId && typeof initData.categoryId === 'object') {
        initData.categoryId = initData.categoryId._id;
      }
      if (activeTab === 'pricing-rules' && initData.vehicleId && typeof initData.vehicleId === 'object') {
        initData.vehicleId = initData.vehicleId._id;
      }
      setFormData(initData);
    } else {
      setFormData({ active: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `/pricing/admin/${activeTab}/${editingItem._id}` 
        : `/pricing/admin/${activeTab}`;
        
      await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData)
      });
      
      handleCloseModal();
      fetchData(activeTab);
      showToast(`${TABS.find(t => t.id === activeTab)?.label.slice(0, -1) || 'Item'} successfully ${editingItem ? 'updated' : 'added'}!`, 'success');
    } catch (err) {
      console.error('Error saving:', err);
      showToast('Failed to save data: ' + err.message, 'error');
    }
  };

  const requestDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      await fetchWithAuth(`/pricing/admin/${activeTab}/${deleteConfirm.id}`, { method: 'DELETE' });
      fetchData(activeTab);
      showToast('Item deleted successfully!', 'success');
    } catch (err) {
      console.error('Error deleting:', err);
      showToast('Failed to delete: ' + err.message, 'error');
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' && value !== '') ? Number(value) : value
    }));
  };

  // -------------------------------------------------------------
  // Dynamic Form Rendering
  // -------------------------------------------------------------
  const renderFormFields = () => {
    switch (activeTab) {
      case 'routes': return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Source City</label>
            <input required name="sourceCity" value={formData.sourceCity || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Destination City</label>
            <input required name="destinationCity" value={formData.destinationCity || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Distance (KM)</label>
            <input required type="number" min="1" name="distanceKm" value={formData.distanceKm || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" name="active" checked={formData.active !== false} onChange={handleChange} />
            <label className="text-sm">Active</label>
          </div>
        </>
      );
      case 'categories': return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input required name="name" value={formData.name || ''} onChange={handleChange} placeholder="e.g. Premium" className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Display Order</label>
            <input type="number" name="displayOrder" value={formData.displayOrder || 0} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" name="active" checked={formData.active !== false} onChange={handleChange} />
            <label className="text-sm">Active</label>
          </div>
        </>
      );
      case 'vehicles': return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Vehicle Name (From Car Services)</label>
            <select required name="name" value={formData.name || ''} onChange={handleChange} className="w-full border rounded p-2">
              <option value="">Select a Car</option>
              {data.cars && data.cars.map(car => (
                <option key={car._id} value={car.name}>{car.name}</option>
              ))}
              {/* Fallback to allow keeping an existing name that might have been deleted from Car Services */}
              {formData.name && (!data.cars || !data.cars.find(c => c.name === formData.name)) && (
                 <option value={formData.name}>{formData.name}</option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select required name="categoryId" value={formData.categoryId || ''} onChange={handleChange} className="w-full border rounded p-2">
              <option value="">Select Category</option>
              {data.categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Min Travellers</label>
              <input required type="number" min="1" name="minTravellers" value={formData.minTravellers || 1} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Max Travellers</label>
              <input required type="number" min="1" name="maxTravellers" value={formData.maxTravellers || ''} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Min Seats</label>
              <input required type="number" min="1" name="minSeats" value={formData.minSeats || 1} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Max Seats</label>
              <input required type="number" min="1" name="maxSeats" value={formData.maxSeats || ''} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="supportsAC" checked={formData.supportsAC !== false} onChange={handleChange} />
              <label className="text-sm">Supports AC</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="supportsNonAC" checked={formData.supportsNonAC !== false} onChange={handleChange} />
              <label className="text-sm">Supports Non-AC</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="active" checked={formData.active !== false} onChange={handleChange} />
              <label className="text-sm">Active</label>
            </div>
          </div>
        </>
      );
      case 'pricing-rules': return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Vehicle</label>
            <select required name="vehicleId" value={formData.vehicleId || ''} onChange={handleChange} className="w-full border rounded p-2">
              <option value="">Select Vehicle</option>
              {data.vehicles.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Base Price Per KM (₹)</label>
            <input required type="number" min="0" step="0.5" name="basePricePerKm" value={formData.basePricePerKm || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">AC Surcharge Per KM (₹)</label>
            <input required type="number" min="0" step="0.5" name="acSurchargePerKm" value={formData.acSurchargePerKm || 0} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" name="active" checked={formData.active !== false} onChange={handleChange} />
            <label className="text-sm">Active</label>
          </div>
        </>
      );
      case 'offers': return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Offer Name</label>
            <input required name="name" value={formData.name || ''} onChange={handleChange} placeholder="e.g. Summer Special" className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Discount (%)</label>
            <input required type="number" min="0" max="100" name="discountPercentage" value={formData.discountPercentage || ''} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input required type="date" name="startDate" value={formData.startDate || ''} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input required type="date" name="endDate" value={formData.endDate || ''} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input type="checkbox" name="active" checked={formData.active !== false} onChange={handleChange} />
            <label className="text-sm">Active</label>
          </div>
        </>
      );
      default: return null;
    }
  };

  // -------------------------------------------------------------
  // Dynamic Table Rendering
  // -------------------------------------------------------------
  const renderTableHead = () => {
    switch (activeTab) {
      case 'routes': return (<tr><th className="p-3 text-left">Source</th><th className="p-3 text-left">Destination</th><th className="p-3 text-left">Distance (KM)</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Actions</th></tr>);
      case 'categories': return (<tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Order</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Actions</th></tr>);
      case 'vehicles': return (<tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Category</th><th className="p-3 text-left">Capacity</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Actions</th></tr>);
      case 'pricing-rules': return (<tr><th className="p-3 text-left">Vehicle</th><th className="p-3 text-left">Base/KM</th><th className="p-3 text-left">AC Surcharge/KM</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Actions</th></tr>);
      case 'offers': return (<tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Discount</th><th className="p-3 text-left">Valid Until</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Actions</th></tr>);
      default: return null;
    }
  };

  const renderTableRow = (item) => {
    const activeBadge = item.active ? <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Active</span> : <span className="text-red-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> Inactive</span>;
    
    switch (activeTab) {
      case 'routes': return (
        <tr key={item._id} className="border-t border-zinc-100 hover:bg-zinc-50">
          <td className="p-3">{item.sourceCity}</td>
          <td className="p-3">{item.destinationCity}</td>
          <td className="p-3">{item.distanceKm}</td>
          <td className="p-3">{activeBadge}</td>
          <td className="p-3 text-right">
            <button onClick={() => handleOpenModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => requestDelete(item._id)} className="p-1 text-red-600 hover:bg-red-50 rounded ml-2"><Trash2 className="w-4 h-4" /></button>
          </td>
        </tr>
      );
      case 'categories': return (
        <tr key={item._id} className="border-t border-zinc-100 hover:bg-zinc-50">
          <td className="p-3 font-medium">{item.name}</td>
          <td className="p-3">{item.displayOrder}</td>
          <td className="p-3">{activeBadge}</td>
          <td className="p-3 text-right">
            <button onClick={() => handleOpenModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => requestDelete(item._id)} className="p-1 text-red-600 hover:bg-red-50 rounded ml-2"><Trash2 className="w-4 h-4" /></button>
          </td>
        </tr>
      );
      case 'vehicles': return (
        <tr key={item._id} className="border-t border-zinc-100 hover:bg-zinc-50">
          <td className="p-3 font-medium">{item.name}</td>
          <td className="p-3">{item.categoryId?.name || '-'}</td>
          <td className="p-3 text-sm text-zinc-500">{item.maxTravellers} pax, {item.maxSeats} seats</td>
          <td className="p-3">{activeBadge}</td>
          <td className="p-3 text-right">
            <button onClick={() => handleOpenModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => requestDelete(item._id)} className="p-1 text-red-600 hover:bg-red-50 rounded ml-2"><Trash2 className="w-4 h-4" /></button>
          </td>
        </tr>
      );
      case 'pricing-rules': return (
        <tr key={item._id} className="border-t border-zinc-100 hover:bg-zinc-50">
          <td className="p-3 font-medium">{item.vehicleId?.name || '-'}</td>
          <td className="p-3">₹{item.basePricePerKm}</td>
          <td className="p-3">₹{item.acSurchargePerKm}</td>
          <td className="p-3">{activeBadge}</td>
          <td className="p-3 text-right">
            <button onClick={() => handleOpenModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => requestDelete(item._id)} className="p-1 text-red-600 hover:bg-red-50 rounded ml-2"><Trash2 className="w-4 h-4" /></button>
          </td>
        </tr>
      );
      case 'offers': return (
        <tr key={item._id} className="border-t border-zinc-100 hover:bg-zinc-50">
          <td className="p-3 font-medium">{item.name}</td>
          <td className="p-3">{item.discountPercentage}%</td>
          <td className="p-3 text-sm text-zinc-500">{new Date(item.endDate).toLocaleDateString()}</td>
          <td className="p-3">{activeBadge}</td>
          <td className="p-3 text-right">
            <button onClick={() => handleOpenModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => requestDelete(item._id)} className="p-1 text-red-600 hover:bg-red-50 rounded ml-2"><Trash2 className="w-4 h-4" /></button>
          </td>
        </tr>
      );
      default: return null;
    }
  };

  // If loading dependent data for selects (vehicles needs categories, rules needs vehicles)
  useEffect(() => {
    if (activeTab === 'vehicles' && data.categories.length === 0) fetchData('categories');
    if (activeTab === 'pricing-rules' && data.vehicles.length === 0) fetchData('vehicles');
  }, [activeTab]);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 leading-tight">Price Management</h1>
          <p className="text-zinc-500 text-sm mt-1">Configure dynamic pricing rules for the fare calculator</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center justify-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors w-full sm:w-auto shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden mb-8">
        {loading ? (
          <div className="p-8 text-center text-zinc-500">Loading...</div>
        ) : data[activeTab].length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No {TABS.find(t => t.id === activeTab)?.label.toLowerCase()} found. Create one to get started.</div>
        ) : (
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                {renderTableHead()}
              </thead>
              <tbody>
                {data[activeTab].map(item => renderTableRow(item))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit' : 'Create'} {TABS.find(t => t.id === activeTab)?.label}</h2>
              <button onClick={handleCloseModal} className="text-zinc-400 hover:text-zinc-600">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              {renderFormFields()}
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-50 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 font-medium">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Delete Item?</h3>
                <p className="text-zinc-500 mb-6 text-sm">Are you sure you want to permanently delete this item? This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setDeleteConfirm({ isOpen: false, id: null })} 
                    className="flex-1 px-4 py-2.5 border border-zinc-200 rounded-xl text-zinc-700 hover:bg-zinc-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete} 
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium transition-colors shadow-sm shadow-red-600/20"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-[70]"
          >
            <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border ${
              toast.type === 'success' 
                ? 'bg-white border-green-100 text-zinc-800' 
                : 'bg-white border-red-100 text-red-800'
            }`}>
              {toast.type === 'success' ? (
                <div className="bg-green-100 rounded-full p-1"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
              ) : (
                <div className="bg-red-100 rounded-full p-1"><AlertCircle className="w-5 h-5 text-red-600" /></div>
              )}
              <p className="font-medium text-sm pr-2">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
