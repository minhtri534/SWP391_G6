import { useFormik } from "formik";
import { X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { addUser, updateUser } from "../api/Users";
import { toast } from "react-toastify";

function AccountModal({ isOpen, onClose, initialValues }) {
	// Input field validation schemes
	const validation = Yup.object({
		userName: Yup.string().required("Username is required"),
		age: Yup.number().required("Age is required").min(0, "Age cannot be negative").max(150, "This age is invalid"),
		gender: Yup.string().required("Please choose a gender"),
		phoneNum: Yup.string()
			.matches(/^0\d{9}$/, "Phone number must be 10 digits and start with 0")
			.required("Phone number is required"),
		roleId: Yup.number().required("Please choose a role"),
		status: Yup.string().required("Please choose account status"),
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
			password: "",
			roleId: null,
			status: "",
		},
		onSubmit: async (values) => {
			try {
				console.log(values);
				if (isUpdating) {
					// Do updating account
					await updateUser(values);
					toast.success("Account updated successfully!");
				} else {
					// Do creating account
					await addUser(values);
					toast.success("Account created successfully!");
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
			<div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
				{/* Form header */}
				<button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hover:bg-red-100">
					<X className="w-5 h-5" />
				</button>
				<h2 className="text-xl font-semibold mb-4">{initialValues ? "Update Account" : "Create Account"}</h2>

				{/* Form body */}
				<form onSubmit={formik.handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">Username</label>
							<input
								type="text"
								name="userName"
								placeholder="Enter username..."
								value={formik.values.userName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded"
							/>
							{formik.touched.userName && formik.errors.userName && <div className="text-red-500 text-sm mt-1">{formik.errors.userName}</div>}
						</div>

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

						<div>
							<label className="block text-sm font-medium text-gray-700">Password</label>
							<input
								name="password"
								type="password"
								placeholder="Enter password..."
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full border p-2 rounded"
							/>
							{formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">Role</label>
							<select name="roleId" value={formik.values.roleId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border p-2 rounded">
								<option value={""}>Select role</option>
								<option value={1}>Admin</option>
								<option value={2}>Member</option>
								<option value={3}>Coach</option>
							</select>
							{formik.touched.roleId && formik.errors.roleId && <div className="text-red-500 text-sm mt-1">{formik.errors.roleId}</div>}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">Status</label>
							<select name="status" value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border p-2 rounded">
								<option value={""}>Select status</option>
								<option value="Active">Active</option>
								<option value="Inactive">Inactive</option>
								<option value="Locked">Locked</option>
							</select>
							{formik.touched.status && formik.errors.status && <div className="text-red-500 text-sm mt-1">{formik.errors.status}</div>}
						</div>

						{/* <div>
							<label className="block text-sm font-medium text-gray-700">Join Date</label>
							<input name="joinDate" type="date" value={formik.values.joinDate} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full border p-2 rounded" required />
						</div> */}
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

export default AccountModal;
