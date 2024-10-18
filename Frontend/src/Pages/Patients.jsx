import { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import { getPatients } from "../Services/Apis";
import { BeatLoader } from "react-spinners";
import Table from "../Components/Table";

export default function PatientsDashboard() {
  const [patients, setpatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await getPatients(search, page);        
        if (response.data) {
          setTimeout(() => {
            setpatients(response.data.patients);
            setTotalPatients(response.data.totalPatients);
            setTotalPages(response.data.totalPages);
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching Patients:", error);
        setLoading(false);
      }
    };
    fetchPatients();
  }, [search,page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <Layout>
      {loading && (
        <div className="absolute left-56 inset-0 flex items-center justify-center z-10">
          <BeatLoader loading={loading} size={30} />
        </div>
      )}

      <div className="xl:pl-72">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Patients List</h1>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-2xl w-40 sm:w-60 mr-2"
            placeholder="Search patients"
          />
        </div>

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Table tableData={patients} />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to{" "}
                <span className="font-medium">{Math.min(page * 10, totalPatients)}</span> of{" "}
                <span className="font-medium">{totalPatients}</span> results
              </p>
            </div>
            <div>
              <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  Previous
                </button>
                {/* Render pagination numbers dynamically */}
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === index + 1
                        ? "bg-indigo-600 text-white"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
