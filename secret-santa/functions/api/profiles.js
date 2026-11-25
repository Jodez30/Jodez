/**
 * GET /api/profiles
 * Returns every profile ordered by name for the profiles viewer.
 */

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      ...JSON_HEADERS,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.DB) {
    return json({ success: false, error: "Database binding missing" }, 500);
  }

  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, interests, gift_ideas, sizes, favorite_stores, avoid, hobbies, notes, updated_at
       FROM profiles
       ORDER BY name COLLATE NOCASE ASC`
    ).all();

    return json({ success: true, profiles: results || [] });
  } catch (err) {
    console.error("profiles error", err);
    return json({ success: false, error: "Could not load profiles" }, 500);
  }
}
