/**
 * POST /api/submit
 * Validates the intake form and UPSERTs a profile by unique name.
 * Interests arrive as a FormData list and are stored comma-separated.
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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB) {
    return json({ success: false, error: "Database binding missing" }, 500);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, error: "Invalid form data" }, 400);
  }

  const name = String(form.get("name") || "").trim();
  if (!name) {
    return json({ success: false, error: "Name is required" }, 400);
  }

  // Checkbox group: FormData.getAll returns every checked value
  const interestsList = form
    .getAll("interests")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const interests = interestsList.join(", ");

  const gift_ideas = String(form.get("gift_ideas") || "").trim();
  const sizes = String(form.get("sizes") || "").trim();
  const favorite_stores = String(form.get("favorite_stores") || "").trim();
  const avoid = String(form.get("avoid") || "").trim();
  const hobbies = String(form.get("hobbies") || "").trim();
  const notes = String(form.get("notes") || "").trim();

  try {
    // UNIQUE(name) drives UPSERT — resubmitting updates the same row
    await env.DB.prepare(
      `INSERT INTO profiles
        (name, interests, gift_ideas, sizes, favorite_stores, avoid, hobbies, notes, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(name) DO UPDATE SET
         interests = excluded.interests,
         gift_ideas = excluded.gift_ideas,
         sizes = excluded.sizes,
         favorite_stores = excluded.favorite_stores,
         avoid = excluded.avoid,
         hobbies = excluded.hobbies,
         notes = excluded.notes,
         updated_at = datetime('now')`
    )
      .bind(
        name,
        interests,
        gift_ideas,
        sizes,
        favorite_stores,
        avoid,
        hobbies,
        notes
      )
      .run();

    return json({ success: true });
  } catch (err) {
    console.error("submit error", err);
    return json({ success: false, error: "Could not save profile" }, 500);
  }
}
