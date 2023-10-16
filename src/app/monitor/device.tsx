"use client";

import { DeviceData, TelemetryData } from "@/pages/api/data";
import { useEffect, useState } from "react";
import { Line, LineConfig } from "@ant-design/plots";

export default function Device({ device }: { device: DeviceData | null }) {
  const [, setTelemetryData] = useState<TelemetryData[]>([]);
  const [telemetryConfig, setTelemetryConfig] = useState<LineConfig>({
    autoFit: true,
    data: [],
    xField: "timestamp",
    yField: "value",
    seriesField: "type",
  });

  useEffect(() => {
    console.log(`/api/device/${device?.uuid}`);
    if (device) {
      fetch(`/api/device/${device?.uuid}`)
        .then((res) => res.json())
        .then((data) => {
          const telemetry = data.telemetry as TelemetryData[];
          const configData: {
            ts: number;
            timestamp: string;
            type: string;
            value: number;
          }[] = [];

          for (const t of telemetry) {
            const timestamp =
              new Date(t.timestamp).getHours() +
              ":" +
              new Date(t.timestamp).getMinutes() +
              ":" +
              new Date(t.timestamp).getSeconds();
            configData.push({
              ts: t.timestamp,
              timestamp: timestamp,
              type: "temperature",
              value: t.temperature,
            });
            configData.push({
              ts: t.timestamp,
              timestamp: timestamp,
              type: "humidity",
              value: t.humidity,
            });
            configData.push({
              ts: t.timestamp,
              timestamp: timestamp,
              type: "pressure",
              value: t.pressure,
            });
            configData.push({
              ts: t.timestamp,
              timestamp: timestamp,
              type: "voltage",
              value: t.voltage,
            });
          }

          configData.sort((a, b) => {
            return a.ts - b.ts || 1;
          });

          setTelemetryData(telemetry);
          setTelemetryConfig((currentConfig) => {
            return {
              ...currentConfig,
              data: configData,
            };
          });
        });
    }
  }, [device]);

  if (!device || !telemetryConfig) {
    return false;
  }

  return (
    <div className="font-mono">
      <div className="flex flex-col items-center justify-top p-24 text-lg">
        {device.uuid}
        <Line {...telemetryConfig}></Line>
      </div>
    </div>
  );
}
