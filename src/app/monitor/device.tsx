"use client";

import { DeviceData, TelemetryData } from "@/pages/api/data";
import { useEffect, useMemo, useState } from "react";
import { Line, LineConfig } from "@ant-design/plots";
import { Dropdown, Space } from "antd";

export default function Device({ device }: { device: DeviceData | null }) {
  const [, setTelemetryData] = useState<TelemetryData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData | null>(device);
  const [telemetryConfig, setTelemetryConfig] = useState<LineConfig>({
    autoFit: true,
    data: [],
    xField: "timestamp",
    yField: "value",
    seriesField: "type",
  });

  useEffect(() => {
    setDeviceData(device);
  }, [device]);

  useEffect(() => {
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

  const mutateDevice = useMemo(
    () => (data: Partial<DeviceData>) => {
      if (!deviceData) {
        return;
      }

      fetch(`/api/device/${deviceData?.uuid}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setDeviceData(data.device);
          });
        }
      });
    },
    [deviceData]
  );

  if (!deviceData || !telemetryConfig) {
    return false;
  }

  return (
    <div className="font-mono">
      <div className="flex flex-col items-center justify-top p-24 text-lg">
        {deviceData.uuid}
        <div className="text-lg text-align-left">
          Status: {deviceData.status}
        </div>
        <Space />
        <div className="">State: {deviceData.state || "working hard"}</div>
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "Work",
                style: {
                  backgroundColor: "black",
                  color: "white",
                },
                onClick: () => {
                  mutateDevice({ ...deviceData, state: "working hard" });
                },
                disabled: deviceData.state === "working hard",
              },
              {
                key: "2",
                label: "Pause",
                style: {
                  backgroundColor: "black",
                  color: "white",
                },
                onClick: () => {
                  mutateDevice({ ...deviceData, state: "pausing hard" });
                },
              },
            ],
            className: "bg-gray-700",
          }}
        >
          <button className="text-lg">
            <a>Change State</a>
          </button>
        </Dropdown>
        <Space />
        <Line {...telemetryConfig}></Line>
      </div>
    </div>
  );
}
