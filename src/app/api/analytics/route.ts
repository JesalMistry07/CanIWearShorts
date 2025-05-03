export async function GET(req: Request) {

    try {
        const analytics = await fetch(`${process.env.ANALYTICS_API}`);

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


