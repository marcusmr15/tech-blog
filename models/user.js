// Import necessary modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Define a User class that extends Sequelize's Model class
class User extends Model {
  // Method to check if the provided password matches the stored password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its attributes and options
User.init(
  {
    // Define the attributes (columns) of the User model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validate that the email format is correct
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Validate that the password length is between 8 and 100 characters
      },
    },
  },
  {
    // Define hooks to automatically hash the password before creating or updating a user
    hooks: {
      async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10); // Hash the password using bcrypt
        return newUser;
      },
      async beforeUpdate(updatedUser) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10); // Hash the password using bcrypt
        return updatedUser;
      },
    },
    // Set sequelize instance, options for table name and underscored naming, and model name
    sequelize,
    timestamps: false, // Disable timestamps (createdAt and updatedAt columns)
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use snake_case for column names
    modelName: 'user', // Model name in singular form
  }
);

// Export the User model for use in other parts of the application
module.exports = User;

