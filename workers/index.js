
export default {
async fetch(request, env) {

const url = new URL(request.url);

if(url.pathname === "/api/lead" && request.method === "POST"){
    const data = await request.json();

    await env.DB.prepare(
      "INSERT INTO leads(name,email,service,budget) VALUES(?1,?2,?3,?4)"
    ).bind(
      data.name,
      data.email,
      data.service,
      data.budget
    ).run();

    return new Response(JSON.stringify({ok:true}),{
      headers:{'content-type':'application/json'}
    });
}

if(url.pathname === "/api/stats"){
    const x = await env.DB.prepare(
      "SELECT COUNT(*) as total FROM leads"
    ).first();

    return new Response(JSON.stringify(x),{
      headers:{'content-type':'application/json'}
    });
}

return new Response("ForgeOS Worker Running");
}
}
