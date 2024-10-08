import DashboardNav from "@/components/DashboardNav";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-full bg-gray-100">
      <header className="bg-white shadow">
        <DashboardNav />
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            דאשבורד
          </h1>
        </div>
      </header>
      <main>
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
