"use client";

import { useEffect, useState, ChangeEvent } from "react";

// Types
type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  description: string;
  requirements: string;
  salaryRange?: string;
  deadline?: string;
};

type DashboardStats = {
  totalJobs: number;
  totalDepartments: number;
  totalTypes: number;
};

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://osmium-blog-admin-backend.onrender.com";

export default function HiringAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    totalDepartments: 0,
    totalTypes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Job>({
    _id: "",
    title: "",
    department: "",
    location: "",
    type: "",
    summary: "",
    description: "",
    requirements: "",
    salaryRange: "",
    deadline: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("🔷 API_URL:", API_URL);

  // ✅ Fetch jobs + stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await fetch(`${API_URL}/api/hirings`, { cache: "no-store" });
        const statsRes = await fetch(`${API_URL}/api/hirings/dashboard`, { cache: "no-store" });

        if (jobsRes.ok) setJobs(await jobsRes.json());
        if (statsRes.ok) setStats(await statsRes.json());
      } catch (err) {
        console.error("❌ Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Handle input
  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Create new job
const handleCreate = async () => {
  try {
    // Remove empty string fields before sending
    const payload = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== "")
    );

    const res = await fetch(`${API_URL}/api/hirings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setOpen(false);
      setForm({
        _id: "",
        title: "",
        department: "",
        location: "",
        type: "",
        summary: "",
        description: "",
        requirements: "",
        salaryRange: "",
        deadline: "",
      });

      const updated = await fetch(`${API_URL}/api/hirings`, { cache: "no-store" });
      setJobs(await updated.json());
    } else {
      const errorData = await res.json();
      console.error("❌ Backend error:", errorData);
    }
  } catch (err) {
    console.error("❌ Error creating job:", err);
  }
};

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Dashboard Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Total Jobs</h3>
          <p className="text-2xl font-bold">{stats.totalJobs}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Departments</h3>
          <p className="text-2xl font-bold">{stats.totalDepartments}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Job Types</h3>
          <p className="text-2xl font-bold">{stats.totalTypes}</p>
        </div>
      </div>

      {/* ✅ Job Listings */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Job Postings</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + New Job
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{job.title}</td>
                <td className="p-2">{job.department}</td>
                <td className="p-2">{job.location}</td>
                <td className="p-2">{job.type}</td>
                <td className="p-2">
                  {job.deadline ? new Date(job.deadline).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
            {jobs.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No jobs posted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Create Job Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">Create New Job</h2>
            <div className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                name="title"
                placeholder="Job Title"
                value={form.title}
                onChange={handleInput}
              />
              <input
                className="w-full border p-2 rounded"
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={handleInput}
              />
              <input
                className="w-full border p-2 rounded"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleInput}
              />
              <select
                className="w-full border p-2 rounded"
                name="type"
                value={form.type}
                onChange={handleInput}
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <input
                className="w-full border p-2 rounded"
                name="summary"
                placeholder="Short Summary"
                value={form.summary}
                onChange={handleInput}
              />
              <textarea
                className="w-full border p-2 rounded"
                name="description"
                placeholder="Full Job Description"
                value={form.description}
                onChange={handleInput}
              />
              <input
                className="w-full border p-2 rounded"
                name="requirements"
                placeholder="Requirements (comma-separated)"
                value={form.requirements}
                onChange={handleInput}
              />
              <input
                className="w-full border p-2 rounded"
                name="salaryRange"
                placeholder="Salary Range (optional)"
                value={form.salaryRange}
                onChange={handleInput}
              />
              <input
                className="w-full border p-2 rounded"
                type="date"
                name="deadline"
                value={form.deadline || ""}
                onChange={handleInput}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
