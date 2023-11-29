
const Plan = require ('../Model/planSchema')


const getPlan = async (req, res) => {
  try {
    const plans = await Plan.find({ userID: req.params.userId });
    res.json(plans);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const createPlan = async(req,res)=>{
  try {
    const { name, userID, breakfast, lunch, dinner } = req.body;

    // Create a new plan object
    const newPlan = new Plan({
      name,
      userID,
      breakfast,
      lunch,
      dinner,
    });

    // Save the new plan to the database
    const savedPlan = await newPlan.save();

    res.status(201).json({ message: 'Plan created successfully', plan: savedPlan });
  } catch (error) {
    res.status(500).json({ message: 'Plan creation failed', error: error.message });
  }
}

const deletePlan = async(req,res)=>{
  const planId = req.params.id;

  try {
    // Find the plan by ID and delete it
    const deletedPlan = await Plan.findByIdAndDelete(planId);

    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete plan', error: error.message });
  }

}

module.exports={getPlan,createPlan,deletePlan}