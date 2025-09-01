import { useCallback } from "react";
import { connectMQTT, publishMQTT } from "../lib/mqttClient";

export function useMqttControl() {
  // เรียก connectMQTT เพื่อแน่ใจว่า client พร้อม
  connectMQTT();

  // ฟังก์ชัน publish สำหรับเปิด
  const turnOn = useCallback(() => {
    publishMQTT("Pump/Control", "ON");
  }, []);

  // ฟังก์ชัน publish สำหรับปิด
  const turnOff = useCallback(() => {
    publishMQTT("Pump/Control", "OFF");
  }, []);

  return { turnOn, turnOff };
}
