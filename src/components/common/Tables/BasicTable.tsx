import React from 'react'

type BasicTableProps = {
  tableHeader: string[]
  tableData: {
    [key: string]: string | number | boolean
  }[]
}

const BasicTable = ({ tableHeader, tableData }: BasicTableProps) => {
  return (
    <div className="relative overflow-x-auto px-1">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-x-0 border-spacing-y-4">
        <thead className="text-xs text-gray-700 uppercase">
          <tr className="shadow-row-shadow rounded-lg cursor-default">
            {tableHeader.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-4 text-base first:text-lg font-normal text-lite-black first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, i) => (
            <tr key={i} className="shadow-row-shadow rounded-lg bg-white text-lite-black hover:text-white hover:bg-indigo cursor-default">
              {tableHeader.map((header) => (
                <td
                  key={header}
                  className="px-6 py-4 text-base first:text-lg font-normal first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg"
                >
                  {data[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BasicTable
