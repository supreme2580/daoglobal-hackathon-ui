import { DelegateTableType } from "types/typings";

export default function DelegateTable({ data }: DelegateTableType) {
  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 rounded-lg bg-secondary">
              <thead>
                <tr>
                  <th scope="col" className="p-5 text-left text-sm font-semibold text-primary">
                    Delegates
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 text-left text-sm font-semibold text-primary"
                  >
                    Votes
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 text-left text-sm font-semibold text-primary"
                  >
                    {"%"} of Quorum
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 text-left text-sm font-semibold text-primary"
                  >
                    {"%"} of Deleates votes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-secondary">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap p-5 text-sm">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-11 w-11 rounded-full" src={item.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-primary">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {item.votes}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {item.quorum_percent}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {item.delegate_votes_percent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
