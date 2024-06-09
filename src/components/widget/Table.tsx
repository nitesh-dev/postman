import "@/styles/widgets/table.css"



export default function Table({
  headers,
  tableData,
}: {
  headers: string[];
  tableData: string[][];
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {row.map((cellValue, index) => (
              <td key={index}><input value={cellValue}/></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
