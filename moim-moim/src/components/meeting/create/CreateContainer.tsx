"use client";

import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const CreateContainer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return;
};

export default CreateContainer;
