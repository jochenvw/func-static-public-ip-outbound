const https = require("https")
const data = JSON.stringify({ "message": "Hello from Azure Function" })

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    if (myTimer.IsPastDue) {
        context.log('JavaScript is running late!');
    }

    const options = {
        hostname: "[yourendpoint].m.pipedream.net",
        port: 443,
        path: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }

    const req = https.request(options, resp => {
        let data = ""
        resp.on("data", chunk => {
            data += chunk
        })
        resp.on("end", () => {
            console.log(JSON.parse(data))
        })
    }).on("error", err => {
        console.error("[error] " + err.message)
    })
    req.write(data)
    req.end()
    context.log('JavaScript timer trigger function ran!', timeStamp);
};