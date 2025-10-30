"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRawData = void 0;
const parseRawData = (rawData) => {
    return rawData.map((item) => ({
        state: item.state_name,
        districtId: item.district_code,
        districtName: item.district_name,
        year: parseInt(item.year, 10),
        month: parseInt(item.month, 10),
        metrics: {
            beneficiaries: parseInt(item.total_beneficiaries, 10),
            fundsReleased: parseFloat(item.total_funds_released_rs_cr),
            daysWorked: parseInt(item.total_persondays_worked, 10),
        },
        raw: item,
    }));
};
exports.parseRawData = parseRawData;
