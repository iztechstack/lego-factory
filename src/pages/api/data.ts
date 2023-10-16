export type DeviceData = {
  uuid: string;
  type: string;
  status: "online" | "offline";
  factory: string;
  version: string;
  ip: string;
};

export type TelemetryData = {
  temperature: number;
  humidity: number;
  pressure: number;
  voltage: number;
  timestamp: number;
};

const randomData: DeviceData[] = [
  {
    uuid: "9270e680-6c48-11ee-b962-0242ac120002",
    type: "brick_generator",
    status: "online",
    factory: "factory",
    version: "1.0.1",
    ip: "0.42.68.62",
  },
  {
    uuid: "f84e39a0-6c48-11ee-b962-0242ac120002",
    type: "sensor",
    status: "offline",
    factory: "bigFactory",
    version: "2.3.0",
    ip: "192.168.1.1",
  },
  {
    uuid: "07a1d7e0-6c49-11ee-b962-0242ac120002",
    type: "controller",
    status: "online",
    factory: "biggerFactory",
    version: "3.5.2",
    ip: "10.0.0.5",
  },
  {
    uuid: "db5265f0-6c49-11ee-b962-0242ac120002",
    type: "sensor",
    status: "offline",
    factory: "factory",
    version: "1.1.0",
    ip: "192.168.1.5",
  },
  {
    uuid: "189f8440-6c4a-11ee-b962-0242ac120002",
    type: "brick_generator",
    status: "online",
    factory: "bigFactory",
    version: "2.0.0",
    ip: "10.0.2.3",
  },
  {
    uuid: "82bf2b30-6c4a-11ee-b962-0242ac120002",
    type: "controller",
    status: "online",
    factory: "factory",
    version: "4.2.1",
    ip: "192.168.3.7",
  },
  {
    uuid: "295d6880-6c4b-11ee-b962-0242ac120002",
    type: "sensor",
    status: "offline",
    factory: "biggerFactory",
    version: "1.0.0",
    ip: "10.0.1.9",
  },
  {
    uuid: "72842f20-6c4b-11ee-b962-0242ac120002",
    type: "brick_generator",
    status: "online",
    factory: "bigFactory",
    version: "2.5.3",
    ip: "192.168.2.15",
  },
  {
    uuid: "be828c90-6c4c-11ee-b962-0242ac120002",
    type: "controller",
    status: "offline",
    factory: "factory",
    version: "3.0.0",
    ip: "10.0.3.12",
  },
  {
    uuid: "0207b200-6c4c-11ee-b962-0242ac120002",
    type: "sensor",
    status: "online",
    factory: "bigFactory",
    version: "1.2.2",
    ip: "192.168.4.6",
  },
  {
    uuid: "4734e3d0-6c4d-11ee-b962-0242ac120002",
    type: "brick_generator",
    status: "offline",
    factory: "factory",
    version: "2.3.1",
    ip: "10.0.4.18",
  },
  {
    uuid: "8c882f20-6c4d-11ee-b962-0242ac120002",
    type: "controller",
    status: "online",
    factory: "biggerFactory",
    version: "4.0.1",
    ip: "192.168.5.22",
  },
  {
    uuid: "c2f76510-6c4e-11ee-b962-0242ac120002",
    type: "sensor",
    status: "offline",
    factory: "factory",
    version: "1.3.0",
    ip: "10.0.5.14",
  },
  {
    uuid: "0882c460-6c4e-11ee-b962-0242ac120002",
    type: "brick_generator",
    status: "online",
    factory: "bigFactory",
    version: "2.2.0",
    ip: "192.168.6.30",
  },
  {
    uuid: "4cbed030-6c4f-11ee-b962-0242ac120002",
    type: "controller",
    status: "online",
    factory: "biggerFactory",
    version: "3.1.2",
    ip: "10.0.6.25",
  },
  {
    uuid: "a6acded0-6c4f-11ee-b962-0242ac120002",
    type: "sensor",
    status: "offline",
    factory: "factory",
    version: "1.4.0",
    ip: "192.168.7.42",
  },
  {
    uuid: "5a6c7310-6c4a-11ee-b962-0242ac120002",
    type: "sensor",
    status: "online",
    factory: "bigFactory",
    version: "1.2.3",
    ip: "172.16.0.1",
  },
  {
    uuid: "cf892130-6c4a-11ee-b962-0242ac120002",
    type: "brick_generator",
    status: "offline",
    factory: "factory",
    version: "2.1.0",
    ip: "192.168.2.10",
  },
];

const randomTelemetry: Record<string, TelemetryData[]> = {};
randomData.map((device) => {
  randomTelemetry[device.uuid] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((time) => ({
    temperature: Math.random() * 100,
    humidity: Math.random() * 100,
    pressure: Math.random() * 100,
    voltage: Math.random() * 100,
    timestamp: Date.now() - time * 1000,
  }));
});

export const getTelemetryData = (uuid: string): TelemetryData[] => {
  const telemetryData = randomTelemetry[uuid];

  return telemetryData;
};

export default randomData;
