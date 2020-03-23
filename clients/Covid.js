const axios = require('axios').default;

class Covid {
    static retrieveDailyData() {
        return axios.get("https://covidtracking.com/api/us/daily").then((res)=>{
            return res.data;
        }).catch((err)=>{
            console.error(err.data);
            return err;
        });
    }

    static retrieveStateData() {
        return axios.get("https://covidtracking.com/api/states/daily").then((res)=> {
            return res.data;
        }).catch((err)=> {
            console.error(err.data);
            return err;
        });
    }
}

module.exports = Covid;