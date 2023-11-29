const User = require('../Model/userSchema')
  
const registerUser = async (req, res) => {

    console.log(req.body)
  const { username, email, password } = req.body;
  

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user (using the User model)
    const newUser = new User({ 
      username:username, 
      email:email, 
      password:password 
    });

    // Save the new user to the 'users' collection
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Login successful - Return some user data or token for authentication
    const userId = user._id
    const username = user.username
    return res.status(200).json({ message: 'Login successful', userId,username });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
  
  module.exports={loginUser,registerUser}