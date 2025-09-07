import { useEffect, useState } from "react";
import { connectMQTT } from "../lib/mqttClient";

export function useMqttStatus() {
  const [status, setStatus] = useState<string>("OFF");

  useEffect(() => {
    const client = connectMQTT();

    client.on("connect", () => {
      client.subscribe("Pump/Status");
    });

    client.on("message", (topic: string, message: Buffer) => {
      if (topic === "Pump/Status") {
        const value = message.toString();
        setStatus(value);
      }
    });

    return () => {};
  }, []);

  return status;
}
