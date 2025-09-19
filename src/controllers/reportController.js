import { MedicationModel } from "../models/medicationModel.js";

export const ReportController = {
	async getTotalMedications(req, res) {
		try {
			const total = await MedicationModel.getTotalCount();
			res.json({ total });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
};
