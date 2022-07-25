import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { debug } from "request";
import BikeAppProvider from "./Context";
//import { BikeApp, popularBikesResults, exportedBike } from "./Context";

test("Table exists", () => {
  render(
    <BikeAppProvider>
      <App />
    </BikeAppProvider>
  );

  const table = screen.getByTestId("table");
  expect(table).toBeInTheDocument();
});
