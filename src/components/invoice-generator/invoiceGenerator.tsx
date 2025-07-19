"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  description: string;
  amount: number;
  paymentMode: string;
  theme: string;
  date: string;
  invoiceNumber: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid';
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning';
  message: string;
}

const invoiceThemes = [
  { value: 'professional', label: 'Professional Blue', color: 'bg-blue-500' },
  { value: 'emerald', label: 'Emerald Green', color: 'bg-emerald-500' },
  { value: 'corporate', label: 'Corporate Gray', color: 'bg-gray-600' },
  { value: 'modern', label: 'Modern Purple', color: 'bg-purple-500' }
];

const paymentModes = [
  'bank_transfer',
  'paypal',
  'stripe',
  'cash',
  'cheque',
  'crypto',
  'other'
];

export default function InvoiceForm() {
  const { data: session } = useSession();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("professional");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Toast functions
  const addToast = React.useCallback((type: 'success' | 'error' | 'warning', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Generate invoice number
  const generateInvoiceNumber = () => {
    const prefix = "INV";
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.email) {
      addToast('error', 'Please sign in to create invoices');
      return;
    }

    setLoading(true);

    try {
      // Here you would typically save to database
      // For now, we'll create a mock invoice object
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        clientName,
        clientEmail,
        description,
        amount: parseFloat(amount),
        paymentMode,
        theme: selectedTheme,
        date: new Date().toISOString().split('T')[0],
        invoiceNumber: generateInvoiceNumber(),
        dueDate,
        status: 'draft'
      };

      setInvoice(newInvoice);
      setShowPreview(true);
      addToast('success', 'Invoice created successfully!');
      
    } catch (error) {
      console.error('Error creating invoice:', error);
      addToast('error', 'Failed to create invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setClientName("");
    setClientEmail("");
    setDescription("");
    setAmount("");
    setPaymentMode("");
    setSelectedTheme("professional");
    setDueDate("");
    setInvoice(null);
    setShowPreview(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Invoice Generator</h1>
        <p className="text-gray-300">Create professional invoices for your clients</p>
      </div>

      {!showPreview ? (
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow border border-emerald-500/20">
          <h2 className="text-xl font-bold text-white mb-6">Create New Invoice</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Client Email *
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                  placeholder="client@example.com"
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description/Service *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                placeholder="Describe the service or product..."
              />
            </div>

            {/* Amount and Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Mode *
                </label>
                <select
                  required
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select payment mode</option>
                  {paymentModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due Date and Theme */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Theme *
                </label>
                <select
                  required
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {invoiceThemes.map((theme) => (
                    <option key={theme.value} value={theme.value}>
                      {theme.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Theme Preview */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Theme Preview
              </label>
              <div className="flex items-center space-x-4">
                {invoiceThemes.map((theme) => (
                  <div
                    key={theme.value}
                    className={`flex items-center space-x-2 cursor-pointer ${
                      selectedTheme === theme.value ? 'opacity-100' : 'opacity-50'
                    }`}
                    onClick={() => setSelectedTheme(theme.value)}
                  >
                    <div className={`w-4 h-4 rounded ${theme.color}`}></div>
                    <span className="text-sm text-gray-300">{theme.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 text-gray-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? 'Creating...' : 'Create Invoice'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <InvoicePreview 
          invoice={invoice!} 
          onEdit={() => setShowPreview(false)}
          onReset={resetForm}
          theme={selectedTheme}
        />
      )}
    </div>
  );
}

// Invoice Preview Component
interface InvoicePreviewProps {
  invoice: Invoice;
  onEdit: () => void;
  onReset: () => void;
  theme: string;
}

function InvoicePreview({ invoice, onEdit, onReset, theme }: InvoicePreviewProps) {
  const themeColors = {
    professional: { primary: 'bg-blue-600', secondary: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    emerald: { primary: 'bg-emerald-600', secondary: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    corporate: { primary: 'bg-gray-600', secondary: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
    modern: { primary: 'bg-purple-600', secondary: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }
  };

  const colors = themeColors[theme as keyof typeof themeColors] || themeColors.professional;

  // Print function with enhanced CSS injection
  const handlePrint = () => {
    // Create comprehensive print styles
    const printStyles = `
      <style id="invoice-print-styles">
        @media print {
          /* Page setup - minimal margins */
          @page {
            margin: 0.2in !important;
            size: A4 portrait !important;
          }
          
          /* Reset everything */
          * {
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }
          
          /* Hide body background and other elements */
          body {
            background: white !important;
            font-family: Arial, sans-serif !important;
            font-size: 10px !important;
            line-height: 1.2 !important;
          }
          
          /* Hide everything first */
          body > * {
            display: none !important;
          }
          
          /* Show only the invoice container parent */
          body > div,
          body > main,
          body > section {
            display: block !important;
          }
          
          /* Hide everything in the container except invoice */
          body * {
            visibility: hidden !important;
          }
          
          /* Show only invoice content */
          #invoice-content,
          #invoice-content * {
            visibility: visible !important;
            display: block !important;
          }
          
          /* Position invoice - compact and centered */
          #invoice-content {
            position: fixed !important;
            top: 0 !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 95% !important;
            max-width: 600px !important;
            background: white !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 8px !important;
            page-break-inside: avoid !important;
            height: auto !important;
            overflow: visible !important;
          }
          
          /* Ultra compact spacing */
          #invoice-content * {
            margin: 0 !important;
            padding: 2px !important;
            line-height: 1.1 !important;
          }
          
          /* Specific overrides for padding classes */
          #invoice-content .p-8,
          #invoice-content .p-6,
          #invoice-content .p-4 {
            padding: 6px !important;
          }
          
          /* Compact text sizes */
          #invoice-content h1 {
            font-size: 18px !important;
            font-weight: bold !important;
            margin-bottom: 2px !important;
          }
          
          #invoice-content h2 {
            font-size: 14px !important;
            font-weight: bold !important;
            margin-bottom: 2px !important;
          }
          
          #invoice-content h3 {
            font-size: 12px !important;
            font-weight: bold !important;
            margin-bottom: 2px !important;
          }
          
          #invoice-content p,
          #invoice-content span,
          #invoice-content div {
            font-size: 10px !important;
            line-height: 1.1 !important;
          }
          
          /* Grid layouts more compact */
          #invoice-content .grid {
            gap: 4px !important;
          }
          
          /* Remove all margin bottom classes */
          #invoice-content .mb-8,
          #invoice-content .mb-6,
          #invoice-content .mb-4,
          #invoice-content .mb-3,
          #invoice-content .mb-2 {
            margin-bottom: 3px !important;
          }
          
          /* Ensure colors print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Text colors */
          #invoice-content .text-white {
            color: white !important;
          }
          
          #invoice-content .text-black {
            color: black !important;
          }
          
          /* Remove URL from header/footer */
          @page {
            @top-left { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-right { content: ""; }
          }
          
          /* Ensure everything fits on one page */
          html, body {
            height: auto !important;
            overflow: visible !important;
          }
        }
      </style>
    `;
    
    // Remove existing styles and add new ones
    const existingStyles = document.getElementById('invoice-print-styles');
    if (existingStyles) {
      existingStyles.remove();
    }
    
    document.head.insertAdjacentHTML('beforeend', printStyles);
    
    // Small delay to ensure styles are applied
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="space-y-6">
      
      <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-white">Invoice Preview</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print Invoice
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2.5 text-gray-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg font-medium transition-colors border border-slate-600"
          >
            Edit
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2.5 text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg font-medium transition-colors border border-emerald-500/30"
          >
            Create New
          </button>
        </div>
      </div>

      {/* Invoice Template - Compact Layout */}
      <div id="invoice-content" className="bg-white rounded-lg shadow-lg p-4">
        {/* Header - Compact */}
        <div className={`${colors.primary} text-white p-4 rounded-t-lg`}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white">INVOICE</h1>
              <p className="text-sm opacity-90 text-white">{invoice.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-white">BucksBunny</h2>
              <p className="text-xs opacity-90 text-white">Invoice Management System</p>
            </div>
          </div>
        </div>

        {/* Invoice Details - Compact */}
        <div className="p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className={`font-semibold mb-2 text-sm ${colors.text}`}>Bill To:</h3>
              <div className="text-black">
                <p className="font-medium text-black text-sm">{invoice.clientName}</p>
                <p className="text-black text-sm">{invoice.clientEmail}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="space-y-1">
                <div className="flex justify-end">
                  <span className="font-medium w-20 text-black text-sm">Date:</span>
                  <span className="text-black text-sm">{invoice.date}</span>
                </div>
                <div className="flex justify-end">
                  <span className="font-medium w-20 text-black text-sm">Due Date:</span>
                  <span className="text-black text-sm">{invoice.dueDate}</span>
                </div>
                <div className="flex justify-end">
                  <span className="font-medium w-20 text-black text-sm">Payment:</span>
                  <span className="capitalize text-black text-sm">{invoice.paymentMode.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Description - Compact */}
          <div className={`border ${colors.border} rounded-lg p-3 mb-4`}>
            <h4 className={`font-semibold mb-1 text-sm ${colors.text}`}>Description:</h4>
            <p className="text-black text-sm">{invoice.description}</p>
          </div>

          {/* Amount - Compact */}
          <div className="flex justify-end">
            <div className="w-48">
              <div className={`${colors.secondary} p-3 rounded-lg border ${colors.border}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-black text-sm">Subtotal:</span>
                  <span className="text-black text-sm">${invoice.amount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-black text-sm">Total:</span>
                    <span className={`${colors.text} font-bold text-lg`}>${invoice.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Compact */}
        <div className={`${colors.secondary} p-3 rounded-b-lg border-t ${colors.border}`}>
          <p className="text-xs text-black text-center">
            Thank you for your business! Payment is due by {invoice.dueDate}.
          </p>
        </div>
      </div>
    </div>
  );
}