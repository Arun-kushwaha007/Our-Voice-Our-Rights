import { fetchMGNREGAData } from "../services/mgnregaService";
import District from "../models/District";
import { connectDB } from "../config/db";

const updateDistrictData = async () => {
    await connectDB();
    const records = await fetchMGNREGAData();

    if (records.length > 0) {
        for (const record of records) {
            const filter = { code: record.district_code };

            // Performance index calculation (example)
            const personDaysProvided = parseFloat(record.total_person_days_of_work_provided_against_person_days_demanded);
            const avgDaysEmployment = parseFloat(record.average_days_of_employment_provided_per_household);
            const performanceIndex = (personDaysProvided * 0.6) + (avgDaysEmployment * 0.4);

            const update = {
                name: record.district,
                state: record.state,
                performanceIndex: parseFloat(performanceIndex.toFixed(2)),
                lastUpdated: new Date()
            };
            await District.findOneAndUpdate(filter, update, { upsert: true, new: true });
        }
    }

    console.log("District data updated successfully.");
    process.exit(0);
};

updateDistrictData();
