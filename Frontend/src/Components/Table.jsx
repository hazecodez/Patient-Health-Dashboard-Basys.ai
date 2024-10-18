import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Table({ tableData }) {
  const navigate = useNavigate();
  return (
    <>
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
              Age
            </th>
            <th
              scope="col"
              className="hidden lg:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Condition
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <>
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {data.name}
                  <dl className="lg:hidden">
                    <dt className="sr-only sm:hidden ">Age</dt>
                    <dd className="sm:hidden text-gray-500 font-normal mt-1">
                      {data.age}
                    </dd>
                    <dt className="sr-only">Condition</dt>
                    <dd className="text-gray-500 font-normal mt-1">
                      {data.condition}
                    </dd>
                  </dl>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {data.age}
                </td>
                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {data.condition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button
                    onClick={() => navigate(`/patient/${data._id}`)}
                    type="button"
                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-red-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    View
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

Table.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableHeads: PropTypes.array.isRequired,
};
