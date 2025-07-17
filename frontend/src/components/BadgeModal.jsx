import { useFormik } from "formik";
import { X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { addBadge, updateBadge } from "../api/Badges";
import { toast } from "react-toastify";

function BadgeModal({ isOpen, onClose, initialValues }) {
	const validation = Yup.object({
		badgeName: Yup.string().required("Badge name is required"),
		description: Yup.string().max(100, "Description limit 100 characters"),
		conditionType: Yup.number().required("Condition Type is required"),
		value: Yup.number().required("Value is required"),
		imageUrl: Yup.string().url("Must be a valid URL").nullable(),
	});

	// Decide create or update action
	const isUpdating = Boolean(initialValues);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues || {
			badgeName: "",
			description: "",
			conditionType: 1,
			value: 0,
			imageUrl: "",
		},
		onSubmit: async (values) => {
			try {
				console.log(values);
				if (isUpdating) {
					// Do updating account
					await updateBadge();
					toast.success("Update badge successfully!!!");
				} else {
					// Do creating account
					await addBadge();
					toast.success("Add badge successfully!!!");
				}
				onClose();
			} catch (error) {
				console.error(error);
				toast.error(error?.response?.data?.message || error.message || "Something went wrong.");
			}
		},
		validationSchema: validation,
	});

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			{console.log(initialValues)}
			<div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
				{/* Form header */}
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">{initialValues ? "Update Badge" : "Create Badge"}</h2>

				{/* Form body */}
				<form onSubmit={formik.handleSubmit} className="space-y-4">
					<div className="grid gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">Badge Name</label>
							<input
								type="text"
								name="badgeName"
								placeholder="Enter badge name..."
								value={formik.values.badgeName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded focus:ring-2 focus:ring-green-300"
							/>
							{formik.touched.badgeName && formik.errors.badgeName && <div className="text-red-500 text-sm mt-1">{formik.errors.badgeName}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Description</label>
							<textarea
								name="description"
								placeholder="Enter description..."
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded focus:ring-2 focus:ring-green-300"
							/>
							{formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Condition Type</label>
							<select
								name="conditionType"
								value={formik.values.conditionType}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded focus:ring-2 focus:ring-green-300">
								<option value={1}>New Member</option>
								<option value={2}>Old Member</option>
							</select>
							{formik.touched.conditionType && formik.errors.conditionType && <div className="text-red-500 text-sm mt-1">{formik.errors.conditionType}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Value</label>
							<input
								type="number"
								name="value"
								value={formik.values.value}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded focus:ring-2 focus:ring-green-300"
							/>
							{formik.touched.value && formik.errors.value && <div className="text-red-500 text-sm mt-1">{formik.errors.value}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Image URL</label>
							<input
								type="text"
								name="imageUrl"
								placeholder="https://..."
								value={formik.values.imageUrl}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded focus:ring-2 focus:ring-green-300"
							/>
							{formik.touched.imageUrl && formik.errors.imageUrl && <div className="text-red-500 text-sm mt-1">{formik.errors.imageUrl}</div>}
						</div>
					</div>
					<div className="flex justify-end gap-2 mt-4">
						<button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
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

export default BadgeModal;
