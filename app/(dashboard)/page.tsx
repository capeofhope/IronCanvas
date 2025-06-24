import { Suspense } from "react";
import { DashboardContent } from "./_components/dashboard-content";

interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const resolvedSearchParams = await searchParams;

  return (
    <div className=" flex-1 h-[calc(100%-80px)] p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
