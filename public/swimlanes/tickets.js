window.tickets = function(callback) {
    d3.csv("tickets.csv", function(d){
        console.log(JSON.stringify(d,undefined,2));
        callback(d);
    });
};
