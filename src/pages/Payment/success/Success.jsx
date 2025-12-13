import React from "react";
import { useSearchParams } from "react-router";
import useAxiousInstance from "../../../hooks/useAxiousInstance";

const Success = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const axiousInsrance = useAxiousInstance();

  if (session_id) {
    axiousInsrance
      .patch(`/payment/success?session_id=${session_id}`)
      .then((res) => console.log(res));
  }

  return <div>Success</div>;
};

export default Success;
