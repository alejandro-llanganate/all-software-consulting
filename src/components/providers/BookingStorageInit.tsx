"use client";

import { initStorage } from "@/lib/booking-storage";
import { useEffect } from "react";

export function BookingStorageInit() {
  useEffect(() => {
    initStorage();
  }, []);
  return null;
}
