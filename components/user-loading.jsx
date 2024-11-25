"use client";

import { useOrganization, useUser } from "@clerk/nextjs";

import { BarLoader } from "react-spinners";
import React from "react";

const UserLoading = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLodaded } = useUser();

  if (!isLoaded || !isUserLodaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return null;
};

export default UserLoading;
