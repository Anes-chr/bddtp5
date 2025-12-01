export const lessonsContent = {
  "1": {
    title: "SQL Basics & SELECT Statements",
    description: "Master the fundamentals of SQL with SELECT, projection, and basic filtering",
    queryIds: [1, 2, 3, 9, 10, 15],
    concepts: [
      {
        title: "Introduction to SQL",
        content: "SQL (Structured Query Language) is the standard language for communicating with databases. It allows you to retrieve, insert, update, and delete data. In this course, we'll focus on data retrieval using the SELECT statement.",
        example: "SELECT * FROM TableName;",
        explanation: "This is the simplest query. The asterisk (*) means 'all columns'. It asks the database to show every piece of data in the table."
      },
      {
        title: "The SELECT Statement",
        content: "The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.",
        example: "SELECT FirstName, Salary FROM Employees;",
        explanation: "Here, we are asking for only the 'FirstName' and 'Salary' columns. This is called 'Projection' - choosing specific columns to view."
      },
      {
        title: "Eliminating Duplicates (DISTINCT)",
        content: "Sometimes a table contains duplicate values. The DISTINCT keyword is used to return only distinct (different) values.",
        example: "SELECT DISTINCT Position FROM Employees;",
        explanation: "If multiple employees have the same position (e.g., 'Manager'), this query will list 'Manager' only once. It gives you a list of unique positions."
      },
      {
        title: "Handling NULL Values",
        content: "NULL represents a missing or unknown value. It is not the same as zero or an empty string. You cannot use = NULL to check for it.",
        example: "SELECT FirstName FROM Employees WHERE HireDate IS NOT NULL;",
        explanation: "We use IS NULL or IS NOT NULL to check for missing values. This query finds employees who have a known hire date."
      }
    ]
  },
  "2": {
    title: "Filtering with WHERE & Operators",
    description: "Learn powerful filtering techniques with WHERE, LIKE, BETWEEN, and IN",
    queryIds: [3, 7, 12, 15, 16, 17],
    concepts: [
      {
        title: "The WHERE Clause",
        content: "The WHERE clause is used to filter records. It extracts only those records that fulfill a specified condition.",
        example: "SELECT * FROM Employees WHERE Salary > 80000;",
        explanation: "This query returns only the employees who earn more than 80,000. Rows that don't meet this condition are excluded."
      },
      {
        title: "Comparison Operators",
        content: "SQL supports standard operators: = (equal), <> or != (not equal), > (greater or equal), < (less or equal).",
        example: "SELECT FirstName FROM Employees WHERE Position = 'Manager';",
        explanation: "Finds all employees where the 'Position' column exactly matches the text 'Manager'."
      },
      {
        title: "Pattern Matching (LIKE)",
        content: "The LIKE operator is used in a WHERE clause to search for a specified pattern in a column. The percent sign (%) represents zero, one, or multiple characters.",
        example: "SELECT FirstName FROM Employees WHERE FirstName LIKE 'M%';",
        explanation: "Finds any values that start with 'M'. 'Michael', 'Maria', 'Mark' would all match."
      },
      {
        title: "Logical Operators (AND, OR)",
        content: "The AND and OR operators are used to filter records based on more than one condition. AND requires ALL conditions to be true. OR requires AT LEAST ONE condition to be true.",
        example: "SELECT FirstName FROM Employees WHERE Salary > 80000 AND Position = 'Manager';",
        explanation: "Finds employees who are BOTH managers AND earn more than 80,000."
      }
    ]
  },
  "3": {
    title: "Joins & Relationships",
    description: "Understand how to combine tables using INNER JOIN and cartesian products",
    queryIds: [4, 5, 6, 13, 14, 30],
    concepts: [
      {
        title: "Relational Databases",
        content: "In a relational database, data is split into related tables to reduce redundancy. For example, instead of storing department details with every employee, we store employees in one table and departments in another, linking them with an ID.",
        example: "Employees (DeptId) -> Departments (DeptId)",
        explanation: "The 'DeptId' column in the Employees table is a Foreign Key that points to the 'DeptId' Primary Key in the Departments table."
      },
      {
        title: "INNER JOIN",
        content: "The INNER JOIN keyword selects records that have matching values in both tables.",
        example: "SELECT Employees.FirstName, Departments.Name FROM Employees INNER JOIN Departments ON Employees.DeptId = Departments.DeptId;",
        explanation: "This combines rows from Employees and Departments where the DeptId matches. You get the employee's name alongside their department's name."
      },
      {
        title: "Cartesian Product",
        content: "If you join two tables without a condition, you get a Cartesian product: every row from the first table paired with every row from the second table.",
        example: "SELECT * FROM Employees, Departments;",
        explanation: "With 20 employees and 6 departments, this returns 120 rows (20 * 6). It's rarely useful but important to understand why the ON clause is necessary."
      },
      {
        title: "Joining with Filtering",
        content: "You can combine JOINs with WHERE clauses to filter the joined data.",
        example: "SELECT E.FirstName FROM Employees E JOIN Departments D ON E.DeptId = D.DeptId WHERE D.City = 'New York';",
        explanation: "First joins employees to departments, then filters to keep only those departments located in 'New York'."
      }
    ]
  },
  "4": {
    title: "Aggregate Functions",
    description: "COUNT, AVG, MAX, MIN, SUM - Master data aggregation",
    queryIds: [11, 12, 16, 17, 18, 29],
    concepts: [
      {
        title: "What are Aggregate Functions?",
        content: "Aggregate functions perform a calculation on a set of values and return a single value. They are often used to summarize data.",
        example: "SELECT COUNT(*) FROM Employees;",
        explanation: "Counts the total number of rows in the table."
      },
      {
        title: "Common Functions",
        content: "AVG() returns the average value. SUM() returns the sum. MAX() returns the largest value. MIN() returns the smallest value.",
        example: "SELECT AVG(Salary) FROM Employees;",
        explanation: "Calculates the average salary of all employees."
      },
      {
        title: "Aliases (AS)",
        content: "SQL aliases are used to give a table, or a column in a table, a temporary name. This makes results more readable.",
        example: "SELECT MAX(Salary) AS MaxSalary FROM Employees;",
        explanation: "The result column will be named 'MaxSalary' instead of 'MAX(Salary)'."
      },
      {
        title: "COUNT DISTINCT",
        content: "You can count unique values by combining COUNT and DISTINCT.",
        example: "SELECT COUNT(DISTINCT Position) FROM Employees;",
        explanation: "Counts how many different positions exist, ignoring duplicates."
      }
    ]
  },
  "5": {
    title: "GROUP BY & HAVING",
    description: "Group data and filter groups for powerful analytics",
    queryIds: [31, 33, 34, 35],
    concepts: [
      {
        title: "The GROUP BY Statement",
        content: "The GROUP BY statement groups rows that have the same values into summary rows, like 'find the number of customers in each country'.",
        example: "SELECT DeptId, COUNT(*) FROM Employees GROUP BY DeptId;",
        explanation: "This counts how many employees are in EACH department. It creates one result row per department ID."
      },
      {
        title: "Using Aggregates with GROUP BY",
        content: "GROUP BY is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by one or more columns.",
        example: "SELECT Position, AVG(Salary) FROM Employees GROUP BY Position;",
        explanation: "Calculates the average salary for EACH position separately."
      },
      {
        title: "The HAVING Clause",
        content: "The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions. WHERE filters rows; HAVING filters groups.",
        example: "SELECT DeptId, AVG(Salary) FROM Employees GROUP BY DeptId HAVING AVG(Salary) > 85000;",
        explanation: "First groups by department and calculates avg salary. Then keeps ONLY the departments where that average is greater than 85,000."
      }
    ]
  },
  "6": {
    title: "Subqueries & Nested Queries",
    description: "Write queries inside queries for complex data retrieval",
    queryIds: [22, 24, 25, 26, 27],
    concepts: [
      {
        title: "What is a Subquery?",
        content: "A subquery is a query nested inside another query. It's used to return data that will be used in the main query as a condition to further restrict the data to be retrieved.",
        example: "SELECT FirstName FROM Employees WHERE DeptId = (SELECT DeptId FROM Departments WHERE Name = 'Engineering');",
        explanation: "The inner query finds the ID of 'Engineering'. The outer query then uses that ID to find employees."
      },
      {
        title: "Scalar Subqueries",
        content: "A scalar subquery returns a single value (one row, one column). It can be used anywhere a single value is valid.",
        example: "SELECT FirstName FROM Employees WHERE Salary > (SELECT AVG(Salary) FROM Employees);",
        explanation: "Finds employees who earn more than the global average salary."
      },
      {
        title: "The IN Operator with Subqueries",
        content: "If a subquery returns a list of values, you can use the IN operator.",
        example: "SELECT FirstName FROM Employees WHERE DeptId IN (SELECT DeptId FROM Departments WHERE City = 'New York');",
        explanation: "Finds employees whose department ID is in the list of IDs for departments in New York."
      },
      {
        title: "NOT IN",
        content: "NOT IN is the opposite. It selects rows where the value does NOT exist in the list.",
        example: "SELECT Name FROM Departments WHERE DeptId NOT IN (SELECT DISTINCT DeptId FROM Employees);",
        explanation: "Finds departments that have NO employees (their ID is not in the list of employee department IDs)."
      }
    ]
  },
  "7": {
    title: "Advanced Subqueries (ANY, ALL)",
    description: "Master comparison operators with subqueries",
    queryIds: [20, 21, 23],
    concepts: [
      {
        title: "The ANY Operator",
        content: "The ANY operator returns true if any of the subquery values meet the condition. It's like a flexible OR.",
        example: "SELECT FirstName FROM Employees WHERE Salary > ANY (SELECT Salary FROM Employees WHERE Position = 'Analyst');",
        explanation: "Finds employees who earn more than AT LEAST ONE analyst (i.e., more than the lowest-paid analyst)."
      },
      {
        title: "The ALL Operator",
        content: "The ALL operator returns true only if ALL of the subquery values meet the condition. It's stricter.",
        example: "SELECT FirstName FROM Employees WHERE Salary > ALL (SELECT Salary FROM Employees WHERE Position = 'Analyst');",
        explanation: "Finds employees who earn more than EVERY single analyst (i.e., more than the highest-paid analyst)."
      },
      {
        title: "Correlated Subqueries",
        content: "A correlated subquery uses values from the outer query. It executes once for each row processed by the outer query.",
        example: "SELECT FirstName, Salary FROM Employees E1 WHERE Salary > (SELECT AVG(Salary) FROM Employees E2 WHERE E2.DeptId = E1.DeptId);",
        explanation: "Finds employees who earn more than the average salary OF THEIR OWN DEPARTMENT."
      }
    ]
  },
  "8": {
    title: "Complex Queries & Optimization",
    description: "Put it all together with complex real-world queries",
    queryIds: [8, 19, 28, 32],
    concepts: [
      {
        title: "Self-Joins",
        content: "A self-join is a regular join, but the table is joined with itself. This is useful for comparing rows within the same table.",
        example: "SELECT A.FirstName AS Employee1, B.FirstName AS Employee2 FROM Employees A, Employees B WHERE A.DeptId = B.DeptId AND A.FirstName <> B.FirstName;",
        explanation: "Finds pairs of employees who are in the same department."
      },
      {
        title: "Multiple Joins",
        content: "You can join more than two tables. Just add more JOIN clauses.",
        example: "SELECT E.FirstName, D.Name, P.Title FROM Employees E JOIN Departments D ON E.DeptId = D.DeptId JOIN Projects P ON D.ProjectId = P.Id;",
        explanation: "Connects Employees to Departments, and Departments to Projects."
      },
      {
        title: "UNION Operator",
        content: "The UNION operator is used to combine the result-set of two or more SELECT statements.",
        example: "SELECT FirstName FROM Employees WHERE Salary > 90000 UNION SELECT FirstName FROM Employees WHERE Position = 'Manager';",
        explanation: "Combines high earners and managers into one list. Duplicates are removed by default."
      },
      {
        title: "Query Optimization Tips",
        content: "Writing efficient SQL is important. Use indexes, avoid SELECT * when not needed, and prefer joins over subqueries where possible.",
        example: "SELECT FirstName FROM Employees WHERE DeptId = 1;",
        explanation: "Simple, indexed lookups are faster than complex calculations or pattern matching."
      }
    ]
  }
}
