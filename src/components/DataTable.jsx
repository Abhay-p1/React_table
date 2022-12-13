import { MouseEventHandler, useCallback, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
function sortData({tableData,sortKey,isascn,isdesc}) {
  if (sortKey===undefined) return tableData;
  const sortedData = tableData.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });
  if (isdesc) {
    return sortedData.reverse();
  }
  if(isascn){
    return sortedData;
  }
  return tableData.sort((a, b) => {
    return a["id"] > b["id"] ? 1 : -1;
  });
}

function DataTable({data}) {
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("ascn");
  const [selectedRow,setSelectedRow] = useState(0);
  const headers = [
    { key: "id", label: "ID" },
    { key: "first_name", label: "First name" },
    { key: "last_name", label: "Last name" },
    { key: "email", label: "Email" },
    { key: "gender", label: "Gender" },
    { key: "ip_address", label: "IP address" },
    { key: "airport_code",label: "Airport code" },
    { key:"time", label: "Time" },
    { key:"status", label: "Status" },
    { key:"mobile",label: "Mobile" },
    { key:"area", label:"Area" },
    { key:"show", label:"Show" },
    { key:"edit", label:"Edit" },
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data,sortKey,isascn: sortOrder==="ascn",isdesc: sortOrder==="desc"}),
    [data, sortKey, sortOrder]
  );

function changeSort(key) {
  setSortKey(key);
}
function setUnsort(){
  setSortOrder("unsort");
}
function setAscending() {
  setSortOrder("ascn");
}

function setDescending() {
  setSortOrder("desc");
}
function SortButton({label, columnKey, onClick}) {
  return (
      <>
          <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {label} <span className="designspan">&#8942;</span>
              </Dropdown.Toggle>

              <Dropdown.Menu onClick={onClick}>
                  <Dropdown.Item href="#"
                     onClick={setUnsort}
                     className={(sortKey==="id" && sortOrder==="ascn")||(sortOrder==="unsort") ?"disabled":""}
                  >Unsort</Dropdown.Item>
                  <Dropdown.Item href="#"
                      onClick={setAscending}
                      className={sortKey===columnKey && sortOrder==="ascn" ?"disabled":""}
                  >Sort by ASC</Dropdown.Item>
                  <Dropdown.Item href="#"
                      onClick={setDescending}
                      className={sortKey===columnKey && sortOrder==="desc" ?"disabled":""}
                  >Sort by DESC</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
      </>
  );
}

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return (
              <td key={row.key}>
                <SortButton
                      label={row.label}
                      columnKey={row.key}
                      onClick={() => changeSort(row.key)}
                />
              </td>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedData().map((person) => {
          return (
            <tr key={person.id}  
            onClick={()=>{setSelectedRow(person.id)}} 
            className={selectedRow === person.id ? "tableSelected" : "" }
            >
              <td className="lesspadding">{person.id}</td>
              <td>{person.first_name}</td>
              <td>{person.last_name}</td>
              <td className="lesspadding">{person.email}</td>
              <td className="lesspadding">{person.gender}</td>
              <td>{person.ip_address}</td>
              <td className="lesspadding">{person.airport_code}</td>
              <td>{person.time}</td>
              <td className={person.status==="TRUE"?"greencol":"redcol"}>{person.status}</td>
              <td>{person.mobile}</td>
              <td>{person.area}</td>
              <td className="lesspadding">{person.show}</td>
              <td>{person.edit}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;