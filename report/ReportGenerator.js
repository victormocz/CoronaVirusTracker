const util = require('util');
const Covid = require('../clients').Covid;

class ReportGenerator {
    static generateDailyReport() {
        const dailyReportFormat = "Welcome to Coronavirus tracker, At present, there are %d people were tested, %d are positive, %d are negative, %d deaths "
            + "and %d people hospitalized in United state.";
        const errorReport = "Sorry, we are having trouble to retrieve data right now, please try again later";
        return Covid.retrieveCurrentData().then((data)=> {
            const current = data[0];
            return util.format(dailyReportFormat, current.total, current.positive, current.negative, current.death, current.hospitalized);
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