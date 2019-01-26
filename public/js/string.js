// string.js : for static string values such as database...

/*******************************************************
** Database String *************************************
*******************************************************/
const test_database = 'mongodb://localhost/test_database';
const dev_database = 'mongodb://localhost/dev_database';
const main_database = 'mongodb://localhost/main_database';

// set this database to dev_database or main_database
exports.database = test_database;

/*********************************************************
** Error Message ****************************************
********************************************************/
const error_404 = 'Error occured 404';


/*********************************************************
** Enum values ****************************************
********************************************************/
exports.suit = {
    SPADE : 0,
    DIAMOND : 1,
    HEART : 2,
    CLOVER : 3,
    NONE : 4
};

exports.job = {
    NONE : 0,
    JOKER : 1,
    JOKER_CALL : 2,
    MIGHTY : 3
};

exports.player_job = {
    LORD : 0,
    FRIEND : 1,
    YA : 2
};

exports.phase = {
    ELECTION : 0,
    PRE_GAME : 1,
    ON_GAME : 2
};

// export as module

