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
  const items = useComissionStore((state) => state.items);

  const [selectedValue, setSelectedValue] = useState("Inbound");

  const foundItem: Item | undefined = items?.find(
    (item) => item?._id === editId
  );

  const name = foundItem?.name || policyName;

  const nameKey = Object.keys(policyNames).find(
    (key) => policyNames[key as PolicyKey] === name
  );

  const title = nameKey ? policyTitles[nameKey as PolicyKey] : "";

  function handleSegmentChange(value: string) {
    setSelectedValue(value);
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-5xl font-bold tracking-tight text-brand text-center mb-10">
          Criteria Settings
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
          <PolicyForm title={title} name={name!} itemData={foundItem} />
        )}
      </Modal>
    </>
  );
};

export default CompensationCriteria;
