import React from "react";

const EmployeeViewModal = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-md bg-white shadow-2xl">
                {/* Header */}
                <div className="px-6 py-4 border-b">
                    <h1 className="text-xl font-medium">Employee Details</h1>
                </div>

                {/* Content */}
                <div className="px-6 py-4 space-y-3 text-sm">
                    <Detail label="First Name" value={data.firstName} />
                    <Detail label="Last Name" value={data.lastName} />
                    <Detail label="Email" value={data.email} />
                    <Detail label="DOB" value={new Date(data.dob).toLocaleDateString()} />
                    <Detail label="Gender" value={data.gender} />
                    <Detail label="Education" value={data.education} />
                    <Detail label="Company" value={data.company} />
                    <Detail label="Experience" value={`${data.experience} years`} />
                    <Detail label="Package" value={`₹ ${data.package}.00 L`} />
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 pb-4">
                    <button
                        onClick={onClose}
                        className="rounded bg-indigo-600 px-6 py-2 text-sm text-white hover:bg-indigo-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div className="flex justify-between border-b pb-1">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="text-gray-800">{value}</span>
    </div>
);

export default EmployeeViewModal;
