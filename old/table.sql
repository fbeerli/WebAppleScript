/*  ====================================  */
/*    Datenbankdiagramm for template_01    */
/*  ====================================  */



/*  ==========  template_01  ==========  */

DROP TABLE IF EXISTS template_01;
CREATE TABLE IF NOT EXISTS template_01 (
    pk              INTEGER PRIMARY KEY AUTOINCREMENT,
    template_01     INTEGER DEFAULT 0,
    remark          TEXT,
    user_fk         INTEGER
);

