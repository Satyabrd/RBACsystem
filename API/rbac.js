import { Router } from "express";
const dataModel = require("./model/schema")
const router = new Router();

router.get("/:role",async (req,res)=>{
    try {
        const role = req.params.role
        const query = { [`access_control.${role}`]: { $exists: true }};   
        // Execute a query to find documents with the specified name
        const result = await dataModel.find(query);
    
        console.log('Query result is::', result);
        response = []
        if(result.length > 0){
            for(let i=0;i<result.length;i++){
                tempDict = {}
                //Taken title as default value for every role
                tempDict['title'] = result[i].title
                roleData = tempDict["access_control"][role]
                for(let j=0;j<roleData;i++){
                    tempDict[roleData[j]] = result[i][roleData[j]]
                }
                response.push(tempDict)
            }
        }
        
        res.status(200).json(response);
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post("/postData",async (request,response)=>{
    // Create a new document using the Mongoose model
    const payload = req.body;
    const doc = new dataModel(payload);

    try {
        // Save the document to the database
        const savedDocument = await doc.save();
        console.log('Document saved successfully:', savedDocument);
        res.status(201).json({ message: 'Payload saved successfully', savedDocument });
    } catch (err) {
        console.error('Error saving document:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/deleteRecord/:title",async (req,res)=>{
    
    try {
        const title = req.params.title
        const query = { [title]: title };
        const deletedRecord = await dataModel.deleteOne(query);
    
        if (deletedRecord) {
          console.log('Record deleted successfully:', deletedRecord);
          res.status(200).json({ message: 'Record deleted successfully', deletedRecord });
        } else {
          console.log('Record not found.');
          res.status(404).json({ error: 'Record not found' });
        }
      } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.patch('/updateByField/:col/:colVal', async (req, res) => {
    try {
      const fieldName = req.params.col;
      const fieldValue = req.params.colVal;
      const query = { [fieldName]: fieldValue };
      const update = req.body;
      const result = await dataModel.updateOne(query, { $set: update });
  
      if (result.nModified > 0) {
        res.status(200).json({ message: 'Record updated successfully' });
      } else {
        res.status(404).json({ error: 'Record not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;