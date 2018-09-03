```
USE DATABASENAME
GO

-- https://stackoverflow.com/questions/10652746/tree-of-all-dependencies-in-a-sql-server-database

--select type, type_desc from sys.objects group by type, type_desc
--select * from sys.all_objects
--select referenced_class, referenced_class_desc from sys.sql_expression_dependencies group by referenced_class, referenced_class_desc

--select * from sys.sql_expression_dependencies where referencing_id=1187391895
--union
--select * from sys.sql_expression_dependencies where referenced_id=1187391895


;with ObjectHierarchy ( Base_Object_Id , Base_Cchema_Id , Base_Object_Name , Base_Object_Type, object_id , Schema_Id , Name , Type_Desc , Level , Obj_Path) 
as 
( select  so.object_id as Base_Object_Id 
        , so.schema_id as Base_Cchema_Id 
        , so.name as Base_Object_Name 
        , so.type_desc as Base_Object_Type
        , so.object_id as object_id 
        , so.schema_id as Schema_Id 
        , so.name 
        , so.type_desc 
        , 0 as Level 
        , convert ( nvarchar ( 1000 ) , N'/' + so.name ) as Obj_Path 
    from sys.objects so 
        left join sys.sql_expression_dependencies ed on ed.referenced_id = so.object_id 
        left join sys.objects rso on rso.object_id = ed.referencing_id 
    where rso.type is null 
        and so.type in ( 'P', 'V', 'IF', 'FN', 'TF' ) 
    union all 
    select   cp.Base_Object_Id as Base_Object_Id 
        , cp.Base_Cchema_Id 
        , cp.Base_Object_Name 
        , cp.Base_Object_Type
        , so.object_id as object_id 
        , so.schema_id as ID_Schema 
        , so.name 
        , so.type_desc 
        , Level + 1 as Level 
        , convert ( nvarchar ( 1000 ) , cp.Obj_Path + N'/' + so.name ) as Obj_Path 
    from sys.objects so 
        inner join sys.sql_expression_dependencies ed on ed.referenced_id = so.object_id 
        inner join sys.objects rso on rso.object_id = ed.referencing_id 
        inner join ObjectHierarchy as cp on rso.object_id = cp.object_id and rso.object_id <> so.object_id 
    where so.type in ( 'P', 'V', 'IF', 'FN', 'TF', 'U') 
        and ( rso.type is null or rso.type in ( 'P', 'V', 'IF', 'FN', 'TF', 'U' ) ) 
        and cp.Obj_Path not like '%/' + so.name + '/%'    -- prevent cycles n hierarcy
)
select   Base_Object_Name 
    , Base_Object_Type
    , REPLICATE ( '    ' , Level ) + Name as Indented_Name 
    , SCHEMA_NAME ( Schema_Id ) + '.' + Name as object_id 
    , Type_Desc as Object_Type 
    , Level 
    , Obj_Path 
into ##ObjectHierarchy
from ObjectHierarchy as p 
order by Obj_Path

---- there are some row not unique
--select * from ##ObjectHierarchy order by Obj_Path
--select count(*), Obj_Path from ##ObjectHierarchy group by Obj_Path having count(*)>1

-- create ##ObjectHierarchyResult without duplicated row
select Base_Object_Name, Base_Object_Type, Indented_Name, object_id, Object_Type, Level, Obj_Path into ##ObjectHierarchyResult
from ##ObjectHierarchy group by Base_Object_Name, Base_Object_Type, Indented_Name, object_id, Object_Type, Level, Obj_Path

select * from ##ObjectHierarchyResult
--where Base_Object_Name like 'tablename'
order by Obj_Path


select * into ##SpResult
from ##ObjectHierarchyResult
where Base_Object_Name in (
	select distinct(Base_Object_Name) from ##ObjectHierarchyResult
	where object_id in (
			-- tablenames
			'tablename1'
		)
		and Base_Object_Type='SQL_STORED_PROCEDURE'
)
order by Obj_Path

select * into ##ViewResult
from ##ObjectHierarchyResult
where Base_Object_Name in (
	select distinct(Base_Object_Name) from ##ObjectHierarchyResult
	where object_id in (
			-- tablenames
			'tablename1'
		)
		and Base_Object_Type='VIEW'
)
order by Obj_Path

--TODO: dependency tree miss some row while it already appered at indented_name previous
select * from ##SpResult order by Obj_Path

select * from ##ViewResult order by Obj_Path


--drop table ##ViewResult
--drop table ##SpResult
--drop table ##ObjectHierarchyResult
--drop table ##ObjectHierarchy
```
