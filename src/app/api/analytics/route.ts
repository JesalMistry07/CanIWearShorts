export async function GET(req: Request) {

    const analyticsUrl = process.env.ANALYTICS_API;

    console.log("ANALYTICS_API:", analyticsUrl);


    if (!analyticsUrl) {
        console.error("Missing ANALYTICS_API env var.");
        return new Response(
          JSON.stringify({ error: "Missing ANALYTICS_API environment variable" }),
          { status: 500 }
        );
    }


    try {
        const analytics = await fetch(analyticsUrl);


        if (!analytics.ok) {
            const errorText = await analytics.text();
            return new Response(errorText, { status: analytics.status });
        }
        
        const json = await analytics.json();
        return new Response(JSON.stringify(json), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Lambda fetch failed:", error);
        return new Response(JSON.stringify({ error: "Internal error" }), {
            status: 500
        });
    }
}


