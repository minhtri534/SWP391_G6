import { useFormik } from "formik";
import { X } from "lucide-react";
import React, { useState } from "react";
import * as Yup from "yup";
import { addPlan, updatePlan } from "../api/Plan";
import { toast } from "react-toastify";

function PlanModal({ isOpen, onClose, initialValues }) {
	const validation = Yup.object({
		reason: Yup.string().required("Reason is required"),
		startDate: Yup.date().required("Start date is required"),
		goalDate: Yup.date().required("Goal date is required").min(Yup.ref("startDate"), "Goal date must be after start date"),
		milestones: Yup.array()
			.min(1, "At least one milestone is required")
			.of(
				Yup.object().shape({
					title: Yup.string().required("Title is required"),
					description: Yup.string().required("Description is required"),
					targetDate: Yup.date().required("Target date is required"),
					badge: Yup.string().required("Badge is required"),
				})
			),
	});

	// Decide create or update action
	const isUpdating = Boolean(initialValues);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues || {
			reason: "",
			startDate: "",
			goalDate: "",
			milestones: [],
		},
		onSubmit: async (values) => {
			try {
				console.log(values);
				// const payload = values;
				if (isUpdating) {
					// Do update plan
					// await updatePlan(values);
					toast.success("Update plan successfully!!!");
				} else {
					// Do create plan
					// await addPlan(values);
					toast.success("Add plan successfully!!!");
				}
				handleClose();
			} catch (error) {
				console.error(error);
				toast.error(error?.response?.data?.message || error.message || "Something went wrong.");
			}
		},
		validationSchema: validation,
	});

	//Add milestone to plan function
	const handleAddMilestone = () => {
		const newMilestones = [...formik.values.milestones, { title: "", description: "", targetDate: "", badge: "" }];
		formik.setFieldValue("milestones", newMilestones);
		setEditingIndex(newMilestones.length - 1); // Focus last
	};

	//Remove milestone from plan function
	const handleRemoveMilestone = (index) => {
		const updated = [...formik.values.milestones];
		updated.splice(index, 1);
		formik.setFieldValue("milestones", updated);
	};

	const [editingIndex, setEditingIndex] = useState(null);

	const handleClose = () => {
		formik.resetForm();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
			{console.log(initialValues)}
			<div className="bg-white rounded-lg shadow-lg w-full max-w-svh max-h-[90vh] p-6 relative">
				{/* Form header */}
				<button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">{initialValues ? "Update Plan" : "Create Plan"}</h2>
				{/* Form body */}
				<form onSubmit={formik.handleSubmit}>
					<div className="grid grid-cols-12 gap-6">
						{/* Left section: Plan details */}
						<div className="col-span-5 space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1">Reason</label>
								<textarea name="reason" className="w-full border rounded p-2 focus:ring-2 focus:ring-green-300" value={formik.values.reason} onChange={formik.handleChange} />
								{formik.touched.reason && formik.errors.reason && <div className="text-red-500 text-sm mt-1">{formik.errors.reason}</div>}
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
						</div>

						{/* Divider */}
						<div className="col-span-1 flex justify-center">
							<div className="h-full w-px bg-gray-300" />
						</div>

						{/* Right section: Plan Milestone */}
						<div className="col-span-6 max-h-[60vh] overflow-y-auto space-y-4">
							<h3 className="font-semibold text-lg">Milestones</h3>

							{formik.values.milestones.length === 0 && <p className="text-gray-500 text-sm">No milestones added.</p>}
							{formik.errors.milestones && typeof formik.errors.milestones === "string" && <p className="text-red-500 text-sm">{formik.errors.milestones}</p>}

							{formik.values.milestones.map((milestone, index) => (
								<div key={index} className="border rounded p-4 bg-gray-50 relative">
									{editingIndex !== index ? (
										<div className="cursor-pointer" onClick={() => setEditingIndex(index)}>
											<div className="flex justify-between items-center">
												<div>
													<strong>{milestone.title || "Untitled"}</strong>
													<div className="text-sm text-gray-500">{milestone.badge}</div>
												</div>
												<button
													className="text-red-500 px-1 py-1 hover:border hover:rounded hover:bg-red-500 hover:text-white"
													onClick={(e) => {
														handleRemoveMilestone(index);
														e.stopPropagation();
													}}>
													<X />
												</button>
											</div>
										</div>
									) : (
										<div className="space-y-3">
											<button type="button" className="absolute top-2 right-2 text-red-500 hover:cursor-pointer" onClick={() => handleRemoveMilestone(index)}>
												Remove
											</button>

											<div>
												<label className="block text-sm font-medium">Title</label>
												<input type="text" name={`milestones[${index}].title`} className="w-full border rounded p-2" value={milestone.title} onChange={formik.handleChange} />
												{formik.touched.milestones?.[index]?.title && formik.errors.milestones?.[index]?.title && <div className="text-red-500 text-sm mt-1">{formik.errors.milestones[index].title}</div>}
											</div>

											<div>
												<label className="block text-sm font-medium">Description</label>
												<textarea name={`milestones[${index}].description`} className="w-full border rounded p-2" value={milestone.description} onChange={formik.handleChange} />
												{formik.touched.milestones?.[index]?.description && formik.errors.milestones?.[index]?.description && (
													<div className="text-red-500 text-sm mt-1">{formik.errors.milestones[index].description}</div>
												)}
											</div>

											<div>
												<label className="block text-sm font-medium">Target Date</label>
												<input type="date" name={`milestones[${index}].targetDate`} className="w-full border rounded p-2" value={milestone.targetDate} onChange={formik.handleChange} />
												{formik.touched.milestones?.[index]?.targetDate && formik.errors.milestones?.[index]?.targetDate && (
													<div className="text-red-500 text-sm mt-1">{formik.errors.milestones[index].targetDate}</div>
												)}
											</div>

											<div>
												<label className="block text-sm font-medium">Badge</label>
												<select name={`milestones[${index}].badge`} className="w-full border rounded p-2" value={milestone.badge} onChange={formik.handleChange}>
													<option value="">Select badge</option>
													<option value="Easy">Easy</option>
													<option value="Medium">Medium</option>
													<option value="Hard">Hard</option>
												</select>
												{formik.touched.milestones?.[index]?.badge && formik.errors.milestones?.[index]?.badge && <div className="text-red-500 text-sm mt-1">{formik.errors.milestones[index].badge}</div>}
											</div>
											{/* Done editing */}
											<div className="text-right">
												<button type="button" onClick={() => setEditingIndex(null)} className="text-gray-700 px-2 py-1 border rounded bg-green-200 hover:bg-green-300">
													Done
												</button>
											</div>
										</div>
									)}
								</div>
							))}

							{/* <p className="text-gray-500 text-sm">No Milestone added</p> */}
						</div>
					</div>

					<div className="flex justify-between items-center mt-4">
						{/* Milestone buttons */}
						<div className="flex gap-2">
							<button type="button" onClick={handleAddMilestone} className="px-4 py-2 border rounded bg-green-100 hover:bg-green-400">
								Add Milestone
							</button>
						</div>

						<div className="flex gap-2">
							<button type="button" onClick={handleClose} className="px-4 py-2 border rounded hover:bg-gray-100">
								Cancel
							</button>
							<button type="submit" disabled={formik.isSubmitting} className="px-4 py-2 border rounded bg-green-600 text-white hover:bg-green-700">
								{initialValues ? (formik.isSubmitting ? "Updating..." : "Update") : formik.isSubmitting ? "Creating..." : "Create"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PlanModal;
