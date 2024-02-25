import * as Yup from 'yup';
import { policyNames, thresholdRequired } from '../constants/policyData';

export const formValidationSchema = Yup.object({
  PoliciesWithHRA: Yup.number()
    .typeError('Must be a number')
    .required('Required'),
  PoliciesWithoutHRA: Yup.number()
    .typeError('Must be a number')
    .required('Required'),
  totalHRA: Yup.number().typeError('Must be a number').required('Required'),
  totalVbcTransfers: Yup.number()
    .typeError('Must be a number')
    .required('Required'),
  totalReferralSales: Yup.number()
    .typeError('Must be a number')
    .required('Required'),
  callConversion: Yup.number()
    .typeError('Must be a number')
    .required('Required'),
  placementRate: Yup.number()
    .typeError('Must be a number')
    .required('Required'),
  dailySalesAverage: Yup.number()
    .typeError('Must be a number')
    .required('Required'),
});

export const addUpdateValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  points: Yup.number().typeError('Must be a number').required(), // Add any validation for otherField as needed
  threshold: Yup.number()
    .typeError('Must be a number')
    .when('name', {
      is: (name: string) => thresholdRequired.includes(name),
      then: (schema) => schema.required(),
    }),
  nonHraPoints: Yup.number()
    .typeError('Must be a number')
    .when('name', {
      is: (name: string) => name === policyNames.POINT_SCALE,
      then: (schema) => schema.required(),
    }),
});
