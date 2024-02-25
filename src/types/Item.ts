import { policyNames } from '../constants/policyData';

export interface Item {
  _id?: string;
  name?: string;
  points?: number;
  threshold?: number;
  nonHraPoints?: number;
}

export type PolicyKey = keyof typeof policyNames;
