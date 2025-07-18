"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Income {
  id: string;
  amount: number;
  client: string;
  paymentMode: string;
  date: string;
  createdAt: string;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
}

export default function IncomePage() {
  const { status } = useSession();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    amount: '',
    client: '',
    paymentMode: ''
  });

  // Toast functions
  const addToast = React.useCallback((type: 'success' | 'error' | 'warning', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Fetch incomes
  const fetchIncomes = React.useCallback(async () => {
    try {
      const response = await fetch('/api/income');
      if (response.ok) {
        const data = await response.json();
        setIncomes(data);
      } else {
        addToast('error', 'Failed to fetch income records');
      }
    } catch (error) {
      console.error('Error fetching incomes:', error);
      addToast('error', 'Error loading income records');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Add new income
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ amount: '', client: '', paymentMode: '' });
        setShowForm(false);
        fetchIncomes(); // Refresh the list
        addToast('success', 'Income record added successfully!');
      } else {
        const errorData = await response.json();
        addToast('error', errorData.error || 'Failed to add income record');
      }
    } catch (error) {
      console.error('Error adding income:', error);
      addToast('error', 'Network error. Please try again.');
    }
  };

  // Delete income
  const handleDeleteConfirm = async (id: string) => {
    try {
      const response = await fetch('/api/income', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchIncomes(); // Refresh the list
        addToast('success', 'Income record deleted successfully');
      } else {
        const errorData = await response.json();
        addToast('error', errorData.error || 'Failed to delete income record');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      addToast('error', 'Network error. Please try again.');
    }
    setShowDeleteModal(null);
  };

  // Load incomes on component mount
  useEffect(() => {
    if (status === "authenticated") {
      fetchIncomes();
    }
  }, [status, fetchIncomes]);

  // Loading state
  if (status === "loading") {
    return <div className="p-6">Loading...</div>;
  }

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  // Calculate total income
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="p-6">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out max-w-sm backdrop-blur-sm border ${
              toast.type === 'success'
                ? 'bg-emerald-900/80 text-emerald-100 border-emerald-500/50'
                : toast.type === 'error'
                ? 'bg-red-900/80 text-red-100 border-red-500/50'
                : 'bg-yellow-900/80 text-yellow-100 border-yellow-500/50'
            }`}
          >
            <div className="flex-shrink-0">
              {toast.type === 'success' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === 'warning' && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 inline-flex text-gray-400 hover:text-white focus:outline-none transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-xl max-w-md w-full mx-4 border border-slate-700/50">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Delete Income Record</h3>
                  <p className="text-sm text-gray-300">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this income record? This will permanently remove it from your records.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 text-gray-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteConfirm(showDeleteModal)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Income Management</h1>
        <p className="text-gray-300">Track and manage your income records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow border border-emerald-500/20">
          <h3 className="text-lg font-semibold text-white mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-emerald-400">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-2">Total Records</h3>
          <p className="text-3xl font-bold text-blue-400">{incomes.length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow border border-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-2">Average Income</h3>
          <p className="text-3xl font-bold text-purple-400">
            ${incomes.length > 0 ? (totalIncome / incomes.length).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      {/* Add Income Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Income'}
        </button>
      </div>

      {/* Add Income Form */}
      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow mb-8 border border-emerald-500/20">
          <h2 className="text-xl font-bold text-white mb-4">Add New Income</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Client
              </label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payment Mode
              </label>
              <select
                required
                value={formData.paymentMode}
                onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
                className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select payment mode</option>
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="check">Check</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Add Income
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Income List */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Income Records</h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto"></div>
            <p className="mt-2 text-gray-300">Loading income records...</p>
          </div>
        ) : incomes.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-300">No income records found. Add your first income record to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Payment Mode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-slate-700/50">
                {incomes.map((income) => (
                  <tr key={income.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(income.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {income.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-400">
                      ${income.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <span className="capitalize">{income.paymentMode.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setShowDeleteModal(income.id)}
                        className="text-red-400 hover:text-red-300 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
