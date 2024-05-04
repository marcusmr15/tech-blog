// Import all models
const User = require('./user');
const Post = require('./blogPost');
const Comment = require('./comment');

// Define the relationships between the models
User.hasMany(Post, {
    foreignKey: "user_id", // Set up the foreign key relationship
  });
  
  Post.belongsTo(User, {
    foreignKey: "user_id", // Set up the foreign key relationship
  });
  
  Comment.belongsTo(User, {
    foreignKey: "user_id", // Set up the foreign key relationship
  });
  
  Comment.belongsTo(Post, {
    foreignKey: "post_id", // Set up the foreign key relationship
  });
  
  Post.hasMany(Comment, {
    foreignKey: "post_id", // Set up the foreign key relationship
  });
  
  User.hasMany(Comment, {
    foreignKey: "user_id", // Set up the foreign key relationship
  });
  // Export the models
  module.exports = { User, Post, Comment };