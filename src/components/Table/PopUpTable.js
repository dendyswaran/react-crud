import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


const PopUpTable = ({ state }) => {

  //TODO: make both field and dscp dynamic instead of hard coded like currently!!! 
  const data = [
    {
      field: "Site ID",
      dscp: state.cd,
    },
    {
      field: "Decom Vendor",
      dscp: state.vendor,
    },
    {
      field: "No. of Equipment",
      dscp: state.eqpCount,
    },
  ];

  console.log(data);

  return (
    <div>
      <div className="card">
        <DataTable value={data} responsiveLayout="scroll">
          <Column field="field" header="Attribute"></Column>
          <Column field="dscp" header="Description"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default PopUpTable;
