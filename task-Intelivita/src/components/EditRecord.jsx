import { useState } from "react";

export default function EditRecord({ record, saveEdit }) {
    const [editedRecord, setEditedRecord] = useState({ ...record });
  
    return (
      <div>
        <h2>Edit Record</h2>
        <input
          type="text"
          value={editedRecord.name}
          onChange={(e) => setEditedRecord({ ...editedRecord, name: e.target.value })}
        />
        <input
          type="text"
          value={editedRecord.email}
          onChange={(e) => setEditedRecord({ ...editedRecord, email: e.target.value })}
          className="border p-2"
        />
        <button onClick={() => saveEdit(editedRecord)} className="ml-2">Save</button>
      </div>
    );
  }
  