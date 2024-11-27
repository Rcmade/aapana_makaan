"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createQueryString } from "@/lib/utils/stringUtils";
import {type PageProps } from "@/types";
import { SearchPropertyResponseT } from "@/types/apiResponse";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export interface PropertyPaginationProps {
  pagination: SearchPropertyResponseT["pagination"];
  searchParams: PageProps["searchParams"];
  navigationPath: string;
}

const PropertyPagination = ({
  pagination: { total, limit, page },
  searchParams,
  navigationPath,
}: PropertyPaginationProps) => {
  const router = useRouter();

  const totalPages = Math.ceil(total / limit);

  const handleFetch = () => {
    // router.refresh();
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Pagination Info */}
      <div className="text-center">
        <p>
          Page {page} of {totalPages}
        </p>
        <p className="text-xs sm:text-sm">{total} properties</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Previous Button */}
        <Button
          showDisableLoaders={false}
          size="icon"
          onClick={handleFetch}
          disabled={page <= 1}
          className={cn("p-0",
            page <= 1 && "opacity-50"
          )}
          asChild
        >
          <Link
            href={`${navigationPath}${createQueryString(searchParams || {}, {
              page: page - 1,
            })}`}
            className="p-2"
          >
            <ChevronLeft />
            <span className="sr-only">Previous</span>
          </Link>
        </Button>
        {/* Next Button */}
        <Button
          showDisableLoaders={false}
          size="icon"
          onClick={handleFetch}
          disabled={page >= totalPages}
          className={cn("p-0",
            page >= totalPages && "opacity-50"
          )}
          asChild
        >
          <Link
            href={`${navigationPath}${createQueryString(searchParams || {}, {
              page: page + 1,
            })}`}
          >
            <ChevronRight />
            <span className="sr-only">Next</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PropertyPagination;
