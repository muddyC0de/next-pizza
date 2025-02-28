"use client";

import React from "react";
import { Drawer } from "../ui";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Filters } from "./filters";
import { ListFilter } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

export const FiltersDrawer: React.FC<Props> = ({ className }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="lg:hidden fixed bottom-5 right-5" size={"icon"}>
          <ListFilter />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-5 bg-white ">
        <DrawerHeader className="text-left">
          <DrawerTitle className="hidden"></DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="overflow-y-auto scrollbar-hidden">
          <Filters />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
