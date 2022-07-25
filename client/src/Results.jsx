import React, { useEffect, useState, useContext } from "react";
import { BikeApp } from "./Context";

//MUI table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(ID, Make, Model, Price, UserID) {
  return { ID, Make, Model, Price, UserID };
}

export default function ResultTable() {
  const { combinedData, popularBikesResults } = useContext(BikeApp);

  const rows = [
    combinedData?.map((bike) => {
      return createData(
        bike.ID,
        bike.Make,
        bike.Model,
        bike.Price,
        bike.UserID
      );
    }),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {" "}
      <h1>BikEEE table</h1>
      <TableContainer sx={{ maxWidth: 950 }} component={Paper}>
        <Table sx={{ maxWidth: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Make
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Model
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                UserID
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows[0]?.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.ID}
                </TableCell>
                <TableCell align="right">{row.Make}</TableCell>
                <TableCell align="right">{row.Model}</TableCell>
                <TableCell align="right">{row.Price}</TableCell>
                <TableCell align="right">{row.UserID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1>Bike Models by popularity</h1>
      <div>
        <table data-testid="table" className="popularityTable">
          <thead>
            <tr>
              <th>Model</th>
              <th>count</th>
            </tr>
          </thead>
          <tbody>
            {popularBikesResults?.map((bike, idx) => {
              return (
                <tr key={idx}>
                  <td>{bike.model}</td>
                  <td>{bike.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
