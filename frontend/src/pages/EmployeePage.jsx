import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, ArrowDown, ArrowUp } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeViewModal from "../components/EmployeeViewModal";
import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../api/employee.api";

const EmployeePage = () => {
    const queryClient = useQueryClient();

    const [filter, setFilter] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [viewData, setViewData] = useState(null);

    const rowsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const [sortOrder, setSortOrder] = useState("desc");


    // FETCH
    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
    });


    // MUTATIONS
    const addMutation = useMutation({
        mutationFn: addEmployee,
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    const updateMutation = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    // SORT TOGGLE
    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };


    // SORT + FILTER
    const sortedEmployees = [...employees].sort((a, b) => {
        if (sortOrder === "asc") {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const filteredEmployees = sortedEmployees.filter((emp) => {
        const search = filter.toLowerCase();
        return (
            emp.firstName?.toLowerCase().includes(search) ||
            emp.lastName?.toLowerCase().includes(search)
        );
    });

    const totalRows = filteredEmployees.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);


    // reset page when filter or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, sortOrder]);


    // HANDLERS
    const handleSubmit = (formData) => {
        if (editData) {
            updateMutation.mutate({
                id: editData._id,
                data: formData,
            });
        } else {
            addMutation.mutate(formData);
        }

        setOpenForm(false);
        setEditData(null);
    };

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white shadow">
                <h1 className="text-xl font-semibold">CRUD Application</h1>
                <button
                    onClick={() => {
                        setEditData(null);
                        setOpenForm(true);
                    }}
                    className="rounded bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 cursor-pointer"
                >
                    ADD EMPLOYEE
                </button>
            </div>

            {/* Content */}
            <div className="p-6 max-w-7xl mx-auto">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="mb-4 w-64 rounded border px-3 py-2 text-sm"
                />

                <div className="overflow-x-auto rounded bg-white shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-300">
                            <tr>
                                <th
                                    onClick={toggleSortOrder}
                                    className="px-3 py-2 text-left cursor-pointer select-none"
                                >
                                    <div className="flex items-center gap-1">
                                        <span>ID</span>
                                        {sortOrder === "asc" ? (
                                            <ArrowUp size={14} />
                                        ) : (
                                            <ArrowDown size={14} />
                                        )}
                                    </div>
                                </th>

                                {[
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
                            {filteredEmployees.length === 0 ? (
                                <tr>
                                    <td colSpan="11" className="text-center py-6 text-gray-500">
                                        No employees found
                                    </td>
                                </tr>
                            ) : (
                                paginatedEmployees.map((row, index) => (
                                    <tr
                                        key={row._id}
                                        className="border-b border-gray-300 hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-2">
                                            {sortOrder === "asc"
                                                ? startIndex + index + 1
                                                : totalRows - (startIndex + index)}
                                        </td>

                                        <td className="px-3 py-2">{row.firstName}</td>
                                        <td className="px-3 py-2">{row.lastName}</td>
                                        <td className="px-3 py-2">{row.email}</td>
                                        <td className="px-3 py-2">
                                            {row.dob
                                                ? new Date(row.dob).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td className="px-3 py-2 capitalize">{row.gender}</td>
                                        <td className="px-3 py-2">{row.education}</td>
                                        <td className="px-3 py-2">{row.company}</td>
                                        <td className="px-3 py-2">{row.experience}</td>
                                        <td className="px-3 py-2">₹{row.package}.00L</td>

                                        <td className="px-3 py-2 space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditData(row);
                                                    setOpenForm(true);
                                                }}
                                                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                                            >
                                                <Pencil size={18} className="text-blue-700" />
                                            </button>

                                            <button
                                                onClick={() => setViewData(row)}
                                                className="p-2 rounded-full bg-green-100 hover:bg-green-200"
                                            >
                                                <Eye size={18} className="text-green-700" />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(row._id)}
                                                className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                                            >
                                                <Trash2 size={18} className="text-red-700" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-end gap-4 px-4 py-3 text-sm text-gray-600">
                        <span>
                            {totalRows === 0
                                ? "0 – 0 of 0"
                                : `${startIndex + 1} – ${Math.min(endIndex, totalRows)} of ${totalRows}`}
                        </span>

                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="p-1 disabled:opacity-40 cursor-pointer hover:text-gray-400"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="p-1 disabled:opacity-40 cursor-pointer hover:text-gray-400"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {openForm && (
                <EmployeeForm
                    data={editData}
                    onClose={() => setOpenForm(false)}
                    onSubmit={handleSubmit}
                />
            )}

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
