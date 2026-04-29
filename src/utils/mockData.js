/**
 * utils/mockData.js
 * Replace with real API calls once your Express/MongoDB backend is running.
 */

export const STATUSES  = ['Hot', 'Warm', 'Callback']
export const SOURCES   = ['Website', 'Referral', 'Facebook', 'Instagram', 'Walk-in', 'Google', 'Others']
export const PROJECTS  = [
  'Sky Residences Phase 3',
  'Green Valley Plots',
  'City Centre Towers',
  'Harbour Heights',
  'The Meridian',
]

export const MOCK_LEADS = [
  { _id: 'm1', name: 'Arjun Mehta',    phone: '+91 98201 44231', project: 'Sky Residences Phase 3', source: 'Website',   status: 'Hot',      value: '₹82L',   notes: 'Very interested, ready to visit site.',  createdAt: '2025-04-18T09:00:00Z' },
  { _id: 'm2', name: 'Priya Sharma',   phone: '+91 99382 01234', project: 'Green Valley Plots',      source: 'Referral',  status: 'Warm',     value: '₹45L',   notes: 'Comparing with another project.',        createdAt: '2025-04-20T10:30:00Z' },
  { _id: 'm3', name: 'Rahul Agarwal',  phone: '+91 87654 32100', project: 'City Centre Towers',      source: 'Facebook',  status: 'Callback', value: '₹1.2Cr', notes: 'Call back on Friday afternoon.',        createdAt: '2025-04-21T11:00:00Z' },
  { _id: 'm4', name: 'Divya Nair',     phone: '+91 70001 55678', project: 'Sky Residences Phase 3', source: 'Instagram', status: 'Hot',      value: '₹75L',   notes: 'Urgent requirement — 2BHK only.',       createdAt: '2025-04-22T14:00:00Z' },
  { _id: 'm5', name: 'Suresh Pillai',  phone: '+91 93456 78901', project: 'Green Valley Plots',      source: 'Walk-in',   status: 'Warm',     value: '₹30L',   notes: 'Flexible on timeline.',                 createdAt: '2025-04-23T09:45:00Z' },
  { _id: 'm6', name: 'Anjali Reddy',   phone: '+91 89012 34567', project: 'City Centre Towers',      source: 'Google',    status: 'Hot',      value: '₹95L',   notes: 'Budget approved, needs documents.',     createdAt: '2025-04-24T16:20:00Z' },
  { _id: 'm7', name: 'Vikram Singh',   phone: '+91 77890 12345', project: 'Green Valley Plots',      source: 'Website',   status: 'Callback', value: '₹55L',   notes: 'Travelling, call Monday.',              createdAt: '2025-04-25T08:00:00Z' },
  { _id: 'm8', name: 'Meera Joshi',    phone: '+91 81234 56789', project: 'Sky Residences Phase 3', source: 'Referral',  status: 'Warm',     value: '₹68L',   notes: 'Needs home loan guidance.',             createdAt: '2025-04-26T13:10:00Z' },
  { _id: 'm9', name: 'Kiran Desai',    phone: '+91 90123 45678', project: 'Harbour Heights',         source: 'Google',    status: 'Hot',      value: '₹1.4Cr', notes: 'Premium unit — corner flat preferred.', createdAt: '2025-04-27T10:00:00Z' },
  { _id:'m10', name: 'Sneha Kapoor',   phone: '+91 76543 21098', project: 'The Meridian',            source: 'Instagram', status: 'Warm',     value: '₹88L',   notes: 'Interior customisation queries.',       createdAt: '2025-04-28T15:30:00Z' },
]
