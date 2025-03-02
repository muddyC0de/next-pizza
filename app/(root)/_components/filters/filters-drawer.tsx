"use client";

import React from "react";

import { Filters } from "./filters";
import { ListFilter } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button, Drawer } from "@/components/ui";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

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
