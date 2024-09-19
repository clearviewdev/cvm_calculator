export const policyNames = {
  INBOUND_CALL_CONVERSION: "inbound_call_conversion",
  INBOUND_PLACEMENT_RATE: "inbound_placement_rate",
  INBOUND_DAILY_SALES: "inbound_daily_sales_average",
  OUTBOUND_CALL_CONVERSION: "outbound_call_conversion",
  OUTBOUND_PLACEMENT_RATE: "outbound_placement_rate",
  OUTBOUND_DAILY_SALES: "outbound_daily_sales_average",
  HRA: "health_reimbursement_arrangements",
  VBC: "value_based_care",
  REFERRAL_BONUS: "referral_bonus",
  OUTBOUND_POINT_SCALE: "outbound_point_scale",
  INBOUND_POINT_SCALE: "inbound_point_scale",
  INBOUND_SAVES: "inbound_saves",
  OUTBOUND_SAVES: "outbound_saves",
};

export const policyTitles = {
  OUTBOUND_CALL_CONVERSION: "Call Conversion (Outbound)",
  OUTBOUND_PLACEMENT_RATE: "Placement Rate (Outbound)",
  OUTBOUND_DAILY_SALES: "Daily Sales Average (Outbound)",
  INBOUND_CALL_CONVERSION: "Call Conversion (Inbound)",
  INBOUND_PLACEMENT_RATE: "Placement Rate (Inbound)",
  INBOUND_DAILY_SALES: "Daily Sales Average (Inbound)",
  HRA: "Health Reimbursement Arrangements (HRA)",
  VBC: "Value Based Care (VBC)",
  REFERRAL_BONUS: "Referral Bonus",
  POINT_SCALE: "Point Scale",
};

export const inboundColumn = [
  "INBOUND_CALL_CONVERSION",
  "INBOUND_PLACEMENT_RATE",
  "INBOUND_DAILY_SALES",
  "INBOUND_SAVES",
  "INBOUND_POINT_SCALE",
];

export const outboundColumn = [
  "OUTBOUND_CALL_CONVERSION",
  "OUTBOUND_PLACEMENT_RATE",
  "OUTBOUND_DAILY_SALES",
  "OUTBOUND_SAVES",
  "OUTBOUND_POINT_SCALE",
];

export const restColumn = ["HRA", "VBC", "REFERRAL_BONUS"];

export const showDollarSign = [
  policyNames.HRA,
  policyNames.VBC,
  policyNames.REFERRAL_BONUS,
  policyNames.INBOUND_POINT_SCALE,
  policyNames.OUTBOUND_POINT_SCALE,
];

export const thresholdRequired = [
  policyNames.INBOUND_CALL_CONVERSION,
  policyNames.INBOUND_PLACEMENT_RATE,
  policyNames.INBOUND_DAILY_SALES,
  policyNames.INBOUND_POINT_SCALE,
  policyNames.INBOUND_SAVES,
  policyNames.OUTBOUND_CALL_CONVERSION,
  policyNames.OUTBOUND_PLACEMENT_RATE,
  policyNames.OUTBOUND_DAILY_SALES,
  policyNames.OUTBOUND_POINT_SCALE,
  policyNames.OUTBOUND_SAVES,
];

export const showPercentage = [
  policyNames.INBOUND_CALL_CONVERSION,
  policyNames.INBOUND_PLACEMENT_RATE,
  policyNames.OUTBOUND_CALL_CONVERSION,
  policyNames.OUTBOUND_PLACEMENT_RATE,
];
