"use client";

import { useOrganization } from "@clerk/clerk-react";
import { EmptyOrg } from "./empty-org";
import { BoardList } from "./board-list";

interface DashboardContentProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export const DashboardContent = ({ searchParams }: DashboardContentProps) => {
  const { organization } = useOrganization();

  return (
    <>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </>
  );
};
