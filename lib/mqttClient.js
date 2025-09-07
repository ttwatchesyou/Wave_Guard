import mqtt from "mqtt";

let client;

export function connectMQTT() {
  if (!client) {
    client = mqtt.connect(
      "wss://0d495914d04845f5914e55fd3e65c6e4.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "hivemq.webclient.1756230627337",
        password: "!MN.8uI9x2GAvdJf#,1w",
        clean: true,
        reconnectPeriod: 1000, // reconnect อัตโนมัติทุก 1 วิ
      }
    );

    client.on("connect", () => {
      console.log("✅ MQTT Temp Connected");
      client.subscribe("Wave_Guard/WIND");
    });

    client.on("connect", () => {
      console.log("✅ MQTT Flow Connected");
      client.subscribe("Wave_Guard/WAVE");
    });

    client.on("connect", () => {
      console.log("✅ MQTT Status Connected");
      client.subscribe("Pump/Status");
    });

    client.on("message", (topic, message) => {
      console.log("📩", topic, message.toString());
    });

    client.on("error", (err) => {
      console.error("❌ MQTT Error:", err);
    });
  }
  return client;
}

export function publishMQTT(topic, message) {
  if (client && client.connected) {
    client.publish(topic, message);
  } else {
    console.warn("⚠️ MQTT not connected yet!");
  }
}
