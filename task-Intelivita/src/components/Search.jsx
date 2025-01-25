export default function Search({ search, setSearch }) {
    return (
      <input 
        type="text" 
        placeholder="Search by ID, Name, Email" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="border p-2 w-full mb-4" 
      />
    );
  }