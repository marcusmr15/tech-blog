// Import necessary modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define a Post class that extends Sequelize's Model class
class Post extends Model {}

// Initialize the Post model with its attributes and options
Post.init(
  {
    // Define the attributes (columns) of the Post model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1], // Validate that the content length is at least 1 character
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // Reference the User model
        key: "id", // Reference the id column in the User model
      },
    },
  },
  {
    // Set sequelize instance, options for table name and underscored naming, and model name
    sequelize,
    timestamps: true, // Enable timestamps (createdAt and updatedAt columns)
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use snake_case for column names
    modelName: "post", // Model name in singular form
  }
);

// Export the Post model for use in other parts of the application
module.exports = Post;
