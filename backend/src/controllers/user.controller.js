import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        //basic validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        //check for existing user
        const existing_emailUser = await User.findOne({ email: email.toLowerCase() });
        if (existing_emailUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existing_usernameUser = await User.findOne({ username: username.toLowerCase() });
        if (existing_usernameUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        //create new user 
        const user = await User.create({
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password,
          loggedIn: false,
        });  
        res.status(201).json({
            message: 'User registered successfully',
            user:
            {
            id: user._id, email: user.email, username: user.username   
                
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
};

const loginUser = async (req,res) => {
    // Login user logic here
    try {
      //checking if user exits
      const { email, password } = req.body;

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return res.status(400).json({ message: 'User not found' });

      //compare password
       const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Wrong Password' })

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
}

const logOutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update user loggedIn status
        user.loggedIn = false;
        await user.save();

        res.status(200).json({ message: 'User logged out successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error.message });
        
    }

};
export { registerUser, loginUser, logOutUser };