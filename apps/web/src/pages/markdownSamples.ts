// Sample markdown ported verbatim from
// docs/design/Azores/page-markdown.jsx for the showcase.

export const SAMPLE_BLOG = `# Engineering at the edge of the Atlantic

How we built Azores Cloud — a regional-first platform that ships sub-20ms latency to all of Western Europe — and what we learned along the way.

:::note Heads up
This is a long-form post. Estimated reading time: **8 minutes**.
:::

## The premise

When we started Azores in 2024, every cloud provider was still pretending the world was flat. We didn't buy it. Latency *matters*, and the closer you can put compute to your users, the more humane your product feels.

Our north star metric: **p95 cold-start under 50ms** anywhere in EU-West.

## Architecture in one diagram

\`\`\`mermaid
graph LR
  Client[Client] --> Edge(Edge proxy)
  Edge --> Router{Region router}
  Router --> Lisbon[Lisbon]
  Router --> Frankfurt[Frankfurt]
  Lisbon --> DB[(Postgres)]
  Frankfurt --> DB
\`\`\`

Three pieces:
- An **edge proxy** terminates TLS in 30+ POPs
- A **region router** picks the cheapest healthy region for each request
- A **leader-follower Postgres** keeps writes consistent

## The numbers so far

\`\`\`chart
{
  "type": "line",
  "title": "p95 latency by region (ms)",
  "labels": ["Jan", "Feb", "Mar", "Apr"],
  "series": [
    { "name": "Lisbon",    "data": [142, 118, 96, 84] },
    { "name": "Frankfurt", "data": [156, 134, 112, 98] }
  ]
}
\`\`\`

> Latency is a feature. Treat it like one.

## A bit of math

For a request hitting region $r$ from client $c$, the wall-clock latency is:

$$
T_{c,r} = T_{net}(c, r) + T_{queue}(r) + T_{proc}(r)
$$

Our router minimizes the expected sum across healthy regions $r \\in R$.

## Code we ship

\`\`\`js
async function route(req) {
  const region = await pickRegion(req);
  const t0 = performance.now();
  const res = await fetchFromRegion(region, req);
  metrics.observe(region, performance.now() - t0);
  return res;
}
\`\`\`

## What's next

| Quarter | Milestone | Status |
| --- | --- | --- |
| Q2 | São Miguel region GA | Shipping |
| Q2 | SOC 2 Type II | In review |
| Q3 | Edge Functions v2 | Designing |
| Q3 | Postgres branching | Exploring |

:::tip Try it yourself
\`\`\`bash
$ npm i -g @azores/cli
$ azores deploy
\`\`\`
:::

Thanks for reading. — _The Azores team_
`;

export const SAMPLE_DOCS = `# Tunneling with ngrok-style routes

Expose any local service to the public internet in seconds.

## Quickstart

\`\`\`bash:terminal
$ azores tunnel http 3000
Forwarding   https://blue-orca-92.azores.app -> http://localhost:3000
Region       lisbon
Latency      8ms
\`\`\`

That's it. Your local app is now public.

:::warn Security note
Tunnels are public by default. Add \`--auth user:pass\` for basic auth, or \`--allow-cidr\` to restrict by IP.
:::

## Anatomy of a tunnel

\`\`\`mermaid
graph TD
  Local[Local app :3000] --> Agent(Azores agent)
  Agent --> Edge[Edge POP]
  Edge --> Public((Public URL))
\`\`\`

## Configuration

| Flag | Default | Description |
| --- | --- | --- |
| \`--region\` | \`lisbon\` | Edge POP to bind to |
| \`--subdomain\` | random | Custom subdomain (paid) |
| \`--auth\` | — | HTTP basic auth |
| \`--inspect\` | \`true\` | Local request inspector |

## Programmatic SDK

\`\`\`python:tunnel.py
from azores import Tunnel

with Tunnel.http(3000, region="lisbon") as t:
    print(f"Public URL: {t.url}")
    t.wait_forever()
\`\`\`

\`\`\`go:main.go
package main

import "github.com/azores/sdk-go"

func main() {
    t, _ := azores.NewTunnel(azores.HTTP(3000))
    defer t.Close()
    select {}
}
\`\`\`

\`\`\`rust:main.rs
use azores::Tunnel;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let t = Tunnel::http(3000).region("lisbon").start().await?;
    println!("public: {}", t.url());
    t.wait().await
}
\`\`\`

## Querying tunnel logs

\`\`\`sql
SELECT region, count(*) AS req, avg(latency_ms) AS p50
FROM tunnel_logs
WHERE created_at > now() - interval '1 hour'
GROUP BY region
ORDER BY req DESC;
\`\`\`

## Diff: v1 → v2 config

\`\`\`diff
  [tunnel]
  port = 3000
- region = "default"
+ region = "lisbon"
+ inspect = true
\`\`\`

## Pricing math

Each tunnel uses metered bandwidth. Cost per month:

$$
\\text{cost} = \\text{base} + (\\text{GB out}) \\times \\$0.02
$$

:::tip Free tier
First **5 GB/month** are free. No card required.
:::

## Troubleshooting

- **\`ECONNREFUSED\`** — the local port isn't listening yet
- **TLS errors** — pass \`--insecure-local\` if hitting an HTTPS app on localhost
- **Slow** — try a closer region with \`--region frankfurt\`

> If your tunnel disconnects, the agent reconnects automatically with exponential backoff.
`;
