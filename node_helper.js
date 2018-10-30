
var NodeHelper = require("node_helper");
const request = require('request');

module.exports = NodeHelper.create({
        // Subclass start method.
        start: function() {
                console.log("Starting module: " + this.name);
                this.config = [];
        },

        // Subclass socketNotificationReceived received.
        socketNotificationReceived: function(notification, payload) {
                if (notification === "FETCH_TIME") {
                        this.config = payload.config;
                        this.getTime();
                        return;
                }
        },
        getTime:function(){
                var url_main = "http://open.mapquestapi.com/directions/v2/route?key="+this.config.key+"&from="+this.config.from_loc+"&to="+this.config.to_loc;

        request(url_main, { json: true }, (err, res, body) => {
            if (err) {
                                this.sendSocketNotification("FETCH_ERROR", {
                                        timet: err
                                });

                                console.log(err);
                                return;

                        }
            //console.log(body.url);
                        this.sendSocketNotification("FETCH_SUCCESS", {
                                        timet: body.route.formattedTime
                                });

            console.log(body.route.formattedTime);
                        return;
            //wrapper.src =  ;

        });
    }
});


