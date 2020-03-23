const util = require('util');
const Covid = require('../clients').Covid;

class ReportGenerator {
    static generateDailyReport() {
        const dailyReportFormat = "Welcome to Coronavirus tracker, Today in United States, there are totally %d people were tested, %d are positive, %d are negative, %d people are pending for the result. There are %d people dead"
            + "and %d people hospitalized.";
        const errorReport = "Sorry, we are having trouble to retrieve data right now, please try again later";
        return Covid.retrieveCurrentData().then((data)=> {
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
        }).catch((err)=> {
            return errorReport;
        });   
    }
}

ReportGenerator.generateDailyReport().then((report)=>{
    console.log(report);
});

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