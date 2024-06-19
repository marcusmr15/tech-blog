// Import necessary modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define a Comment class that extends Sequelize's Model class
class Comment extends Model {}

// Initialize the Comment model with its attributes and options
Comment.init(
  {
    // Define the attributes (columns) of the Comment model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING(2000), // Example: Set maximum length to 1000 characters
      allowNull: false,
      validate: {
        len: [1], // Validate that the comment_text length is at least 1 character
      },
    },    
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // Reference the User model
        key: "id", // Reference the id column in the User model
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post", // Reference the Post model
        key: "id", // Reference the id column in the Post model
      },
    },    
  },
  {
    // Set sequelize instance, options for table name and underscored naming, and model name
    sequelize,
    timestamps: true, // Enable timestamps (createdAt and updatedAt columns)
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use snake_case for column names
    modelName: "comment", // Model name in singular form
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
