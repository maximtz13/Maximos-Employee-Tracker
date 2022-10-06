const db = require('./db/connection');
begin = require('./util/promptUser')

db.connect(err => {
    if (err) throw err;
});

begin();