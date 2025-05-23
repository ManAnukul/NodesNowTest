import { Dialog } from "@headlessui/react";

import TaskType from "../../../Types/TaskType";
import EditTaskModalProps from "../../../Types/EditTaskModalProps";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
});

function EditTaskModal({ isOpen, onClose, task, onEdit }: EditTaskModalProps) {
  const formik = useFormik({
    initialValues: task || { title: "", description: "" },
    validationSchema,
    onSubmit: (values: TaskType) => {
      const updatedTask = { ...values, id: task.id };
      onEdit(task.id, updatedTask);
      onClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm"
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
        data-cy="edit-task-modal"
        data-testid="edit-task-modal"
      >
        <Dialog.Title className="text-xl font-bold mb-4">
          Edit Task
        </Dialog.Title>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              aria-label="edit-task-title-input"
              data-cy="edit-task-title-input"
              className="w-full border rounded p-2"
              placeholder="Task title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-600 text-sm">{formik.errors.title}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="block">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full border rounded p-2"
              placeholder="Task description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-600 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>

          <div className="mb-3">
            <span className="font-semibold text-gray-700">Status:</span>
            <span
              className={`mx-2 px-4 py-1 rounded-[20px] text-sm ${
                formik.values.status === "completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {formik.values.status}
            </span>
            {formik.touched.status && formik.errors.status && (
              <div className="text-red-600 text-sm">{formik.errors.status}</div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              aria-label="submit-edit-task-button"
              data-cy="submit-edit-task-button"
              className="px-4 py-2 bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 disabled:bg-gray-300 w-[5rem]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default EditTaskModal;
