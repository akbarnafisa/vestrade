import { formatDate, get } from "@/utils/index";

export default ({ offerings }) => {
  return (
    <div className="dasboard-table relative mx-auto">
      <table className="table-fixed bg-white w-full shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-400">
            <th className="w-3/12 px-6 py-4 text-left">Name</th>
            <th className="w-3/12 px-6 py-4 text-left">Address</th>
            <th className="w-3/12 px-6 py-4 text-left">Start Date</th>
            <th className="w-3/12 px-6 py-4 text-left">End Date</th>
          </tr>
        </thead>
        <tbody>
          {offerings.map((offering, index) => {
            return (
              <tr className={index % 2 !== 0 ? `bg-gray-200` : ``} key={index}>
                <td className="border-t px-6 py-4">
                  {get(offering, `name`, `-`)}
                </td>
                <td className="border-t px-6 py-4">
                  {get(offering, `tokenAddr`, `-`)}
                </td>
                <td className="border-t px-6 py-4">
                  {formatDate(
                    Number(get(offering, `startDate`, 0)),
                    `DD MMM YYYY`
                  )}
                </td>
                <td className="border-t px-6 py-4">
                  {formatDate(
                    Number(get(offering, `endDate`, 0)),
                    `DD MMM YYYY`
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
