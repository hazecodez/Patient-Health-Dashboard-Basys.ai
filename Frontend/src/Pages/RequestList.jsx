import Layout from "../Layouts/Layout";
import { useEffect, useState } from "react";
import { getAuthorizationRequests } from "../Services/Apis";
import { BeatLoader } from "react-spinners";

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

export default function RequestList() {
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPriorRequists = async () => {
      setLoading(true);
      try {
        const response = await getAuthorizationRequests({search});
        if (response.data) {
          setTimeout(() => {
            setRequestData(response.data);
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching Patients:", error);
        setLoading(false);
      }
    };
    fetchPriorRequists();
  }, [search]);
  return (
    <Layout>
      {loading && (
        <div className="absolute left-56 inset-0 flex items-center justify-center z-10">
          <BeatLoader loading={loading} size={30} />
        </div>
      )}
      <div className="xl:pl-72">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Authorization Requests</h1>

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
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Treatment
                      </th>
                      <th
                        scope="col"
                        className="hidden lg:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Date of service
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestData.map((data, index) => (
                      <>
                        <tr
                          key={index}
                          className="odd:bg-white even:bg-gray-100"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {data.name}
                            <dl className="lg:hidden">
                              <dt className="sr-only sm:hidden ">Age</dt>
                              <dd className="sm:hidden text-gray-500 font-normal mt-1">
                                {data.treatment}
                              </dd>
                              <dt className="sr-only">Date of service</dt>
                              <dd className="text-gray-500 font-normal mt-1">
                                {formatDate(data.dateOfService)}
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {data.treatment}
                          </td>
                          <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {formatDate(data.dateOfService)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {data.status}
                            </td>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
