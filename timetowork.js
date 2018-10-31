/* global Module */

/* Magic Mirror
 * Module: TimeToWork
 *
 * By Mike Pippin
 * MIT Licensed.
 */

Module.register("timetowork",{
    // Default module config.
    defaults: {
            height:"300px",
            width:"100%",
            key: "MAPQUEST API KEY",
            from_loc: "FROM LOCATION",
            to_loc: "TO LOCATION",
            header: "Travel time to Work"
    },
    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.cur_time = "Loading...";
        // Schedule update interval.
        var self = this;

        setInterval(function() {
            self.updateTime();
        }, 30000);
    },

    updateTime: function(delay) {

        var self = this;
        this.sendSocketNotification("FETCH_TIME", {
                config: self.config
            });
            //self.updateDom();
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        this.cur_time = payload.timet;
        this.updateDom();
    },
    getHeader: function() {
        return 'Travel time to Work';
    },
    // Override dom generator.
    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.style = "border:0";
        wrapper.width = this.config.width;
        wrapper.height = this.config.height;
        wrapper.fontSize = "300%";
        wrapper.className = "time bright large light";
        if(this.cur_time[0]=="0"){
            this.cur_time=this.cur_time.slice(1,this.cur_time.length);
        }
        if(this.cur_time[0]=="0"){
            this.cur_time=this.cur_time.slice(1,this.cur_time.length);
        }
        if(this.cur_time.indexOf(":")!==-1){
            this.cur_time=this.cur_time.slice(this.cur_time.length-3,this.cur_time.length);
        }
        if(this.cur_time[0]==":"){
            this.cur_time=this.cur_time.slice(1,this.cur_time.length)+" mins";
        }
        else if (this.cur_time.indexOf(":")!==-1){
            var splitter = this.cur_time.split(":");
            this.cur_time = splitter[0]+" hours, "+splitter[1]+" mins";
        }
        var timet = document.createTextNode(this.cur_time);
        timet.fontSize = "300%";
        wrapper.appendChild( timet );


        return wrapper;
    }

});

