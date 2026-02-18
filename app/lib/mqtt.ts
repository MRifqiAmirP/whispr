import mqtt from "mqtt";

let client: mqtt.MqttClient | null = null;

export function getMqttClient() {
  if (!client) {
    client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
    });
  }

  return client;
}
