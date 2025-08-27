import { useEffect, useState } from "react";
import { connectMQTT } from "../lib/mqttClient";

export function useMqttFlow() {
  const [flow, setFlow] = useState<number | null>(null);

  useEffect(() => {
    const client = connectMQTT();

    client.on("message", (topic: string, message: Buffer) => {
      if (topic === "Pump/Flow") {
        const value = parseFloat(message.toString());
        setFlow(value);
      }
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return flow;
}
