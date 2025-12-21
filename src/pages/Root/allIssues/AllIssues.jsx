import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiousInstance from "../../../hooks/useAxiousInstance";
import Card from "../../../components/Card";

const AllIssues = () => {
  const { user } = useAuth();
  const axiousInsrance = useAxiousInstance();
  const [filter, setfilter] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: issues = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["issues", user?.uid, filter, search],
    queryFn: async () => {
      const res = await axiousInsrance.get(
        `/issues?sort=${filter}&search=${search}`
      ); // id = 2
      console.log(res.data);

      if (res.data.message) {
        return res.data.message;
      }
      const filterdHigh = res.data.filter((data) => "high" === data.priority);
      const filterdNormal = res.data.filter(
        (data) => "normal" === data.priority
      );
      const arr = [...filterdHigh, ...filterdNormal];
      return arr;
    },
  });

  const handleSortChange = (e) => {
    const value = e.target.value;
    setfilter(value);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  return (
    <div>
      <div className="flex justify-baseline items-center">
        <div className="m-5 flex items-center">
          sort by:{"  "}
          <select
            defaultValue=""
            className="select"
            onChange={handleSortChange}
          >
            <option disabled={true} value="">
              Sort by
            </option>
            <option value="boost">Boost</option>
            <option value="date">Date</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="working">Working</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="flex items-center m-5">
          <div>Search</div>
          <input
            type="text"
            placeholder="Type here"
            className="input"
            name="search"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div>
        {isFetching || isLoading ? (
          <>
            <div className="h-screen flex justify-center items-center">
              <span className="loading loading-infinity size-20"></span>
            </div>
          </>
        ) : (
          <>
            <div>
              {issues === "no data on boost" ? (
                <>
                  <div className="text-4xl text-center my-100">
                    No issues Boosted Yet
                  </div>
                </>
              ) : (
                <>
                  {issues === "no data on pending" ? (
                    <>
                      <div className="text-4xl text-center my-100">
                        No issues Panding Yet
                      </div>
                    </>
                  ) : (
                    <>
                      {issues === "no data on in-progress" ? (
                        <>
                          <div className="text-4xl text-center my-100">
                            No issues In Progress Yet
                          </div>
                        </>
                      ) : (
                        <>
                          {issues === "no data on working" ? (
                            <>
                              <div className="text-4xl text-center my-100">
                                No issues Working Yet
                              </div>
                            </>
                          ) : (
                            <>
                              {issues === "no data on resolved" ? (
                                <>
                                  <div className="text-4xl text-center my-100">
                                    No Resolved Bosted Yet
                                  </div>
                                </>
                              ) : (
                                <>
                                  {issues === "no data on closed" ? (
                                    <>
                                      <div className="text-4xl text-center my-100">
                                        No issues Closed Yet
                                      </div>
                                    </>
                                  ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                      {issues.map((issue) => (
                                        <Card
                                          key={issue._id}
                                          issue={issue}
                                          refetch={refetch}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllIssues;
