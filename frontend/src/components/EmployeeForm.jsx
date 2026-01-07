import React, { useState } from "react";

const educationList = [
    "B.Tech",
    "MCA",
    "BCA",
    "MBA",
    "Diploma",
    "Post Graduate",
];

const EmployeeForm = ({ data, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        dob: data?.dob || "",
        gender: data?.gender || "",
        education: data?.education || "",
        company: data?.company || "",
        experience: data?.experience || "",
        package: data?.package || "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-md bg-white shadow-2xl">
                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-xl font-medium ">Employee Form</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="px-6 space-y-2 pb-4">
                        {/* First & Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 focus:border-indigo-600 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Email & DOB */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Date of birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={form.dob}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 focus:border-indigo-600 focus:outline-none"
                                />
                                <p className="mt-1 text-xs text-gray-400">DD/MM/YYYY</p>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className=" flex gap-4 items-center">
                            <p className="mb-1 text-sm font-semibold text-gray-800">Gender</p>
                            <div className="flex gap-4 items-center text-gray-600">
                                {["male", "female", "others"].map((g) => (
                                    <label key={g} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={g}
                                            checked={form.gender === g}
                                            onChange={handleChange}
                                            className="accent-pink-600"
                                        />
                                        {g.charAt(0).toUpperCase() + g.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Education & Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Education</label>
                                <select
                                    name="education"
                                    value={form.education}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1 focus:border-indigo-600 focus:outline-none"
                                >
                                    <option value="">Select Education</option>
                                    {educationList.map((edu) => (
                                        <option key={edu} value={edu}>
                                            {edu}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 focus:border-indigo-600 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Experience & Package */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Experience</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={form.experience}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 focus:border-indigo-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Package</label>
                                <input
                                    type="number"
                                    name="package"
                                    value={form.package}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 focus:border-indigo-600 focus:outline-none"
                                />
                                <p className="mt-1 text-xs text-gray-400">In rupees</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 px-6 pb-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border bg-white px-6 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-indigo-600 px-8 py-2 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer"
                        >
                            {data ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
