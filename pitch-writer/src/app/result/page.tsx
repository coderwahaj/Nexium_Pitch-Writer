"use client";

import { Suspense } from "react";
import ResultClient from "./ResultClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ResultClient />
    </Suspense>
  );
}
