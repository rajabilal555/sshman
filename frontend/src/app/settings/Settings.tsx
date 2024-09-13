import { BrowseConfig } from "$/go/app/App";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

export default function Settings({}: Props) {
  return (
    <AppLayout>
      <div className="flex flex-col w-full h-full p-4">
        <h1 className="mb-4 text-xl p-y-2">Settings</h1>

        <div className="flex flex-row gap-2">
          <Button variant={"outline"} onClick={() => BrowseConfig()}>
            Open Config Folder
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
