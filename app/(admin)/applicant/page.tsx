"use client";

import { useEffect, useState } from "react";
import { Eye, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface Job {
  _id: string;
  title: string;
}

interface Application {
  _id: string;
  job: Job;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvUrl?: string;
  documents: string[];
  status: string;
  createdAt: string;
}

const ApplicantsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const API_URL = "https://osmium-blog-admin-backend.onrender.com"; // base URL for backend

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/applications`;
      if (selectedJob !== "all") {
        url += `/${selectedJob}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("❌ Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs (for filter dropdown)
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/hirings`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("❌ Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [selectedJob]);

  // Change applicant status
  const updateStatus = async (appId: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/api/applications/app/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app._id === appId ? { ...app, status } : app))
        );
      }
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h1 className="mb-6 text-3xl font-bold">Applicants Dashboard</h1>

      {/* Filter by Job */}
      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium">Filter by Job:</label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Jobs</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      {/* Applications Table */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : applications.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Job</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="px-4 py-3">{app.name}</td>
                  <td className="px-4 py-3">{app.email}</td>
                  <td className="px-4 py-3">{app.job?.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        app.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : app.status === "Reviewed"
                          ? "bg-blue-100 text-blue-800"
                          : app.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="flex justify-center gap-3 px-4 py-3">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Accepted")}
                      className="text-green-600 hover:text-green-800"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Rejected")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No applications found.</p>
      )}

      {/* Applicant Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute text-gray-500 top-3 right-3 hover:text-black"
            >
              ✕
            </button>
            <h2 className="mb-4 text-2xl font-bold">{selectedApp.name}</h2>
            <p>
              <strong>Email:</strong> {selectedApp.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedApp.phone}
            </p>
            <p>
              <strong>Applied For:</strong> {selectedApp.job?.title}
            </p>
            <p className="mt-2">
              <strong>Cover Letter:</strong> {selectedApp.coverLetter}
            </p>

            {/* CV */}
            {selectedApp.cvUrl && (
              <p className="mt-3">
                <a
                  href={`${API_URL}${selectedApp.cvUrl}`}
                  target="_blank"
                  className="text-green-600 underline"
                >
                  View CV
                </a>
              </p>
            )}

            {/* Documents */}
            {selectedApp.documents.length > 0 && (
              <div className="mt-3">
                <strong>Documents:</strong>
                <ul className="mt-1 list-disc list-inside">
                  {selectedApp.documents.map((doc, i) => (
                    <li key={i}>
                      <a
                        href={`${API_URL}${doc}`}
                        target="_blank"
                        className="text-green-600 underline"
                      >
                        Document {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ApplicantsPage;
