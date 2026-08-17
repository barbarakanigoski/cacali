import { supabase } from "./supabase";

export async function getSiteTexts(keys: string[]): Promise<Record<string, string>> {
  try {
    const { data } = await supabase
      .from("site_config")
      .select("key, value")
      .in("key", keys);

    const result: Record<string, string> = {};
    if (data) {
      for (const row of data) {
        result[row.key] = row.value;
      }
    }
    return result;
  } catch {
    return {};
  }
}

export async function saveSiteTexts(texts: Record<string, string>) {
  const entries = Object.entries(texts).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("site_config").upsert(entries);
  if (error) throw error;
}
