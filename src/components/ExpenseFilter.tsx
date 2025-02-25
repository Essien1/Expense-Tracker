import React from "react";

interface Props {
  onFilter: (person: string) => void;
}

const Filter: React.FC<Props> = ({ onFilter }) => {
  return (
    <div className="p-4">
      <label className="font-semibold">Filter by Person:</label>
      <select onChange={(e) => onFilter(e.target.value)} className="border p-2 ml-2">
        <option value="">All</option>
        <option value="Essien">Essien</option>
        <option value="Effiom">Effiom</option>
        <option value="Grace">Grace</option>
        <option value="Caleb">Caleb</option>
      </select>
    </div>
  );
};

export default Filter;
