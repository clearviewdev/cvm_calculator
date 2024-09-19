import { useState } from "react";
import { useFormik } from "formik";
import TextField from "./TextField";
import { initialFormState } from "../types";
import { formValidationSchema } from "../validations"; // Updated validation schema
import { calculateOutcome } from "../utils/comissionCalculation";
import useComissionStore from "../store/comissionStore";
import SegmentedControl from "../components/SegmentedControl";

function Calculator({ form, setForm, scroll }: any) {
  const { items, fields } = useComissionStore((state) => state);
  const [selectedValue, setSelectedValue] = useState("Inbound");

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    touched,
    errors,
    setFieldValue,
    values: {
      PoliciesWithHRA,
      PoliciesWithoutHRA,
      totalHRA,
      totalVbcTransfers,
      totalReferralSales,
      callConversion,
      placementRate,
      dailySalesAverage,
      totalSaves,
    },
  } = useFormik({
    initialValues: {
      PoliciesWithHRA: "",
      PoliciesWithoutHRA: "",
      totalHRA: "",
      totalVbcTransfers: "",
      totalReferralSales: "",
      callConversion: "",
      placementRate: "",
      dailySalesAverage: "",
      totalSaves: "",
    },
    validationSchema: formValidationSchema(
      fields,
      selectedValue === "Inbound" ? "inbound" : "outbound"
    ), // Pass the segment value
    enableReinitialize: true, // Reinitialize when selectedValue changes
    onSubmit: ({
      PoliciesWithHRA,
      PoliciesWithoutHRA,
      totalHRA,
      totalVbcTransfers,
      totalReferralSales,
      callConversion,
      placementRate,
      dailySalesAverage,
      totalSaves,
    }) => {
      const { monthlyCommission, total_points, commissionPerApp } =
        calculateOutcome({
          PoliciesWithHRA,
          PoliciesWithoutHRA,
          totalHRA,
          totalVbcTransfers,
          totalReferralSales,
          callConversion,
          placementRate,
          dailySalesAverage,
          totalSaves,
          items,
          isInbound: selectedValue === "Inbound",
        });

      scroll();
      setForm({
        ...form,
        monthlyCommission,
        total_points,
        commissionPerApp,
      });
    },
  });

  const onReset = () => {
    resetForm();
    setForm({
      ...initialFormState,
    });
  };

  function handleSegmentChange(value: string) {
    setSelectedValue(value); // Update the segment value
    resetForm(); // Reset the form when switching segments
    setForm({
      ...initialFormState,
    });
  }

  const getLabel = (originalName: string) => {
    const field = fields.find((field) => field.originalName === originalName);
    return field ? field.name : "";
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-13 lg:mx-0 lg:flex lg:max-w-none">
      <div className="px-4 py-6 md:p-8 sm:p-10 lg:flex-auto items-center flex">
        <form
          method="POST"
          autoComplete="off"
          className="space-y-8 w-full"
          onSubmit={handleSubmit}
        >
          <SegmentedControl
            value={selectedValue}
            options={["Inbound", "Outbound"]}
            onChange={handleSegmentChange} // Trigger form reset and revalidation
          />

          <div className="grid grid-cols-1 gap-x-16 gap-y-5 sm:grid-cols-2 sm:gap-y-10">
            {/* Policies with HRA Textbox */}
            <TextField
              name="PoliciesWithHRA"
              label={"Policies with HRA's"}
              value={PoliciesWithHRA}
              error={touched.PoliciesWithHRA && errors.PoliciesWithHRA}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="i.e. 5"
            />
            {/* Policies without HRA Textbox */}
            <TextField
              name="PoliciesWithoutHRA"
              label="Policies without HRA's"
              value={PoliciesWithoutHRA}
              error={touched.PoliciesWithoutHRA && errors.PoliciesWithoutHRA}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="i.e. 5"
            />
            {/* Call Conversion Textbox */}
            {(selectedValue === "Inbound"
              ? getLabel("inbound_call_conversion")
              : getLabel("outbound_call_conversion")) && (
              <TextField
                name="callConversion"
                label={
                  selectedValue === "Inbound"
                    ? getLabel("inbound_call_conversion")
                    : getLabel("outbound_call_conversion")
                }
                value={callConversion}
                error={touched.callConversion && errors.callConversion}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="i.e. 12.25"
              />
            )}
            {/* Placement Rate Textbox */}
            {(selectedValue === "Inbound"
              ? getLabel("inbound_placement_rate")
              : getLabel("outbound_placement_rate")) && (
              <TextField
                name="placementRate"
                label={
                  selectedValue === "Inbound"
                    ? getLabel("inbound_placement_rate")
                    : getLabel("outbound_placement_rate")
                }
                value={placementRate}
                error={touched.placementRate && errors.placementRate}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="i.e. 85"
              />
            )}
            {/* Daily Sales Average Textbox */}
            {(selectedValue === "Inbound"
              ? getLabel("inbound_daily_sales_average")
              : getLabel("outbound_daily_sales_average")) && (
              <TextField
                name="dailySalesAverage"
                label={
                  selectedValue === "Inbound"
                    ? getLabel("inbound_daily_sales_average")
                    : getLabel("outbound_daily_sales_average")
                }
                value={dailySalesAverage}
                error={touched.dailySalesAverage && errors.dailySalesAverage}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="i.e. 2.5"
              />
            )}
            {/* Saves Textbox */}
            {(selectedValue === "Inbound"
              ? getLabel("inbound_saves")
              : getLabel("outbound_saves")) && (
              <TextField
                name="totalSaves"
                label={
                  selectedValue === "Inbound"
                    ? getLabel("inbound_saves")
                    : getLabel("outbound_saves")
                }
                value={totalSaves}
                error={touched.totalSaves && errors.totalSaves}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="i.e. 12.25"
              />
            )}
            {/* HRA Textbox */}
            {getLabel("health_reimbursement_arrangements") && (
              <TextField
                name="totalHRA"
                label={getLabel("health_reimbursement_arrangements")}
                value={totalHRA}
                error={touched.totalHRA && errors.totalHRA}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="i.e. 5"
              />
            )}
            {/* VBC Textbox */}
            {getLabel("value_based_care") && (
              <TextField
                name="totalVbcTransfers"
                label={getLabel("value_based_care")}
                value={totalVbcTransfers}
                error={touched.totalVbcTransfers && errors.totalVbcTransfers}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="i.e. 5"
              />
            )}
            {/* Referral Bonus Textbox */}
            {getLabel("referral_bonus") && (
              <TextField
                name="totalReferralSales"
                label={getLabel("referral_bonus")}
                value={totalReferralSales}
                error={touched.totalReferralSales && errors.totalReferralSales}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="i.e. 2"
              />
            )}
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="flex-1 btn btn-primary">
              Calculate
            </button>
            <button
              type="button"
              onClick={onReset}
              className="flex-1 btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Calculator;
