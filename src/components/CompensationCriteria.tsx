import Table from "./Table";
import {
  inboundColumn,
  outboundColumn,
  policyNames,
  policyTitles,
  restColumn,
} from "../constants/policyData";
import Modal from "./Modal";
import PolicyForm from "./PolicyForm";
import useInputModalStore from "../store/inputModalStore";
import useComissionStore from "../store/comissionStore";
import { Item, PolicyKey } from "../types/Item";
import SegmentedControl from "./SegmentedControl";
import { useState } from "react";

const CompensationCriteria = () => {
  const { editId, policyName } = useInputModalStore((state) => state);
  const { items, fields } = useComissionStore((state) => state);

  const [selectedValue, setSelectedValue] = useState("Inbound");

  const foundItem: Item | undefined = items?.find(
    (item) => item?._id === editId
  );

  const name = foundItem?.name || policyName;

  const nameKey = fields.find(
    (feild) => policyNames[name as PolicyKey] === feild.originalName
  );

  const findTitle = fields.find((feild) => name === feild.originalName)?.name;
  const title = foundItem?.field?.name || findTitle;

  function handleSegmentChange(value: string) {
    setSelectedValue(value);
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h2
          style={{ color: "#122d42" }}
          className="text-5xl font-bold tracking-tight text-brand text-center mb-20"
        >
          Compensation Criteria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <div className="flex overflow-hidden w-full justify-center py-1 px-8">
              <SegmentedControl
                value={selectedValue}
                options={["Inbound", "Outbound"]}
                onChange={handleSegmentChange}
              />
            </div>
            {(selectedValue === "Inbound" ? inboundColumn : outboundColumn).map(
              (key) => (
                <div key={key} className="mt-4">
                  <Table filterKey={key} />
                </div>
              )
            )}
          </div>
          <div className="md:col-span-1 mt-4 md:mt-0">
            <h2
              style={{ color: "#122d42" }}
              className="text-3xl font-bold tracking-tight text-brand text-center mt-5 mb-5"
            >
              Common Settings
            </h2>
            {restColumn.map((key) => (
              <div key={key} className="mt-4">
                <Table filterKey={key} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal>
        {(foundItem || name) && (
          <PolicyForm title={title!} name={name!} itemData={foundItem} />
        )}
      </Modal>
    </>
  );
};

export default CompensationCriteria;
