--
-- get-standards-count.sql
-- 
-- This query returns a single row that contains the # of standards stored.
-- 
-- totalCount - the # of standards in the database.
-- 

SELECT 
  COUNT(*) AS totalCount
FROM standards;