import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const Success = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const axiousInsrance = useAxiousInstance();
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    if (session_id) {
      axiousInsrance
        .patch(`/payment/success?session_id=${session_id}`)
        .then((res) => setTransactionId(res.data.transactionId));
    }
  }, [session_id, axiousInsrance]);

  console.log(session_id);
  

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="text-4xl my-10">Success</div>
      <div>{transactionId}</div>
    </div>
  );
};

export default Success;
