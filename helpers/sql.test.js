const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", () => {
  test("works: 2 keys", () => {
    const result = sqlForPartialUpdate(
      { firstName: "Aliya", age: 32 },
      { firstName: "first_name", lastName: "last_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  test("works: 1 key", () => {
    const result = sqlForPartialUpdate(
      { age: 32 },
      { firstName: "first_name", lastName: "last_name" }
    );
    expect(result).toEqual({
      setCols: '"age"=$1',
      values: [32],
    });
  });

  test("works: keys not in jsToSql", () => {
    const result = sqlForPartialUpdate(
      { firstName: "Aliya", age: 32 },
      { lastName: "last_name" }
    );
    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  test("throws BadRequestError with no data", () => {
    expect(() => sqlForPartialUpdate({}, { firstName: "first_name" })).toThrow(
      new BadRequestError("No data")
    );
  });
});
