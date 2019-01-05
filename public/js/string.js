// string.js : for static string values such as database...

/*******************************************************
** Database String *************************************
*******************************************************/
const test_database = 'mongodb://localhost/test_databas';
const dev_database = 'mongodb://localhost/dev_database';
const main_database = 'mongodb://localhost/main_database';

// set this database to dev_database or main_database
var database = test_database;

/*********************************************************
** Error Message ****************************************
********************************************************/
const error_404 = 'Error occured 404';


/*********************************************************
** Enum values ****************************************
********************************************************/
const suit = {
    SPADE : 0,
    DIAMOND : 1,
    HEART : 2,
    CLOVER : 3,
    NONE : 4
};
const job = {
    NONE : 0,
    JOKER : 1,
    JOKER_CALL : 2,
    MIGHTY : 3
};