import ApperIcon from "@/components/ApperIcon"

const TableHeader = ({ columns, sortBy, sortOrder, onSort }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
            }`}
            onClick={() => column.sortable && onSort?.(column.key)}
          >
            <div className="flex items-center space-x-1">
              <span>{column.label}</span>
              {column.sortable && sortBy === column.key && (
                <ApperIcon
                  name={sortOrder === 'asc' ? "ChevronUp" : "ChevronDown"}
                  size={14}
                  className="text-gray-400"
                />
              )}
            </div>
          </th>
        ))}
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  )
}

export default TableHeader