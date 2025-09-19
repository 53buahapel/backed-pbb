  // ...existing code...
import { supabase } from "../config/supabaseClient.js";

export const CategoryModel = {
  async create(name) {
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw error;
    return data;
  },

  async getAllPaginated(page, limit) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await supabase
      .from("categories")
      .select("*", { count: "exact" })
      .range(from, to);
    if (error) throw error;
    return {
      data,
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit)
    };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, name) {
    const { data, error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    return { message: "Category deleted" };
  },
};
