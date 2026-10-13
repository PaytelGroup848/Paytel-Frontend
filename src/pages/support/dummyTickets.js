// src/data/dummyTickets.js
export const initialTickets = [
  {
    id: "TKT-1001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    department: "Technical",
    priority: "High",
    message: "Unable to login to dashboard, error 500",
    status: "Open",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    attachment: null,
    replies: [
      { id: "r1", text: "Hi Aarav, we are checking logs. Please clear cache.", sender: "support", timestamp: new Date(Date.now() - 86400000).toISOString() }
    ]
  },
  {
    id: "TKT-1002",
    name: "Priya Verma",
    email: "priya@example.com",
    department: "General Enquiry",
    priority: "Medium",
    message: "Need pricing info",
    status: "Closed",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    attachment: null,
    replies: [
      { id: "r2", text: "Pricing PDF sent to your email.", sender: "support", timestamp: new Date(Date.now() - 86400000 * 4).toISOString() },
      { id: "r3", text: "Thank you, received!", sender: "user", timestamp: new Date(Date.now() - 86400000 * 3).toISOString() }
    ]
  },
  {
    id: "TKT-1003",
    name: "Rohan Mehta",
    email: "rohan@example.com",
    department: "Other",
    priority: "Low",
    message: "Feature request: dark mode",
    status: "Pending",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    attachment: null,
    replies: []
  },
  {
    id: "TKT-1004",
    name: "Sneha Kapoor",
    email: "sneha@example.com",
    department: "Technical",
    priority: "High",
    message: "CORS error with API",
    status: "Open",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    attachment: null,
    replies: [
      { id: "r4", text: "Please share your origin domain.", sender: "support", timestamp: new Date(Date.now() - 86400000 * 2).toISOString() }
    ]
  }
];

export const generateTicketId = () => {
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `TKT-${Date.now().toString().slice(-6)}${random}`;
};