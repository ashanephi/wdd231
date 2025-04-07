function displayVisitMessage() {
    const lastVisitKey = 'lastVisitTimestamp';
    const messageElement = document.getElementById('visit-message-sidebar');
  
    if (!messageElement) {
      console.error('Visit message container not found!');
      return; 
    }
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;

    const lastVisit = localStorage.getItem(lastVisitKey);
  
    let message = '';
  
    if (!lastVisit) {
      message = "Welcome! Let us know if you have any questions.";
      
    } else {
      const lastVisitTimestamp = parseInt(lastVisit, 10);
      const timeDifference = now - lastVisitTimestamp;
      const daysDifference = Math.floor(timeDifference / msPerDay);
  
      if (daysDifference < 1) {
        message = "Back so soon! Awesome!";
      } else if (daysDifference === 1) {
        message = "You last visited 1 day ago.";
      } else {
        message = `You last visited ${daysDifference} days ago.`;
      }
    }
  
    messageElement.textContent = message;
    localStorage.setItem(lastVisitKey, now.toString());

    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  }
document.addEventListener('DOMContentLoaded', displayVisitMessage);