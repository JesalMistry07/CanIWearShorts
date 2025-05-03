
# ☀️ Can I Wear Shorts? 

Can I Wear Shorts? is a full-stack weather-based decision tool that tells users whether it's a good idea to wear shorts, based on live weather data.

Built with a modern React + Next.js frontend, it connects to a .NET serverless backend on AWS Lambda that handles secure API calls and logs user searches to an RDS MySQL database. The UI is fully responsive, accessible, and styled with Tailwind CSS.

✨ Features
Live weather-based shorts recommendation

Search logging to track popular locations and usage trends

Analytics dashboard displaying:

Most searched cities and countries

Hottest, coldest, and windiest locations

Most popular time of day (day/night)

Total number of searches

Clean architecture with separation of concerns across services, controllers, and data access

Deployed and accessible at: caniwearshorts.com




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_WEATHER_API`

`NEXT_PUBLIC_ANALYTICS_API`

