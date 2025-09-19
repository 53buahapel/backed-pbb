  // ...existing code...
import { supabase } from "../config/supabaseClient.js";

export const SupplierModel = {
  async getAll() {
    const { data, error } = await supabase.from("suppliers").select("*");
    if (error) throw error;
    return data;
  },

  async getAllPaginated(page, limit) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await supabase
      .from("suppliers")
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
      .from("suppliers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(supplier) {
    const { data, error } = await supabase
      .from("suppliers")
      .insert([supplier])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, supplier) {
    const { data, error } = await supabase
      .from("suppliers")
      .update(supplier)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("suppliers").delete().eq("id", id);
    if (error) throw error;
    return { message: "Deleted successfully" };
  },
};
