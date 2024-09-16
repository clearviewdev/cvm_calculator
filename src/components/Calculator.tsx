import { useState, useEffect } from "react";
import { useFormik } from "formik";
import TextField from "./TextField";
import { initialFormState } from "../types";
import { formValidationSchema } from "../validations";
import { calculateOutcome } from "../utils/comissionCalculation";
import useComissionStore from "../store/comissionStore";
import SegmentedControl from "../components/SegmentedControl";

function Calculator({ form, setForm, scroll }: any) {
  const items = useComissionStore((state) => state.items);
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
    },
    validationSchema: formValidationSchema,
    onSubmit: ({
      PoliciesWithHRA,
      PoliciesWithoutHRA,
      totalHRA,
      totalVbcTransfers,
      totalReferralSales,
      callConversion,
      placementRate,
      dailySalesAverage,
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

    if (selectedValue === "Outbound") {
      setFieldValue("callConversion", 0);
      setFieldValue("PoliciesWithoutHRA", 0);
      setFieldValue("totalHRA", 0);
      setFieldValue("totalVbcTransfers", 0);
    }
  };

  function handleSegmentChange(value: string) {
    setSelectedValue(value);
    resetForm();
    setForm({
      ...initialFormState,
    });
    if (value === "Outbound") {
      setFieldValue("callConversion", 0);
      setFieldValue("PoliciesWithoutHRA", 0);
      setFieldValue("totalHRA", 0);
      setFieldValue("totalVbcTransfers", 0);
    }
  }

  useEffect(() => {
    if (selectedValue === "Outbound") {
      setFieldValue("callConversion", 0);
      setFieldValue("PoliciesWithoutHRA", 0);
      setFieldValue("totalHRA", 0);
      setFieldValue("totalVbcTransfers", 0);
    }
  }, [selectedValue, setFieldValue]);

  const getLabel = (originalName: string) => {
    const item = items.find(
      (item) => item.field?.originalName === originalName
    );
    return item ? item.field?.name : ""; // Fallback to "Unknown Label" if undefined
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
            onChange={handleSegmentChange}
          />
          <div className="grid grid-cols-1 gap-x-16 gap-y-5 sm:grid-cols-2 sm:gap-y-10">
            {/* Render fields conditionally */}
            {selectedValue === "Inbound" && (
              <>
                <TextField
                  name="PoliciesWithHRA"
                  label="Policies with HRA's" // Dynamic label
                  value={PoliciesWithHRA}
                  error={touched.PoliciesWithHRA && errors.PoliciesWithHRA}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="i.e. 5"
                />
                <TextField
                  name="PoliciesWithoutHRA"
                  label="Policies without HRA's" // Dynamic label
                  value={PoliciesWithoutHRA}
                  error={
                    touched.PoliciesWithoutHRA && errors.PoliciesWithoutHRA
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="i.e. 5"
                />
                <TextField
                  name="totalHRA"
                  label={getLabel("health_reimbursement_arrangements") || ""}
                  value={totalHRA}
                  error={touched.totalHRA && errors.totalHRA}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="i.e. 5"
                />
                <TextField
                  name="callConversion"
                  label={getLabel("inbound_call_conversion") || ""}
                  value={callConversion}
                  error={touched.callConversion && errors.callConversion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="i.e. 12.25"
                />
                <TextField
                  name="totalVbcTransfers"
                  label={getLabel("value_based_care") || ""}
                  value={totalVbcTransfers}
                  error={touched.totalVbcTransfers && errors.totalVbcTransfers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="i.e. 5"
                />
              </>
            )}

            {/* Outbound only displays the specified fields */}
            {selectedValue === "Outbound" && (
              <>
                <TextField
                  name="PoliciesWithHRA"
                  label="Total Policies"
                  value={PoliciesWithHRA}
                  error={touched.PoliciesWithHRA && errors.PoliciesWithHRA}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="i.e. 15"
                />
              </>
            )}

            {/* Common fields for both Inbound and Outbound with dynamic labels */}
            <TextField
              name="placementRate"
              label={
                selectedValue === "Inbound"
                  ? getLabel("inbound_placement_rate") ||
                    "Inbound Placement Rate"
                  : getLabel("outbound_placement_rate") ||
                    "Outbound Placement Rate"
              } // Dynamic label based on inbound/outbound
              value={placementRate}
              error={touched.placementRate && errors.placementRate}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="i.e. 85"
            />
            <TextField
              name="dailySalesAverage"
              label={
                selectedValue === "Inbound"
                  ? getLabel("inbound_daily_sales_average") ||
                    "Inbound Daily Sales Average"
                  : getLabel("outbound_daily_sales_average") ||
                    "Outbound Daily Sales Average"
              } // Dynamic label based on inbound/outbound
              value={dailySalesAverage}
              error={touched.dailySalesAverage && errors.dailySalesAverage}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="i.e. 2.5"
            />
            <TextField
              name="totalReferralSales"
              label={getLabel("referral_bonus") || "Referral Bonus"}
              value={totalReferralSales}
              error={touched.totalReferralSales && errors.totalReferralSales}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="i.e. 2"
            />
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
