import { useFormik } from "formik";
import { X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { addUser, updateUser } from "../api/Users";
import { toast } from "react-toastify";

function AccountModal({ isOpen, onClose, initialValues, onSuccess }) {
	// Input field validation schemes
	const validation = Yup.object({
		userName: Yup.string().required("Username is required"),
		age: Yup.number().required("Age is required").min(0, "Age cannot be negative").max(150, "This age is invalid"),
		gender: Yup.string().required("Please choose a gender"),
		phoneNum: Yup.string()
			.matches(/^0\d{9}$/, "Phone number must be 10 digits and start with 0")
			.required("Phone number is required"),
		experience: Yup.number().required("Experience is required").min(0, "Experience cannot be negative").max(150, "Invalid years of experience"),
		availableTime: Yup.string().required("Need avalable time"),
		specialty: Yup.string().required("Specialty is required"),
	});

	// Decide create or update action
	const isUpdating = Boolean(initialValues);

	// Form control
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues || {
			userName: "",
			age: 0,
			gender: "",
			phoneNum: "",
			password: "123456", //Default for every coach
			experience: 0,
			availableTime: "",
			specialty: "",
		},
		onSubmit: async (values) => {
			console.log(values);
			try {
				const payload = {
					userName: values.userName,
					phoneNum: values.phoneNum,
					password: values.password,
					gender: values.gender,
					age: values.age,
					experience: values.experience,
					availableTime: values.availableTime,
					specialty: values.specialty,
				};
				if (isUpdating) {
					// Do updating account
					await updateUser(payload);
					toast.success("Account updated successfully!");
				} else {
					// Do add coach account
					await addUser(payload);
					toast.success("Account created successfully!");
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
				{/* Form header */}
				<button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">{initialValues ? "Update Coach Account" : "Add Coach Account"}</h2>

				{/* Form body */}
				<form onSubmit={formik.handleSubmit} className="space-y-4">
					{/* Coach info */}
					<h3 className="text-md font-semibold text-gray-700 mb-2">Coach Info</h3>
					<div>
						<label className="block text-sm font-medium text-gray-700">Coach Username</label>
						<input
							type="text"
							name="userName"
							placeholder="Enter coach username..."
							value={formik.values.userName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full border p-2 rounded"
						/>
						{formik.touched.userName && formik.errors.userName && <div className="text-red-500 text-sm mt-1">{formik.errors.userName}</div>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Password</label>
						<input
							name="password"
							type="password"
							placeholder="Enter password..."
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							disabled
							className="w-full border p-2 rounded"
						/>
						{formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Phone Number</label>
						<input
							type="tel"
							name="phoneNum"
							placeholder="Enter phone number..."
							value={formik.values.phoneNum}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full border p-2 rounded"
						/>
						{formik.touched.phoneNum && formik.errors.phoneNum && <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNum}</div>}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">Age</label>
							<input type="number" name="age" placeholder="Enter age..." value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border p-2 rounded" />
							{formik.touched.age && formik.errors.age && <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">Gender</label>
							<select name="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border p-2 rounded">
								<option value="">Select gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
							{formik.touched.gender && formik.errors.gender && <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>}
						</div>
					</div>

					{/* Coaching experience info */}
					<h3 className="text-md font-semibold text-gray-700 mb-2">Coach Experience</h3>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">Years of Experience</label>
							<input
								type="number"
								name="experience"
								placeholder="Enter experience..."
								value={formik.values.experience}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded"
							/>
							{formik.touched.experience && formik.errors.experience && <div className="text-red-500 text-sm mt-1">{formik.errors.experience}</div>}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">Available Time</label>
							<select name="availableTime" value={formik.values.availableTime} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border p-2 rounded">
								<option value="">Select availability</option>
								<option value="All time">All time</option>
								<option value="Weekend">Weekend</option>
								<option value="Monday to Friday">Monday to Friday</option>
							</select>
							{formik.touched.availableTime && formik.errors.availableTime && <div className="text-red-500 text-sm mt-1">{formik.errors.availableTime}</div>}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Specialty</label>
						<input
							type="text"
							name="specialty"
							placeholder="Enter specialty..."
							value={formik.values.specialty}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full border p-2 rounded"
						/>
						{formik.touched.specialty && formik.errors.specialty && <div className="text-red-500 text-sm mt-1">{formik.errors.specialty}</div>}
					</div>

					<div className="flex justify-end gap-2 mt-4">
						<button type="button" onClick={handleClose} className="px-4 py-2 border rounded hover:bg-gray-100">
							Cancel
						</button>
						<button type="submit" disabled={formik.isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
							{initialValues ? (formik.isSubmitting ? "Updating..." : "Update") : formik.isSubmitting ? "Adding..." : "Add"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AccountModal;
