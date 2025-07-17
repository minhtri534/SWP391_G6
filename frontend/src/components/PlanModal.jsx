import { useFormik } from "formik";
import { X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { addPlan, updatePlan } from "../api/Plan";
import { toast } from "react-toastify";

function PlanModal({ isOpen, onClose, initialValues }) {
	const validation = Yup.object({
		reason: Yup.string().required("Reason is required"),
		startDate: Yup.date().required("Start date is required"),
		goalDate: Yup.date().required("Goal date is required").min(Yup.ref("startDate"), "Goal date must be after start date"),
	});

	// Decide create or update action
	const isUpdating = Boolean(initialValues);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues || {
			reason: "",
			startDate: "",
			goalDate: "",
		},
		onSubmit: async (values) => {
			try {
				console.log(values);
				// const payload = values;
				if (isUpdating) {
					// Do update plan
					await updatePlan(values);
					toast.success("Update plan successfully!!!");
				} else {
					// Do create plan
					await addPlan(values);
					toast.success("Add plan successfully!!!");
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
				<h2 className="text-xl font-semibold mb-4">{initialValues ? "Update Plan" : "Create Plan"}</h2>
				{/* Form body */}
				<form onSubmit={formik.handleSubmit} className="space-y-4">
					<div className="grid gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Reason</label>
							<textarea name="reason" className="w-full border rounded p-2 focus:ring-2 focus:ring-green-300" value={formik.values.reason} onChange={formik.handleChange} />
							{formik.touched.reason && formik.errors.reason && <div className="text-red-500 text-sm mt-1">{formik.errors.reason}</div>}
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Start Date</label>
							<input type="date" name="startDate" className="w-full border rounded p-2 focus:ring-2 focus:ring-green-300" value={formik.values.startDate} onChange={formik.handleChange} />
							{formik.touched.startDate && formik.errors.startDate && <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Goal Date</label>
							<input type="date" name="goalDate" className="w-full border rounded p-2 focus:ring-2 focus:ring-green-300" value={formik.values.goalDate} onChange={formik.handleChange} />
							{formik.touched.goalDate && formik.errors.goalDate && <div className="text-red-500 text-sm mt-1">{formik.errors.goalDate}</div>}
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

export default PlanModal;
