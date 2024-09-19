import { policyNames, thresholdRequired } from "../constants/policyData";
import useComissionStore from "../store/comissionStore";
import { Item, PolicyKey } from "../types/Item";
import TableItem from "./TableItem";
import useInputModalStore from "../store/inputModalStore";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import EditableText from "./EditableText";

function Table({ filterKey }: { filterKey: string }) {
  const { items, fields } = useComissionStore((state) => state);
  const setEdit = useInputModalStore((state) => state.setEdit);

  const filterItems = items
    ?.filter((item) => item?.name === policyNames[filterKey as PolicyKey])
    .sort((a, b) => a.points! - b.points!);

  async function handleAddPolicy() {
    setEdit(null, policyNames[filterKey as PolicyKey]);
  }

  const renderThreshold = thresholdRequired.includes(
    policyNames[filterKey as PolicyKey]
  );

  const title =
    fields?.find(
      (field) => field.originalName === policyNames[filterKey as PolicyKey]
    )?.name ?? "";

  const filterFields = fields?.filter(
    (field) => field?.originalName === policyNames[filterKey as PolicyKey]
  );

  const isPointScale =
    policyNames.INBOUND_POINT_SCALE === policyNames[filterKey as PolicyKey] ||
    policyNames.OUTBOUND_POINT_SCALE === policyNames[filterKey as PolicyKey];

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-11/12 mx-auto ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-13 my-8 overflow-x-auto">
        <div className="flex justify-between items-center">
          <EditableText
            id={filterFields?.[0]?._id}
            initialText={title}
            isPointScale={isPointScale}
          />
          {renderThreshold && (
            <button
              onClick={handleAddPolicy}
              className="flex items-center justify-center bg-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <PlusCircleIcon width={30} className="ml-1 text-blue-600" />
            </button>
          )}
        </div>
        <div className="flex flex-1 justify-between items-center py-2">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                {/* Conditionally render column headers */}
                {renderThreshold && (
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    {isPointScale ? "Points" : "Threshold"}
                  </th>
                )}
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  {isPointScale ? "Commission (w/ HRA)" : "Points"}
                </th>

                {isPointScale && (
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    {isPointScale ? "Commission (w/o HRA)" : "Points"}
                  </th>
                )}
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filterItems?.map((item: Item) => (
                <TableItem key={item._id} {...item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
