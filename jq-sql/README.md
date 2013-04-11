jq-sql
======

This project enables users/developers to be able to utilize sql styled queries on JSON objects.

There are a couple of restrictions as of yet:

1. The JSON Objects have to be single leveled. In short, the library can only function upon an array of similar structured objects. The objects themselves cannot have anything other than string based values in them.
2. The where clause only support the equality operator.
3. It can only work upon a single JSON object; joining JSON objects like SQL tables is not yet present
4. Subquerying is not supported.

Explanation of the code
=======================
The query that is passed to the library is first parsed via a regular expression. The regular expression is pretty simple and it can only identify the SELECT and the WHERE clauses.
Once the parsing is done, first the where clause is evaluated and the data set is reduced. Following that the select statement is evaluated and the data is recast as another JSON object.
This JSON object is finally returned by the library.
