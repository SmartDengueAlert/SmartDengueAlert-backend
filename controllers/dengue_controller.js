//Importing fetchDengueData function from dengueService.js 
const { fetchDengueData } = require('../services/dengueService');

//received the calling from dengueRoutes.js to call getDengueData function
const getDengueData = async (req, res) => {
    const location = req.query.location;
    
    //Checking the Location if it is valid or not
    if (!location) {
        return res.status(400).json({ error: 'dengue_controller.js : Location is required' });
    }
     try {
        //calling for fetchDengueData function in dengueService.js and get the dengueData from dengueService.js
        const dengueData = await fetchDengueData(location);
        console.log(`////////dengue_controller.js : Dengue data fetched successfully for ${location} for 14 days from dengueService.js ////////`);
        console.log(dengueData);
        console.log('/////////////End of dengueData/////////////');
        
        //send a json file for postman
        res.json({ message: `dengue_controller.js : Prediction for ${location}`, data: dengueData });
        return dengueData;

        //Error Handling
    } catch (error) {
        console.error('dengue_controller.js : Failed to fetch dengue data', error);          
        res.status(500).json({ error: 'dengue_controller.js: Failed to fetch dengue data' });          
    }
};
//Exporting getDengueData
 module.exports = { 
    getDengueData
 };
