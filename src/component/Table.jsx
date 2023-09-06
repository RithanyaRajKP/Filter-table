import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./component.css";

const Table = ({ totalpages }) => {
  const dispatch = useDispatch();
  const beerData = useSelector((state) => state.beerData);
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilterPage, setCurrentFilterPage] = useState(1);
  const [filter, setFilter] = useState();
  const [filterChange, setFilterChange] = useState("");
  const [selectedOption, setSelectedOption] = useState("brewed-after");
  const [filterPaginate, setFilterPaginate] = useState(0);

  // useEffect(() => {
  //   currentPageFunc();
  // }, [currentPage]);

  // const currentPageFunc = () => {
  //   let pagenatedUrl = `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10`;
  //   axios.get(pagenatedUrl).then((res) => {
  //     if (res.data.length > 0) {
  //       setHeader(Object.keys(res.data[0]));
  //       setData(res.data);
  //     } else {
  //       alert("A simple danger alert—check it out!");
  //     }
  //   });
  // };

  useEffect(() => {
    fetchBeerData();
  }, [currentPage]);

  const fetchBeerData = () => {
    const apiUrl = `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10`;

    axios.get(apiUrl).then((res) => {
      if (res.data.length > 0) {
        setHeader(Object.keys(res.data[0]));
        dispatch({ type: "SET_BEER_DATA", payload: res.data });
        console.log(beerData);
      } else {
        alert("A simple danger alert—check it out!");
      }
    });
  };

  useEffect(() => {
    if (filter) {
      if (selectedOption == "brewed-after") {
        brewedAfter();
      } else {
        brewedBefore();
      }
    }
  }, [filter, currentFilterPage]);

  const brewedBefore = () => {
    if (filter) {
      const pagenatedFilterUrl = `https://api.punkapi.com/v2/beers?brewed_before=${filter}`;
      axios.get(pagenatedFilterUrl).then((res) => {
        if (res.data.length > 0) {
          setFilterPaginate(Math.ceil(res.data.length / 10));
          let pagenatedUrl = `https://api.punkapi.com/v2/beers?page=${currentFilterPage}&per_page=10&brewed_before=${filter}`;
          axios.get(pagenatedUrl).then((res) => {
            if (res.data.length > 0) {
              setHeader(Object.keys(res.data[0]));
              // setData(res.data);
              dispatch({ type: "SET_BEER_DATA", payload: res.data });
            } else {
              alert("A simple danger alert—check it out!");
            }
          });
        } else {
          alert("A simple danger alert—check it out!");
        }
      });
    }
  };
  const brewedAfter = () => {
    if (filter) {
      const pagenatedFilterUrl = `https://api.punkapi.com/v2/beers?brewed_after=${filter}`;
      axios.get(pagenatedFilterUrl).then((res) => {
        if (res.data.length > 0) {
          setFilterPaginate(Math.ceil(res.data.length / 10));
          let pagenatedUrl = `https://api.punkapi.com/v2/beers?page=${currentFilterPage}&per_page=10&brewed_after=${filter}`;
          axios.get(pagenatedUrl).then((res) => {
            if (res.data.length > 0) {
              setHeader(Object.keys(res.data[0]));
              // setData(res.data);
              dispatch({ type: "SET_BEER_DATA", payload: res.data });
            } else {
              alert("A simple danger alert—check it out!");
            }
          });
        } else {
          alert("A simple danger alert—check it out!");
        }
      });
    }
  };
  const clickPrev = () => {
    if (filterPaginate > 0) {
      totalpages = filterPaginate;
    }
    if (currentPage > 1) {
      setCurrentPage(parseInt(currentPage) - 1);
    } else {
      setCurrentPage(1);
    }
  };
  const clickNext = () => {
    if (filterPaginate > 0) {
      totalpages = filterPaginate;
    }
    if (currentPage < totalpages) {
      setCurrentPage(parseInt(currentPage) + 1);
    } else {
      setCurrentPage(totalpages);
    }
  };
  var divs = [];

  if (filterPaginate > 0) {
    for (let i = 0; i < filterPaginate; i++) {
      divs.push(i + 1);
    }
  } else {
    for (let i = 0; i < totalpages; i++) {
      divs.push(i + 1);
    }
  }

  const onClickPage = (e) => {
    e.preventDefault();
    const page = e.target.id;
    if (filter == undefined) {
      setCurrentPage(page);
    } else {
      setCurrentFilterPage(page);
    }
  };

  const onFilter = (e) => {
    e.preventDefault();
    if (selectedOption === "brewed-after") {
      brewedAfter();
    } else {
      brewedBefore();
    }
    setFilter(filterChange);
  };
  const onReset = (e) => {
    e.preventDefault();
    setFilter("");
    setFilterPaginate(0);
    setFilterChange("");
    fetchBeerData();
  };
  const filterValueChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <div className="my-5">
        <div className="filter ">
          <h2 className="text-start">Filter</h2>

          <form onSubmit={onFilter} className="filter-form">
            <input
              type="text"
              className="dateInput"
              placeholder="MM/YYYY"
              aria-label="brewed-before"
              value={filterChange}
              onChange={(e) => {
                setFilterChange(e.target.value);
              }}
            />
            <div className="filterType">
              <input
                className=""
                type="radio"
                name="brewed-after"
                id="brewed-after"
                value="brewed-after"
                checked={selectedOption === "brewed-after"}
                onChange={filterValueChange}
              />
              <label className="form-check-label ps-1" htmlFor="brewed-after">
                Brewed after
              </label>
            </div>
            <div className="filterType">
              <input
                className=""
                type="radio"
                name="brewed-before"
                value="brewed-before"
                id="brewed-before"
                checked={selectedOption === "brewed-before"}
                onChange={filterValueChange}
              />
              <label className="form-check-label ps-1" htmlFor="brewed-before">
                Brewed before
              </label>
            </div>
            <button
              className="btn btn-outline-info py-3 px-5 ms-3"
              type="submit"
            >
              Submit
            </button>
            <button
              className="btn btn-outline-info py-3 px-5 ms-3"
              type="submit"
              onClick={onReset}
              disabled={!filterChange}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
      <div className="mx-5">
        <table className="table table-striped table-hover mh-100 ">
          <thead>
            <tr>
              {header &&
                header.map((header, i) => {
                  return (
                    <th keys={i} scope="col" className="text-uppercase">
                      {header}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {beerData &&
              beerData.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="text-start">{item.name}</td>
                    <td className="text-start">{item.tagline}</td>
                    <td>{item.first_brewed}</td>
                    <td>
                      <p className="desc text-start">{item.description}</p>
                    </td>
                    <td className="text-start">{item.image_url}</td>
                    <td>{item.abv}</td>
                    <td>{item.ibu}</td>
                    <td>{item.target_fg}</td>
                    <td>{item.target_og}</td>
                    <td>{item.ebc}</td>
                    <td>{item.srm}</td>
                    <td>{item.ph}</td>
                    <td>{item.attenuation_level}</td>
                    <td>
                      {item.volume.value}
                      <span className="font-size ps-1">{item.volume.unit}</span>
                    </td>
                    <td>
                      {item.boil_volume.value}
                      <span className="font-size ps-1">
                        {item.boil_volume.unit}
                      </span>
                    </td>
                    <td>
                      <div className="desc">
                        <div>
                          {item.method.mash_temp.map((i, index) => {
                            return (
                              <div className="w-75" key={index}>
                                <div>
                                  {i.temp.value}{" "}
                                  <span className="font-size ps-1">
                                    {i.temp.unit}
                                  </span>
                                </div>
                                <div>duration:{i.duration}</div>
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <hr />
                          {item.method.fermentation.temp.value}
                          <span className="font-size ps-1">
                            {item.method.fermentation.temp.unit}
                          </span>
                        </div>
                        <div>
                          <hr />
                          {item.method.fermentation.twist}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="desc">
                        {item.ingredients.malt.map((i) => {
                          return (
                            <div className="text-start">
                              <span>
                                <li>{i.name}</li>
                              </span>

                              <div>
                                {i.amount.value}{" "}
                                <span className="font-size ps-1">
                                  {i.amount.unit}
                                </span>
                              </div>
                              <hr />
                            </div>
                          );
                        })}
                        {item.ingredients.hops.map((i) => {
                          return (
                            <div className=" text-start">
                              <span>
                                <li>{i.name}</li>
                              </span>

                              <div>
                                {i.amount.value}{" "}
                                <span className="font-size ps-1">
                                  {i.amount.unit}
                                </span>
                              </div>
                              <p>{i.add}</p>
                              <p>{i.attributes}</p>
                              <hr />
                            </div>
                          );
                        })}
                        <p className="text-start">{item.ingredients.yeast}</p>
                      </div>
                    </td>
                    <td>
                      <div className="desc text-start">
                        {item.food_pairing.map((i, index) => {
                          return (
                            <ul className="">
                              <li>{i}</li>
                            </ul>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <p className="text-start desc">{item.brewers_tips}</p>
                    </td>
                    <td>
                      <p className="text-start desc">{item.contributed_by}</p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        {" "}
        <nav className="d-flex justify-content-around" aria-label="...">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={clickPrev}
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </button>
            </li>
            {currentPage &&
              divs.map((i) => {
                return (
                  <li className="page-item">
                    <button id={i} className="page-link" onClick={onClickPage}>
                      {i}
                    </button>
                  </li>
                );
              })}
            <li className="page-item">
              <button className="page-link" onClick={clickNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
