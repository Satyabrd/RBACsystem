# RBACsystem
This is a system to handle multiple RBAC calls
-> Need to connect to local mongodb and post data first and then we can do operations, it's like an empty system, we have to feed data to do CRUD operations 

Creat/Post API:
------------------
Endpoint: localhost:3000/api/rbac/postData
It'll post whatever payload we send, it won't check for duplicacy.
-> Here body needs to be passed in payload

Get API:
--------------
Endpoint: localhost:3000/api/rbac/admin
It will return all the data whatever admin want to see
-> here admin is a variable, for other roles we have to pass roles 

Patch API:
--------------
Endpoint: localhost:3000/api/rbac/updateByField/:col/:colVal
col : fieldname 
colVal : fieldVal
-> This needs to be improved more, as currently it updates only 1 record

Delete API:
-------------------
Endpoint: localhost:3000/api/rbac/deleteRecord/:title
Here title is treated as the field to delete.
-> This deletes one record currently, we have to handle condition for duplicacy.