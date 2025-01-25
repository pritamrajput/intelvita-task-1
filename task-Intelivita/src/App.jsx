import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUpload from './components/FileUpload'
import RecordList from './components/RecordList'
import Search from './components/Search'
import EditRecord from './components/EditRecord'

function App() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('clientRecords')) || [];    
    setRecords(storedRecords);
  }, []);

  useEffect(() => {
    localStorage.setItem('clientRecords', JSON.stringify(records));
  }, [records]);


   // Merge and remove duplicate emails
   const mergeRecords = (existing, newRecords) => {
    const allRecords = [...existing, ...newRecords];
    const uniqueRecords = Array.from(new Map(allRecords.map(item => [item.email, item])).values());
    return uniqueRecords;
  };

  // Handle file upload
  const handleFileUpload = (newData) => {
    const mergedData = mergeRecords(records, newData);
    setRecords(mergedData);
  };


  // Search handler
  const filteredRecords = records.filter(record =>
    record.name.toLowerCase().includes(search.toLowerCase()) ||
    record.email.toLowerCase().includes(search.toLowerCase()) ||
    record.id.toString().includes(search)
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    // Edit record
    const handleEdit = (record) => {
      setEditingRecord(record);
    };

      // Save edited record
  const saveEdit = (updatedRecord) => {
    if (records.some(r => r.email === updatedRecord.email && r.id !== updatedRecord.id)) {
      alert('Email must be unique!');
      return;
    }
    setRecords(records.map(r => (r.id === updatedRecord.id ? updatedRecord : r)));
    setEditingRecord(null);
  };

     // Delete record
  const handleDelete = (id) => {
    setRecords(records.filter(record => record.id !== id));
  };
   
   // Pagination controls
   const nextPage = () => setCurrentPage(currentPage + 1);
   const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
       <FileUpload onFileUpload={handleFileUpload} />
       <Search search={search} setSearch={setSearch} />
       <RecordList records={currentRecords} onEdit={handleEdit} onDelete = {handleDelete}/>
       {editingRecord && (
        <EditRecord record={editingRecord} saveEdit={saveEdit} />
      )}

      <div className="mt-4 flex justify-between">
        <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-300 p-2">Previous</button>
        <button onClick={nextPage} disabled={currentPage * recordsPerPage >= filteredRecords.length} className="bg-gray-300 p-2">Next</button>
      </div>
    </>
  )
}

export default App
