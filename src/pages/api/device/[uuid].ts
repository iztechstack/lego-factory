import type { NextApiRequest, NextApiResponse } from "next";
import randomData, { getTelemetryData } from "../data";

const devicesApi = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      query: { uuid },
    } = req;
    if (!randomData.find((device) => device.uuid === uuid)) {
      res.status(404).json({
        message: "Device not found.",
      });
      return;
    }

    const telemetryData = getTelemetryData(String(uuid));

    res.status(200).json({
      device: telemetryData,
    });
    return;
  }

  if (req.method === "PUT") {
    const {
      query: { uuid },
    } = req;
    const { status } = req.body;
    const deviceIndex = randomData.findIndex((device) => device.uuid === uuid);

    if (!status) {
      res.status(400).json({
        message: "Status not provided in body",
      });
      return;
    }

    if (deviceIndex !== -1) {
      randomData[deviceIndex].status = status;
    } else {
      res.status(404).json({
        message: "Device not found.",
      });
      return;
    }

    res.status(200).json({
      device: randomData[deviceIndex],
    });

    return;
  }

  res.status(405).json({
    message: "Method not allowed.",
  });
};

export default devicesApi;
