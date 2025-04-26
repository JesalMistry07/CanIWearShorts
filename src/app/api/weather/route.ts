export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
  
    if (!city) {
      return new Response(JSON.stringify({ error: "City is required" }), {
        status: 400,
      });
    }
  
    try {
      const lambdaRes = await fetch(
        `https://fuihpvj7w7.execute-api.eu-west-2.amazonaws.com/prod/weather/${encodeURIComponent(city)}`
      );
  
      const text = await lambdaRes.text();
  
      if (!lambdaRes.ok) {
        return new Response(text, { status: lambdaRes.status });
      }
  
      return new Response(text, {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (err) {
      console.error("💥 Lambda fetch failed:", err);
      return new Response(JSON.stringify({ error: "Internal error" }), {
        status: 500,
      });
    }
  }
  