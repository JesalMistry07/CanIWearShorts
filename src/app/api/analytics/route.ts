

export async function GET(req: Request) {

    let ANALYTICS_API; 

    
    try {
        // @ts-ignore
        const { secrets } = await import('aws-amplify');
        const runtimeSecrets = await secrets();
        ANALYTICS_API = runtimeSecrets.ANALYTICS_API;

    } catch (err) {
        console.warn("Falling back to process.env (local dev likely)", err);
        ANALYTICS_API = process.env.ANALYTICS_API;
      }



    if (!ANALYTICS_API) {
        console.error("Missing ANALYTICS_API env var.");
        return new Response(
          JSON.stringify({ error: "Missing ANALYTICS_API environment variable" }),
          { status: 500 }
        );
    }


    try {
        const analytics = await fetch(ANALYTICS_API);


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


