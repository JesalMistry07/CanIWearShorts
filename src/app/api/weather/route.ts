export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const WEATHER_API = process.env.WEATHER_API;

    if (!WEATHER_API) {
      console.error("Missing ANALYTICS_API env var.");
      return new Response(
        JSON.stringify({ error: "Missing ANALYTICS_API environment variable" }),
        { status: 500 }
      );
  }

    if (!city) {
      return new Response(JSON.stringify({ error: "City is required" }), {
        status: 400,
      });
    }
  
    try {

      const lambdaRes = await fetch(WEATHER_API);
 
      const text = await lambdaRes.text();
  
      if (!lambdaRes.ok) {
        return new Response(text, { status: lambdaRes.status });
      }
  
      return new Response(text, {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (err) {
      console.error("Lambda fetch failed:", err);
      return new Response(JSON.stringify({ error: "Internal error" }), {
        status: 500,
      });
    }
  }
  