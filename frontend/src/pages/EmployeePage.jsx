import React, { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeViewModal from "../components/EmployeeViewModal";

const initialData = [
    {
        id: 1,
        firstName: "Mia",
        lastName: "Roy",
        email: "mia@gmail.com",
        dob: "1999-05-12",
        gender: "Female",
        education: "B.Tech",
        company: "TCS",
        experience: 2,
        package: 6,
    },
    {
        id: 2,
        firstName: "Amit",
        lastName: "Sharma",
        email: "amit@gmail.com",
        dob: "1998-02-20",
        gender: "Male",
        education: "MCA",
        company: "Infosys",
        experience: 3,
        package: 7,
    },
];

const EmployeePage = () => {
    const [employees, setEmployees] = useState(initialData);
    const [filter, setFilter] = useState("");

    // ✅ modal state
    const [openForm, setOpenForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [viewData, setViewData] = useState(null);


    const filteredEmployees = employees.filter((emp) =>
        emp.firstName.toLowerCase().includes(filter.toLowerCase())
    );

    const openAddEditEmpForm = () => {
        setEditData(null); // add mode
        setOpenForm(true);
    };

    const openEditForm = (row) => {
        setEditData(row); // edit mode
        setOpenForm(true);
    };

    const openViewModal = (row) => {
        setViewData(row);
    };


    const deleteEmployee = (id) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    };

    const handleClose = () => {
        setOpenForm(false);
    };


    const handleSubmit = (formData) => {
        if (editData) {
            // UPDATE (keep same id)
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.id === editData.id
                        ? { ...formData, id: editData.id }
                        : emp
                )
            );
        } else {
            // ADD (generate serial id)
            setEmployees((prev) => {
                const nextId =
                    prev.length > 0
                        ? Math.max(...prev.map((emp) => emp.id)) + 1
                        : 1;

                return [...prev, { ...formData, id: nextId }];
            });
        }

        setOpenForm(false);
    };


    // const handleSubmit = (formData) => {
    //     if (editData) {
    //         // update
    //         setEmployees((prev) =>
    //             prev.map((emp) =>
    //                 emp.id === editData.id ? { ...formData, id: editData.id } : emp
    //             )
    //         );
    //     } else {
    //         // add
    //         setEmployees((prev) => [
    //             ...prev,
    //             { ...formData, id: Date.now() },
    //         ]);
    //     }
    //     setOpenForm(false);
    // };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white shadow">
                <h1 className="text-xl font-semibold">Crud Application</h1>
                <button
                    onClick={openAddEditEmpForm}
                    className="rounded bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 cursor-pointer"
                >
                    ADD EMPLOYEE
                </button>
            </div>

            {/* Body */}
            <div className="p-6 w-full max-w-7xl mx-auto">
                <input
                    type="text"
                    placeholder="Filter (Ex. Mia)"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="mb-4 w-64 rounded border px-3 py-2 text-sm"
                />

                <div className="overflow-x-auto rounded bg-white shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-300">
                            <tr>
                                {[
                                    "ID",
                                    "First Name",
                                    "Last Name",
                                    "Email",
                                    "DOB",
                                    "Gender",
                                    "Education",
                                    "Company",
                                    "Exp.",
                                    "Package",
                                    "Action",
                                ].map((head) => (
                                    <th key={head} className="px-3 py-2 text-left">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredEmployees.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-gray-300 hover:bg-gray-50"
                                >
                                    <td className="px-3 py-2">{row.id}</td>
                                    <td className="px-3 py-2">{row.firstName}</td>
                                    <td className="px-3 py-2">{row.lastName}</td>
                                    <td className="px-3 py-2">{row.email}</td>
                                    <td className="px-3 py-2">
                                        {new Date(row.dob).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 py-2">{row.gender}</td>
                                    <td className="px-3 py-2">{row.education}</td>
                                    <td className="px-3 py-2">{row.company}</td>
                                    <td className="px-3 py-2">{row.experience}</td>
                                    <td className="px-3 py-2">₹ {row.package}.00L</td>

                                    <td className="px-3 py-2 space-x-2">
                                        <button
                                            onClick={() => openEditForm(row)}
                                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 cursor-pointer"
                                        >
                                            <Pencil size={18} className="text-blue-700" />
                                        </button>

                                        <button
                                            onClick={() => openViewModal(row)}
                                            className="p-2 rounded-full bg-green-100 hover:bg-green-200 cursor-pointer"
                                        >
                                            <Eye size={18} className="text-green-700" />
                                        </button>

                                        <button
                                            onClick={() => deleteEmployee(row.id)}
                                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 cursor-pointer"
                                        >
                                            <Trash2 size={18} className="text-red-700" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/*Update Modal */}
            {openForm && (
                <EmployeeForm
                    data={editData}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
            {/* View Modal */}
            {viewData && (
                <EmployeeViewModal
                    data={viewData}
                    onClose={() => setViewData(null)}
                />
            )}

        </div>
    );
};

export default EmployeePage;
