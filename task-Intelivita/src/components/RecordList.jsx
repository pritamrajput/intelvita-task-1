const RecordList = ({ records, onEdit, onDelete }) =>{

    return (
        <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border">
              <td className="border p-2">{record.id}</td>
              <td className="border p-2">{record.name}</td>
              <td className="border p-2">{record.email}</td>
              <td className="border p-2">
                <button onClick={() => onEdit(record)} className="mr-2 cursor-pointer bg-gray-400 p-2">Edit</button>
                <button onClick={() => onDelete(record.id)} className="cursor-pointer bg-gray-400 p-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}


export default RecordList;