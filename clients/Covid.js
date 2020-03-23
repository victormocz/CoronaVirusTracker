const axios = require('axios').default;

class Covid {
    static retrieveCurrentData() {
        return axios.get("https://covidtracking.com/api/us/daily").then((res)=>{
            return res.data;
        }).catch((err)=>{
            console.error(err.data);
            return err;
        });
    }
}

module.exports = Covid;