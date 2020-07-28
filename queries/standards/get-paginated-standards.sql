--
-- get-paginated-standards.sql
-- 
-- This statement retrieves standards from the database using offset & limit, formatting them as a row containing: 
-- 
-- identifier - a string identifying the standard
-- description - the description of the standard 
-- summary - a more descriptive explanation of the standard 
-- concept - the Computer Science concept the standard captures
-- conceptAbbr - and abbreviation of the concept
-- subconcept - the subconcept the standard captures 
-- subconeptAbbr - the abbreviation of the subconcept 
-- gradeLevel - the grade level the standard is for 
-- gradeLevelAbbr - the abbreviation of the grade level 
-- practices - the practices the standard embodies
-- 
-- Using parameters: 
--   LIMIT - the number of standards to retrieve
--   OFFSET - where in the list of standards to start returning rows.

SELECT 
  standards.identifier AS identifier,
  standards.description AS description,
  standards.summary AS summary,
  concepts.name AS concept,
  concepts.abbr AS conceptAbbr,
  subconcepts.name AS subconcept,
  subconcepts.abbr AS subconceptAbbr,
  grade_levels.name AS gradeLevel,
  grade_levels.abbr AS gradeLevelAbbr,
  (  SELECT group_concat(practices.id || '. ' || practices.name, ', ') 
     FROM practices 
     INNER JOIN standards_practices ON practices.id = standards_practices.practice_id 
   WHERE standards_practices.standard_id = standards.id
  ) AS practices
FROM standards 
INNER JOIN concepts on standards.concept_id = concepts.id
INNER JOIN subconcepts on standards.subconcept_id = subconcepts.id 
INNER JOIN grade_levels on standards.grade_level_id = grade_levels.id
LIMIT ? OFFSET ?;