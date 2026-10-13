// src/data/validationRules.js

export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    messages: {
      required: "Full name is required",
      minLength: "Name must be at least 2 characters",
      maxLength: "Name must not exceed 50 characters",
      pattern: "Only letters, spaces, hyphens & apostrophes allowed",
    },
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    messages: {
      required: "Work email is required",
      pattern: "Please enter a valid email address",
    },
  },
  phone: {
    required: true,
    messages: {
      required: "Phone number is required",
      invalid: "Enter a valid number for selected country",
    },
  },
  company: {
    required: false,
    maxLength: 100,
    messages: {
      maxLength: "Company name must not exceed 100 characters",
    },
  },
  department: {
    required: true,
    messages: {
      required: "Please select a department",
    },
  },
  message: {
    required: false,
    minLength: 10,
    maxLength: 1000,
    messages: {
      minLength: "Message must be at least 10 characters",
      maxLength: "Message must not exceed 1000 characters",
    },
  },
};