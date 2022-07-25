import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const BikeApp = createContext();

export default function BikeAppProvider({ children }) {
  //------------States ---------
  const [data, setData] = useState([]);
  const [inputToFix, setInputToFix] = useState([]);
  const [fixedInput, setFixedInput] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [popularBikes, setPopularBikes] = useState([]);
  const [popularBikesResults, setPopularBikesResults] = useState([]);
  const [finalFixedData, setFinalFixedData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/data/fetch");

      setData(response.data.data);
      setInputToFix(response.data.inputToFix);
    };

    getData();
  }, []);

  //FIXING SPLIT LINES FROM CSV FILE

  // combine the each two indexes into one to make a full line of 6 items.
  //reduce the inputToFix array and merge every second indexes into one
  useEffect(() => {
    let counter = 0;
    let result = [];
    inputToFix.reduce((acc, curr) => {
      if (counter % 2 === 0) {
        result.push(curr);
      } else {
        result[result.length - 1] += " " + curr;
      }
      counter++;
      return acc;
    }, []);

    setFixedInput(result);
  }, [inputToFix]);

  // to remove the arrays less than 6, I've created another array,
  //and add all correct ones to it, then to combine the fixed line with it.
  useEffect(() => {
    // reset the bikes array because it is just appending the array in the if statement.
    setBikes([]);
    data?.map((item, idx) => {
      //sending all correct data to the bikes array (with values of 6)
      if (Object.values(item).length === 6) setBikes((bike) => [...bike, item]);
    });
  }, [data]);

  // convert fixedInput to an object with corresponded keys.
  useEffect(() => {
    let result = [];

    fixedInput.map((item, idx) => {
      //converting to an array and mapping through each item accordingly
      let itemArray = item.split(",");
      let itemObject = {};

      itemArray.map((item, idx) => {
        let key = itemArray[idx];

        switch (idx) {
          case 0:
            itemObject[key] = "ID";
            break;
          case 1:
            itemObject[key] = "Make";
            break;
          case 2:
            itemObject[key] = "Model";
            break;
          case 3:
            itemObject[key] = "Price";
            break;
          case 4:
            itemObject[key] = "UserID";
            break;
          case 5:
            itemObject[key] = "Date";
            break;
          default:
            break;
        }
      });
      result.push(itemObject);
    });

    // swap between the keys and values
    const swap = (obj) =>
      result.map((item) =>
        Object.fromEntries(Object.entries(item).map((a) => a.reverse()))
      );
    setFinalFixedData(swap);
  }, [data, bikes]);

  //COMBINING ALL BIKES INTO 1 ARRAY

  useEffect(() => {
    setCombinedData(bikes.concat(finalFixedData));
  }, [finalFixedData]);

  //COUNTING MOST POPULAR BIKES
  const countMostPopular = () => {
    combinedData?.map((bike) => {
      let model = bike.Model.toLowerCase()
        .replaceAll("-", "")
        .replaceAll(" ", "");
      let count = 0;
      combinedData?.map((item) => {
        if (
          model ===
          item.Model.toLowerCase().replaceAll("-", "").replaceAll(" ", "")
        ) {
          count++;
        }
      });
      popularBikes.push({ model, count });
    });
  };
  countMostPopular();

  //sorting the popular bikes array by the count and removing repeating models
  useEffect(() => {
    popularBikes.sort((a, b) => b.count - a.count);

    let uniqModel = {};

    const arrFiltered = popularBikes.filter(
      (obj) => !uniqModel[obj.model] && (uniqModel[obj.model] = true)
    );
    setPopularBikesResults(arrFiltered);
  }, [combinedData]);

  return (
    <BikeApp.Provider
      value={{
        data,
        bikes,
        combinedData,
        popularBikesResults,
        countMostPopular,
      }}
    >
      {children}
    </BikeApp.Provider>
  );
}
