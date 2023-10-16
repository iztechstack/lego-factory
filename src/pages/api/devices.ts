import type { NextApiRequest, NextApiResponse } from "next";
import randomData from "./data";

const devicesApi = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    devices: randomData,
  });
};

export default devicesApi;
