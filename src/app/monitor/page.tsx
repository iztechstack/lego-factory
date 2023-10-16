"use client";
import { DeviceData } from "@/pages/api/data";
import { Table, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import Device from "./device";

const columns = [
  {
    title: "UUID",
    dataIndex: "uuid",
    key: "uuid",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Factory",
    dataIndex: "factory",
    key: "factory",
  },
  {
    title: "Version",
    dataIndex: "version",
    key: "version",
  },
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
  },
];

export default function Monitor() {
  const [devices, setDevices] = useState<DeviceData[]>([]);

  useEffect(() => {
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data.devices);
      });
  }, []);

  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "black",
          colorText: "white",
          fontFamily: "monospace",
        },
      }}
    >
      <div className="flex min-h-screen flex-row justify-top p-24">
        <Table
          title={() => (
            <div className="font-mono text-white text-lg">Devices</div>
          )}
          columns={columns}
          dataSource={devices}
          bordered
          rowClassName={(device) => {
            const bgClass =
              selectedDevice?.uuid === device.uuid
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-black hover:bg-gray-800";
            return `${bgClass} cursor-pointer user-select-none"`;
          }}
          onRow={(device) => {
            return {
              onClick: () => {
                const alreadySelected = selectedDevice?.uuid === device.uuid;
                if (alreadySelected) {
                  setSelectedDevice(null);
                } else setSelectedDevice(device);
              },
            };
          }}
        />
        {selectedDevice && <Device device={selectedDevice} />}
      </div>
    </ConfigProvider>
  );
}
