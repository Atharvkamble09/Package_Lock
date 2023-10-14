import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/Provider";
import "./Mainpage.css";
const MainPage = () => {
  const { tickets, loading, sortOption, mapOfIds, selectOption, users } =
    useContext(DataContext);
  console.log("sortOpition", sortOption);
  let resultticket = loading ? [] : tickets[selectOption];
  if (sortOption === 0) {
    //name wise sort
    for (let key in resultticket) {
      console.log("key: ", key);
      if (resultticket.hasOwnProperty(key)) {
        console.log("entereed");
        resultticket[key].sort((a, b) => {
          // Compare the "name" property for sorting
          return a.title.localeCompare(b.title);
        });
      }
    }
  } else {
    //priority wise
    for (let key in resultticket) {
      if (resultticket.hasOwnProperty(key)) {
        resultticket[key].sort((a, b) => {
          // Compare the "name" property for sorting
          return b.id - a.id;
        });
      }
    }
  }
  // console.log(resultticket)

  function calculateTitle(title) {
    const mapsOfPriority = {
      4: "Urgent",
      3: "High",
      2: "Medium",
      1: "Low",
      0: "No priority",
    };
    //title changes
    console.log("title:", title);
    if (mapsOfPriority.hasOwnProperty(title)) {
      title = mapsOfPriority[title];
    } else if (mapOfIds.hasOwnProperty(title)) {
      title = mapOfIds[title];
    }
    return title;
  }

  return (
    <div className="section">
      {Object.entries(resultticket).map(([objectKey, arrayOfObjects]) => (
        <div className="section-units" key={objectKey}>
          <h2>{calculateTitle(objectKey)}</h2>
          <ul>
            {arrayOfObjects.map((object, index) => (
              <div className="card">
                <div className="card-id ">
                  <span>{object.id}</span>
                </div>
                <div>
                  <div className="cardtitle">{object.title}</div>
                </div>
                <div className="others">
                  <div className="icon">
                    <span className="tag">{object.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
