import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  async getAllPaginated(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const name = req.query.name || "";
      const results = await MedicationModel.search({ name });
      if (results.length === 0) {
        return res.status(404).json({ error: "No medications found" });
      }
      const result = await MedicationModel.getAllPaginated(page, limit, name);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async search(req, res) {
    try {
      const { name } = req.query;
      const results = await MedicationModel.search({ name });
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const med = await MedicationModel.getById(req.params.id);
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      let data = req.body;
      console.log(data);
      if (data.price < 0) {
        return res.status(400).json({ error: "Price cannot be negative" });
      }
      if (data.quantity < 0) {
        return res.status(400).json({ error: "Quantity cannot be negative" });
      } 
      const med = await MedicationModel.create(data);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const med = await MedicationModel.update(req.params.id, req.body);
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await MedicationModel.remove(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
