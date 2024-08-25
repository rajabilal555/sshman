import React from "react";
import Navigation from "./Navigation";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
			<main className="flex-1 overflow-hidden">
				{children}
			</main>
    </div>
  );
}

export default AppLayout;
