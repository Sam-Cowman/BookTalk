const logoutButtonHandler = async (event) => {
    event.preventDefault();
        console.log("logout button handler")
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
  };

document
    .querySelector('#logout-button')
    .addEventListener('click', logoutButtonHandler);
  