
     export function formatDateTime(date){
      // Format for date and time
      const formattedDateTime = new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Set to false for 24-hour format
      })
      return formattedDateTime;
     };