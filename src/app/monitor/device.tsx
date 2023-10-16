"use client";

import { DeviceData, TelemetryData } from "@/pages/api/data";
import { useEffect, useState } from "react";

export default function Device({ device }: { device: DeviceData | null }) {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);

  useEffect(() => {
    console.log(`/api/device/${device?.uuid}`);
    if (device) {
      fetch(`/api/device/${device?.uuid}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTelemetryData(data.devices);
        });
    }
  }, [device]);

  if (!device) {
    return false;
  }

  return (
    <div className="font-mono">
      <div className="flex flex-col items-center justify-top p-24 text-lg">
        {device.uuid}
        {telemetryData?.toString()}
      </div>
    </div>
  );
}
