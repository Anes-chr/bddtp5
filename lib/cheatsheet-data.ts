export interface CheatsheetCategory {
  id: string
  title: string
  icon: string
  color: string
  items: CheatsheetItem[]
}

export interface CheatsheetItem {
  title: string
  syntax: string
  example: string
  description: string
}

export const cheatsheetData: CheatsheetCategory[] = [
  {
    id: "basic",
    title: "Basic Queries",
    icon: "📋",
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        title: "SELECT All Columns",
        syntax: "SELECT * FROM table_name;",
        example: "SELECT * FROM Employees;",
        description: "Retrieve all columns from a table"
      },
      {
        title: "SELECT Specific Columns",
        syntax: "SELECT col1, col2 FROM table_name;",
        example: "SELECT FirstName, LastName FROM Employees;",
        description: "Retrieve only specified columns"
      },
      {
        title: "SELECT DISTINCT",
        syntax: "SELECT DISTINCT column FROM table_name;",
        example: "SELECT DISTINCT Department FROM Employees;",
        description: "Return only unique values"
      },
      {
        title: "Column Aliases",
        syntax: "SELECT column AS alias FROM table_name;",
        example: "SELECT FirstName AS 'Employee Name' FROM Employees;",
        description: "Rename columns in the result set"
      }
    ]
  },
  {
    id: "filtering",
    title: "Filtering Data",
    icon: "🔍",
    color: "from-green-500 to-emerald-500",
    items: [
      {
        title: "WHERE Clause",
        syntax: "SELECT * FROM table WHERE condition;",
        example: "SELECT * FROM Employees WHERE Position = 'Manager';",
        description: "Filter rows based on a condition"
      },
      {
        title: "AND / OR",
        syntax: "WHERE condition1 AND/OR condition2;",
        example: "SELECT * FROM Employees WHERE Position = 'Developer' AND Salary > 50000;",
        description: "Combine multiple conditions"
      },
      {
        title: "BETWEEN",
        syntax: "WHERE column BETWEEN val1 AND val2;",
        example: "SELECT * FROM Products WHERE Price BETWEEN 10 AND 100;",
        description: "Filter within a range (inclusive)"
      },
      {
        title: "IN",
        syntax: "WHERE column IN (val1, val2, ...);",
        example: "SELECT * FROM Customers WHERE Country IN ('USA', 'UK', 'Canada');",
        description: "Match any value in a list"
      },
      {
        title: "LIKE Pattern",
        syntax: "WHERE column LIKE 'pattern';",
        example: "SELECT * FROM Employees WHERE LastName LIKE 'Sm%';",
        description: "Pattern matching (% = any chars, _ = single char)"
      },
      {
        title: "IS NULL / IS NOT NULL",
        syntax: "WHERE column IS NULL;",
        example: "SELECT * FROM Orders WHERE ShippedDate IS NULL;",
        description: "Check for NULL values"
      }
    ]
  },
  {
    id: "sorting",
    title: "Sorting & Limiting",
    icon: "📊",
    color: "from-purple-500 to-pink-500",
    items: [
      {
        title: "ORDER BY",
        syntax: "SELECT * FROM table ORDER BY column;",
        example: "SELECT * FROM Products ORDER BY Price DESC;",
        description: "Sort results (ASC default, DESC for descending)"
      },
      {
        title: "Multiple Column Sort",
        syntax: "ORDER BY col1 ASC, col2 DESC;",
        example: "SELECT * FROM Employees ORDER BY Department ASC, Salary DESC;",
        description: "Sort by multiple columns"
      },
      {
        title: "LIMIT (MySQL/PostgreSQL)",
        syntax: "SELECT * FROM table LIMIT n;",
        example: "SELECT * FROM Products ORDER BY Price DESC LIMIT 5;",
        description: "Limit the number of results"
      },
      {
        title: "TOP (SQL Server)",
        syntax: "SELECT TOP n * FROM table;",
        example: "SELECT TOP 5 * FROM Products ORDER BY Price DESC;",
        description: "SQL Server syntax for limiting results"
      },
      {
        title: "OFFSET",
        syntax: "LIMIT n OFFSET m;",
        example: "SELECT * FROM Products LIMIT 10 OFFSET 20;",
        description: "Skip m rows, return next n rows (pagination)"
      }
    ]
  },
  {
    id: "aggregation",
    title: "Aggregate Functions",
    icon: "📈",
    color: "from-orange-500 to-amber-500",
    items: [
      {
        title: "COUNT",
        syntax: "SELECT COUNT(*) FROM table;",
        example: "SELECT COUNT(*) FROM Employees WHERE Position = 'Developer';",
        description: "Count number of rows"
      },
      {
        title: "SUM",
        syntax: "SELECT SUM(column) FROM table;",
        example: "SELECT SUM(Quantity) FROM OrderDetails WHERE OrderId = 101;",
        description: "Sum of numeric column values"
      },
      {
        title: "AVG",
        syntax: "SELECT AVG(column) FROM table;",
        example: "SELECT AVG(Salary) FROM Employees;",
        description: "Average of numeric column values"
      },
      {
        title: "MIN / MAX",
        syntax: "SELECT MIN(column), MAX(column) FROM table;",
        example: "SELECT MIN(Price), MAX(Price) FROM Products;",
        description: "Find minimum or maximum value"
      },
      {
        title: "GROUP BY",
        syntax: "SELECT col, AGG(col2) FROM table GROUP BY col;",
        example: "SELECT Department, COUNT(*) FROM Employees GROUP BY Department;",
        description: "Group rows for aggregate calculations"
      },
      {
        title: "HAVING",
        syntax: "GROUP BY col HAVING condition;",
        example: "SELECT DeptId, COUNT(*) FROM Employees GROUP BY DeptId HAVING COUNT(*) > 5;",
        description: "Filter groups (WHERE for aggregates)"
      }
    ]
  },
  {
    id: "joins",
    title: "JOIN Operations",
    icon: "🔗",
    color: "from-red-500 to-rose-500",
    items: [
      {
        title: "INNER JOIN",
        syntax: "SELECT * FROM t1 INNER JOIN t2 ON t1.col = t2.col;",
        example: "SELECT E.Name, D.DeptName FROM Employees E INNER JOIN Departments D ON E.DeptId = D.Id;",
        description: "Return matching rows from both tables"
      },
      {
        title: "LEFT JOIN",
        syntax: "SELECT * FROM t1 LEFT JOIN t2 ON t1.col = t2.col;",
        example: "SELECT D.Name, E.Name FROM Departments D LEFT JOIN Employees E ON D.Id = E.DeptId;",
        description: "Return all rows from left table, matching from right"
      },
      {
        title: "RIGHT JOIN",
        syntax: "SELECT * FROM t1 RIGHT JOIN t2 ON t1.col = t2.col;",
        example: "SELECT E.Name, D.Name FROM Employees E RIGHT JOIN Departments D ON E.DeptId = D.Id;",
        description: "Return all rows from right table, matching from left"
      },
      {
        title: "FULL OUTER JOIN",
        syntax: "SELECT * FROM t1 FULL OUTER JOIN t2 ON t1.col = t2.col;",
        example: "SELECT * FROM Employees E FULL OUTER JOIN Departments D ON E.DeptId = D.Id;",
        description: "Return all rows when there's a match in either table"
      },
      {
        title: "Self Join",
        syntax: "SELECT * FROM table t1, table t2 WHERE condition;",
        example: "SELECT E1.Name, E2.Name FROM Employees E1, Employees E2 WHERE E1.DeptId = E2.DeptId;",
        description: "Join a table with itself"
      }
    ]
  },
  {
    id: "subqueries",
    title: "Subqueries",
    icon: "🎯",
    color: "from-indigo-500 to-violet-500",
    items: [
      {
        title: "Subquery in WHERE",
        syntax: "WHERE col = (SELECT col FROM table WHERE ...);",
        example: "SELECT * FROM Employees WHERE Salary > (SELECT AVG(Salary) FROM Employees);",
        description: "Use query result as a condition value"
      },
      {
        title: "Subquery with IN",
        syntax: "WHERE col IN (SELECT col FROM table);",
        example: "SELECT * FROM Employees WHERE DeptId IN (SELECT Id FROM Departments WHERE City = 'NYC');",
        description: "Check if value exists in subquery result"
      },
      {
        title: "EXISTS",
        syntax: "WHERE EXISTS (SELECT * FROM table WHERE ...);",
        example: "SELECT * FROM Departments D WHERE EXISTS (SELECT 1 FROM Employees E WHERE E.DeptId = D.Id);",
        description: "Check if subquery returns any rows"
      },
      {
        title: "NOT EXISTS",
        syntax: "WHERE NOT EXISTS (SELECT * FROM table WHERE ...);",
        example: "SELECT * FROM Departments D WHERE NOT EXISTS (SELECT 1 FROM Employees E WHERE E.DeptId = D.Id);",
        description: "Check if subquery returns no rows"
      },
      {
        title: "Correlated Subquery",
        syntax: "WHERE col op (SELECT ... WHERE outer.col = inner.col);",
        example: "SELECT * FROM Employees E WHERE Salary > (SELECT AVG(Salary) FROM Employees WHERE DeptId = E.DeptId);",
        description: "Subquery that references outer query"
      }
    ]
  },
  {
    id: "set",
    title: "Set Operations",
    icon: "🔄",
    color: "from-teal-500 to-cyan-500",
    items: [
      {
        title: "UNION",
        syntax: "SELECT ... UNION SELECT ...;",
        example: "SELECT Name FROM Employees WHERE Salary > 80000 UNION SELECT Name FROM Managers;",
        description: "Combine results, remove duplicates"
      },
      {
        title: "UNION ALL",
        syntax: "SELECT ... UNION ALL SELECT ...;",
        example: "SELECT Name FROM DeptA UNION ALL SELECT Name FROM DeptB;",
        description: "Combine results, keep duplicates"
      },
      {
        title: "INTERSECT",
        syntax: "SELECT ... INTERSECT SELECT ...;",
        example: "SELECT ProductId FROM Orders2023 INTERSECT SELECT ProductId FROM Orders2024;",
        description: "Return rows common to both queries"
      },
      {
        title: "EXCEPT / MINUS",
        syntax: "SELECT ... EXCEPT SELECT ...;",
        example: "SELECT Id FROM AllCustomers EXCEPT SELECT DISTINCT CustomerId FROM Orders;",
        description: "Return rows in first query but not in second"
      }
    ]
  },
  {
    id: "modification",
    title: "Data Modification",
    icon: "✏️",
    color: "from-yellow-500 to-amber-500",
    items: [
      {
        title: "INSERT Single Row",
        syntax: "INSERT INTO table (cols) VALUES (vals);",
        example: "INSERT INTO Employees (Id, Name, Position) VALUES (100, 'John Doe', 'Developer');",
        description: "Add a single row to a table"
      },
      {
        title: "INSERT Multiple Rows",
        syntax: "INSERT INTO table (cols) VALUES (vals1), (vals2);",
        example: "INSERT INTO Products VALUES (1, 'Laptop', 999), (2, 'Phone', 699);",
        description: "Add multiple rows at once"
      },
      {
        title: "UPDATE",
        syntax: "UPDATE table SET col = val WHERE condition;",
        example: "UPDATE Employees SET Salary = Salary * 1.1 WHERE Position = 'Developer';",
        description: "Modify existing data"
      },
      {
        title: "DELETE",
        syntax: "DELETE FROM table WHERE condition;",
        example: "DELETE FROM Orders WHERE OrderDate < '2023-01-01';",
        description: "Remove rows from a table"
      },
      {
        title: "TRUNCATE",
        syntax: "TRUNCATE TABLE table_name;",
        example: "TRUNCATE TABLE TempResults;",
        description: "Remove all rows quickly (cannot be rolled back)"
      }
    ]
  }
]
