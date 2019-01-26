// Log class

function Log(root) {
    return {
        err: function(err_msg) {
            console.log("<" + root + "> " + "[ERROR]: " + err_msg);
        },
        
        log: function(tag, msg) {
            if (tag === null) {
                console.log("<" + root + "> " + err_msg);
            } else {
                console.log("<" + root + ">" + "[" + tag + "]: " + msg);
            }
        }
    };
}

module.exports = Log;