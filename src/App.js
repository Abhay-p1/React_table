import "./App.css";
import DataTable from "./components/DataTable";
import data from "./data.json";

function App() {
  return (
    <div className="App">
      <div className="headc">React Data Table</div>
      <DataTable data={data} />
      <div className="headc">Created by Abhay</div>
    </div>
  );
}
export default App;
