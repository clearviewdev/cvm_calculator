import { deleteItem } from '../api/ComissionAPI';
import {
  policyNames,
  showDollarSign,
  showPercentage,
  thresholdRequired,
} from '../constants/policyData';
import useComissionStore from '../store/comissionStore';
import useInputModalStore from '../store/inputModalStore';
import { Item } from '../types/Item';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function TableItem({
  name,
  _id,
  points,
  threshold,
  nonHraPoints,
}: Item) {
  const { removeItem } = useComissionStore((state) => state);
  const setEdit = useInputModalStore((state) => state.setEdit);

  async function handleDelete(id: string) {
    await deleteItem(id);
    removeItem(id);
  }

  const isPointScale =
    policyNames.INBOUND_POINT_SCALE === name ||
    policyNames.OUTBOUND_POINT_SCALE === name;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* Render threshold only if name is not one of the specified values */}
      {thresholdRequired.includes(name!) && (
        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-center">
          {threshold
            ? showPercentage.includes(name!)
              ? `${threshold}%`
              : threshold
            : 'N/A'}
        </td>
      )}
      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-center">
        {showDollarSign.includes(name!)
          ? `$${points || 'N/A'}`
          : points || 'N/A'}
      </td>

      {isPointScale && (
        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-center">
          {nonHraPoints ? `$${nonHraPoints}` : 'N/A'}
        </td>
      )}

      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-center">
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              setEdit(_id!);
            }}
            className="mr-3 flex items-center bg-blue-500 text-white px-4 py-2 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Edit
            <PencilSquareIcon width={20} className="ml-1 text-white" />
          </button>
          {/* Conditionally render the delete button based on the name value */}
          {thresholdRequired.includes(name!) && (
            <button
              onClick={() => {
                handleDelete(_id!);
              }}
              className="mr-3 flex items-center bg-red-500 text-white px-4 py-2 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              Delete
              <TrashIcon width={20} className="ml-1 text-white" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
