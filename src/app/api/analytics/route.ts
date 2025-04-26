export async function GET(req: Request) {

    try {
        const analytics = await fetch(`https://fuihpvj7w7.execute-api.eu-west-2.amazonaws.com/prod/analytics`);

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
        console.error("💥 Lambda fetch failed:", error);
        return new Response(JSON.stringify({ error: "Internal error" }), {
            status: 500
        });
    }
}


