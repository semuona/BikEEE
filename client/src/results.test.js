import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Results from "./Results";
import App from "./App";
import { debug } from "request";
import BikeAppProvider from "./Context";
import { BikeApp, popularBikesResults, exportedBike } from "./Context";

// Unit testing = testing one unit

// it()

test("Table exists", async () => {
  render(
    <BikeAppProvider>
      <App />
    </BikeAppProvider>
  );

  const table = screen.getByTestId("table");

  expect(table).toBeInTheDocument();
});

/* test("<Results/>", async () => {
  //1. render the component
  render(
    <BikeAppProvider>
      <App />
    </BikeAppProvider>
  );


  console.log("hello from testing", exportedBike());
}); */
