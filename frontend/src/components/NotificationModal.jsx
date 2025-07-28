import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { addNotification, updateNotification } from "../api/Notification";

function NotificationModal({ isOpen, onClose, initialValues, onSuccess }) {
	// Validation schema
	const validation = Yup.object({
		message: Yup.string().required("Notification message is required"),
		type: Yup.string().required("Notification type is required"),
	});

	// Decide create or update action
	const isUpdating = Boolean(initialValues);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues || {
			relatedLogId: 1,
			relatedMilestoneId: 1,
			message: "",
			sendDate: "",
			type: "",
		},
		onSubmit: async (values) => {
			try {
				if (isUpdating) {
					// Do update notification
					const payload = {
						notificationId: initialValues.notificationId,
						message: values.message,
						type: values.type,
					};
					await updateNotification(payload);
					toast.success("Update notification successfully!!!");
				} else {
					// Do adding notification
					const payload = {
						relatedLogId: values.relatedLogId,
						relatedMilestoneId: values.relatedMilestoneId,
						message: values.message,
						sendDate: values.sendDate,
						type: values.type,
					};
					await addNotification(payload);
					toast.success("Add notification successfully!!!");
				}
				if (onSuccess) {
					onSuccess();
				}
				handleClose();
			} catch (error) {
				console.error(error);
				toast.error(error?.response?.data?.message || error.message || "Something went wrong.");
			}
		},
		validationSchema: validation,
	});

	const handleClose = () => {
		formik.resetForm();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
				{console.log(initialValues)}

				{/* Form header */}
				<button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">{initialValues ? "Update Notification" : "Create Notification"}</h2>

				<form key={initialValues ? initialValues.notificationId : "new"} onSubmit={formik.handleSubmit} className="space-y-4">
					<div className="grid gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">Message</label>
							<input
								type="text"
								name="message"
								placeholder="Enter notification message..."
								value={formik.values.message}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded focus:ring-2 focus:ring-green-300"
							/>
							{formik.touched.message && formik.errors.message && <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Notification Type</label>
							<select name="type" value={formik.values.type} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border p-2 rounded focus:ring-2 focus:ring-green-300">
								<option value={""}>---Select Type---</option>
								<option value={"Milestone"}>Milestone</option>
								<option value={"Reminder"}>Reminder</option>
								<option value={"Notify"}>Notify</option>
							</select>
							{formik.touched.type && formik.errors.type && <div className="text-red-500 text-sm mt-1">{formik.errors.type}</div>}
						</div>
					</div>
					<div className="flex justify-end gap-2 mt-4">
						<button type="button" onClick={handleClose} className="px-4 py-2 border rounded hover:bg-gray-100">
							Cancel
						</button>
						<button type="submit" disabled={formik.isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
							{initialValues ? (formik.isSubmitting ? "Updating..." : "Update") : formik.isSubmitting ? "Creating..." : "Create"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default NotificationModal;
