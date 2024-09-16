import { policyNames } from '../constants/policyData';

// Define the structure of the 'field' object
export interface Field {
  _id: string;
  name: string;
  originalName: string;
  types: string;
  createdAt?: string;
  updatedAt?: string;
}

// Update the 'Item' interface to include 'field'
export interface Item {
  _id?: string;
  name?: string;
  originalName?: string; // Keeping this for compatibility if 'originalName' exists outside of 'field'
  points?: number;
  threshold?: number;
  nonHraPoints?: number;
  field?: Field; // Add the 'field' property which is of type 'Field'
}

export type PolicyKey = keyof typeof policyNames;
