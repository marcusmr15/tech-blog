// Utility module to format date and time information
module.exports = {
    format_date: (date) => {
      // Create a new Date object from the provided date
      const d = new Date(date);
      
      // Extract and format the date parts to MM/DD/YYYY
      const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      
      // Extract and format the hours and minutes to HH:mm, ensuring two digits
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      
      // Return the formatted date and time string
      return `${formattedDate} at ${formattedTime}`;
    },
  };
  