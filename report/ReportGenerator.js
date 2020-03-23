const util = require('util');
const Covid = require('../clients').Covid;
const stateToAbbr = require('../util').stateToAbbr;


class ReportGenerator {
    static generateDailyReport() {
        const dailyReportFormat = "Welcome to Coronavirus tracker, Today in United States, there are total %d people tested, %d are positive, %d are negative, %d people are pending for the result. There are %d people dead,"
            + "and %d people are hospitalized,";
        const errorReport = "Sorry, we are having trouble to retrieve data right now, please try again later";
        return Covid.retrieveDailyData().then((data) => {
            if (data.length == 0) {
                throw new Error("Failed to fetch the data");
            }
            const current = data[data.length - 1];
            const dailyReport = util.format(dailyReportFormat, current.total, current.positive, current.negative, current.pending, current.death, current.hospitalized);
            var extraReport = "";
            if (data.length >= 2) {
                const yesterday = data[data.length - 2];
                const extraReportFormat = "Compares to yesterday, there are %d newly tested people, %d new positive, %d people dead.";
                extraReport = util.format(extraReportFormat, current.total - yesterday.total, current.positive - yesterday.positive, current.death - yesterday.death);
            }
            return dailyReport + extraReport;
        }).catch((err) => {
            return errorReport;
        });
    }

    static generateStateReport(state) {
        var report = "Today in " + state + ", ";
        return Covid.retrieveStateData().then((data) => {
            const stateAbbr = stateToAbbr(state,'abbr');
            const stateData = data.filter((item) => {
                return item.state === stateAbbr;
            });
            if (stateData && stateData.length >= 1) {
                if (stateData[0].total) {
                    report += "There are total " + stateData[0].total + " people tested. ";
                }
                if (stateData[0].positive) {
                    report += stateData[0].positive + " are positive. "
                }
                if (stateData[0].negative) {
                    report += stateData[0].negative + " are negative. "
                }
                if (stateData[0].pending) {
                    report + stateData[0].pending + " are pending for the result. "
                }
                if (stateData[0].death) {
                    report += stateData[0].death + " are dead. "
                }
            }
            if (stateData && stateData.length >= 2) {
                report += "Compares to yesterday,"
                if (stateData[1].total) {
                    report += "There are " + (stateData[0].total - stateData[1].total) + " newly tested people. ";
                }
                if (stateData[1].positive) {
                    report += (stateData[0].positive - stateData[1].positive) + " new positive. ";
                }
                if (stateData[1].death) {
                    report += (stateData[0].death - stateData[1].death) + " people dead. ";
                }
            }
            return report;
        }).catch((err) => {
            console.error(err);
            return "Sorry, we are having trouble to retrieve data right now, please try again later.";
        });
    }
}

module.exports = ReportGenerator;
/*
data
{ date: 20200322,
    states: 56,
    positive: 31888,
    negative: 193486,
    posNeg: 225374,
    pending: 2842,
    hospitalized: 2554,
    death: 398,
    total: 228216 }
*/