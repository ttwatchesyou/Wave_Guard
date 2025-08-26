import { useEffect, useState } from "react";
import { connectMQTT } from "../lib/mqttClient"; // path ไปไฟล์ mqtt ของคุณ

export function useMqttTemp() {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    const client = connectMQTT();

    client.on("message", (topic: string, message: Buffer) => {
      if (topic === "Pump/Temp") {
        const value = parseFloat(message.toString());
        setTemp(value);
      }
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  return temp;
}
