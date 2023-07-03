const { BadRequestError } = require("../expressError");

/**
 * Function to create SQL query string and a list of values for a partial update.
 * It is used when you want to update some, but not all, columns of a record.
 *
 * Accepts two parameters:
 *
 * 1. dataToUpdate - An object where the keys are the column names of the
 * table we want to update, and the values are the new values we want to set.
 * Example:
 * {firstName: 'Aliya', age: 32}
 *
 * 2. jsToSql - This is a map from JavaScript-style camel case to SQL-style
 * snake case column names.
 *
 * Example:
 * {firstName: 'first_name', lastName: 'last_name'}
 *
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);

  // Throw BadRequestError if the object is empty.
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  /**
   *
   * Returns an object containing a setCols property, which is a string that can be
   * put into a SQL query, and a values property, which is an array of the new values we want
   * to set in the update query.
   *
   * Example return:
   * {setCols: '"first_name"=$1, "age"=$2', values: ['Aliya', 32]}
   *
   **/
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
