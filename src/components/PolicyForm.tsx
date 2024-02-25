import { Formik, Form } from 'formik';
import { addUpdateValidationSchema } from '../validations';
import useInputModalStore from '../store/inputModalStore';
import useComissionStore from '../store/comissionStore';
import { Item } from '../types/Item';
import { createItem, updateItem } from '../api/ComissionAPI';
import { policyNames, thresholdRequired } from '../constants/policyData';
import TextField from './TextField';

export default function PolicyForm({
  name,
  title,
  itemData,
}: {
  name: string;
  title: string;
  itemData?: Item;
}) {
  const { editId, completeEdit } = useInputModalStore((state) => state);
  const { items, setItems } = useComissionStore((state) => state);

  const initialData: Item = {
    name,
  };

  const isThresholdRequired = thresholdRequired.includes(name);

  const handleAddOrUpdate = async (values: Item) => {
    if (!!editId) {
      const updatedItem = await updateItem(values._id!, values);
      const newItems = items.map((e) => {
        if (itemData?._id === e._id) {
          return updatedItem;
        }
        return e;
      });
      setItems(newItems);
    } else {
      const newitem = await createItem(values);
      items.push(newitem);
      setItems(items);
    }
    completeEdit();
  };

  const handleCancel = () => {
    completeEdit();
  };

  return (
    <Formik
      initialValues={itemData || initialData}
      validationSchema={addUpdateValidationSchema}
      onSubmit={handleAddOrUpdate}
    >
      {({ handleChange, values, errors }) => (
        <Form>
          <div className="w-full bg-white shadow-md px-8 pt-6 pb-8 mb-4 mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-13 mt-16 lg:mx-0">
            <h1 className="text-2xl font-bold tracking-tight text-brand mb-2 text-center justify-center">
              {!!editId ? 'Edit Property' : 'Add Property'}
            </h1>

            <div className="mb-4">
              <TextField
                label="Title"
                name="Title"
                value={title}
                error={errors.name}
                readOnly={true}
              />
            </div>

            {isThresholdRequired && (
              <div className="mb-4">
                <TextField
                  label={
                    policyNames.POINT_SCALE === name ? 'Points' : 'Threshold'
                  }
                  name="threshold"
                  value={values.threshold}
                  onChange={handleChange}
                  error={errors.threshold}
                />
              </div>
            )}

            <div className="mb-4">
              <TextField
                label={
                  policyNames.POINT_SCALE === name
                    ? 'Commission (w/ HRA)'
                    : 'Points'
                }
                name="points"
                value={values.points}
                onChange={handleChange}
                error={errors.points}
              />
            </div>

            {name === policyNames.POINT_SCALE && (
              <div className="mb-4">
                <TextField
                  label="Commission (w/o HRA)"
                  name="nonHraPoints"
                  value={values.nonHraPoints}
                  onChange={handleChange}
                  error={errors.nonHraPoints}
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex-2 btn btn-primary mr-10 hover:bg-blue-500"
              >
                {!!editId ? 'Update' : 'Create'}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white hover:bg-gray-500 flex-2 btn btn-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
