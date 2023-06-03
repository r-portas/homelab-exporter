import { register, collectDefaultMetrics, Gauge } from "prom-client";

console.log("Initializing metrics...");
collectDefaultMetrics({
  prefix: "homelab_exporter_",
});

export async function getMetrics() {
  return await register.metrics();
}

export { Gauge };
