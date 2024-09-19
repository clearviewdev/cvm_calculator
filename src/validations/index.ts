import * as Yup from "yup";
import { policyNames, thresholdRequired } from "../constants/policyData";
import { Field } from "../types/Item";

// Define your form validation schema function
export const formValidationSchema = (
  items: Field[],
  segment: "inbound" | "outbound"
) => {
  // Helper function to check if the item exists in the 'items' array
  const shouldValidate = (fieldName: string) => {
    return !!items.find((el) => el.originalName.includes(fieldName))?.name;
  };

  // Function to generate validation rules for either 'inbound' or 'outbound' values
  const getSegmentFieldValidation = (segmentField: string) => {
    return shouldValidate(segmentField)
      ? Yup.number().typeError("Must be a number").required("Required")
      : Yup.mixed().notRequired();
  };

  // Define the fields dynamically based on the segment
  const isInbound = segment === "inbound";

  return Yup.object({
    PoliciesWithHRA: Yup.number()
      .typeError("Must be a number")
      .required("Required"),
    PoliciesWithoutHRA: Yup.number()
      .typeError("Must be a number")
      .required("Required"),
    totalHRA: shouldValidate(policyNames.HRA)
      ? Yup.number().typeError("Must be a number").required("Required")
      : Yup.mixed().notRequired(),
    totalVbcTransfers: shouldValidate(policyNames.VBC)
      ? Yup.number().typeError("Must be a number").required("Required")
      : Yup.mixed().notRequired(),
    totalReferralSales: shouldValidate(policyNames.REFERRAL_BONUS)
      ? Yup.number().typeError("Must be a number").required("Required")
      : Yup.mixed().notRequired(),

    // Validation for the segment (Inbound or Outbound) fields
    callConversion: getSegmentFieldValidation(
      isInbound ? "inbound_call_conversion" : "outbound_call_conversion"
    ),
    placementRate: getSegmentFieldValidation(
      isInbound ? "inbound_placement_rate" : "outbound_placement_rate"
    ),
    dailySalesAverage: getSegmentFieldValidation(
      isInbound ? "inbound_daily_sales_average" : "outbound_daily_sales_average"
    ),
    totalSaves: getSegmentFieldValidation(
      isInbound ? "inbound_saves" : "outbound_saves"
    ),
  });
};

export const addUpdateValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  points: Yup.number().typeError("Must be a number").required(),
  threshold: Yup.number()
    .typeError("Must be a number")
    .when("name", {
      is: (name: string) => thresholdRequired.includes(name),
      then: (schema) => schema.required(),
    }),
  nonHraPoints: Yup.number()
    .typeError("Must be a number")
    .when("name", {
      is: (name: string) =>
        policyNames.INBOUND_POINT_SCALE === name ||
        policyNames.OUTBOUND_POINT_SCALE === name,
      then: (schema) => schema.required(),
    }),
});
