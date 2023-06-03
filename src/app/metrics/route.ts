import { getMetrics } from "@/lib/metrics";
import { fetchWeather } from "@/lib/weather";

// Don't cache the metrics endpoint
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  await fetchWeather();

  const metrics = await getMetrics();
  return new Response(metrics);
}
