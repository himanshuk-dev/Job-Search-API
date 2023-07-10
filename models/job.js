const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job {
  /**
   * Create a new job
   *
   * data should be {title, salary, equity, company_handle }
   *
   * Returns {title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job already in database.
   ***/

  static async create({ title, salary, equity, handle }) {
    const duplicateCheck = await db.query(
      `SELECT title 
      FROM jobs 
      WHERE title = $1 
      AND handle = $2`,
      [title, handle]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate job: ${title}`);

    const result = db.query(
      `INSERT INTO jobs
            (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING  title, salary, equity, company_handle AS "handle"`,
      [title, salary, equity, handle]
    );

    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll(filters = {}) {
    let query = `SELECT handle,
                            title,
                            salary,
                            equity,
                            company_handle AS "handle",
                     FROM jobs`;
    let whereExpressions = [];
    let queryValues = [];

    const { title, minSalary, hasEquity } = filters;

    // For each possible search term, add to whereExpressions and queryValues

    if (title) {
      queryValues.push(`%${title}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }

    if (minSalary !== undefined) {
      queryValues.push(minSalary);
      whereExpressions.push(`salary >= $${queryValues.length}`);
    }

    if (hasEquity) {
      whereExpressions.push(`equity > 0`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    query += " ORDER BY name";
    const jobsRes = await db.query(query, queryValues);
    return jobsRes.rows;
  }
}
