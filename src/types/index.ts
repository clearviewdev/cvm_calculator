import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  KeyboardEventHandler,
} from 'react';

interface TextFieldProps {
  label?: string;
  name: string;
  value?: any;
  currency?: string;
  placeholder?: string;
  error?: any;
  type?: string;
  autoFocus?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

interface OutcomeProps {
  label: string;
  value: any;
  withDivider?: boolean;
  showCurrencySymbol?: boolean;
}

type Errors = {
  PoliciesWithHRA?: string | null;
  PoliciesWithoutHRA?: string | null;
  totalHRA?: string | null;
  totalVbcTransfers?: string | null;
  totalReferralSales?: string | null;
  callConversion?: string | null;
  placementRate?: string | null;
  dailySalesAverage?: string | null;
};

interface FormState {
  monthlyCommission: Number;
  total_points: Number;
  commissionPerApp: Number;
  currency?: string;
  errors: Errors;
}

const initialFormState: FormState = {
  monthlyCommission: 0,
  total_points: 0,
  commissionPerApp: 0,
  currency: 'USD',
  errors: {
    PoliciesWithHRA: null,
    PoliciesWithoutHRA: null,
    totalHRA: null,
    totalVbcTransfers: null,
    totalReferralSales: null,
  },
};

export type { TextFieldProps, OutcomeProps, FormState, Errors };
export { initialFormState };
