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
   * Returns [{title, salary, equity, company_handle }, ...]
   * */

  static async findAll(filters = {}) {
    let query = `SELECT title, 
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
  /** Given a job title, return data about job.
   *
   * Returns {title, salary, equity, company_handle }
   *   where jobs is [{id, title, salary, equity, company_handle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(title) {
    const jobRes = await db.query(
      `SELECT title, 
          salary, 
          equity, 
          company_handle AS "handle",
          FROM jobs
          WHERE title = $1`,
      [title]
    );

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity, company_handle }
   *
   * Returns {title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   */

  static async update(title, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      salary: "salary",
      equity: "equity",
    });
    const titleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                    SET ${setCols} 
                    WHERE title = ${titleVarIdx} 
                    RETURNING title, 
                              salary, 
                              equity, 
                              company_handle AS "handle"`;
    const result = await db.query(querySql, [...values, title]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(title) {
    const result = await db.query(
      `DELETE
         FROM jobs
         WHERE title = $1
         RETURNING title`,
      [title]
    );
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);
  }
}

module.exports = Job;
