document.addEventListener('alpine:init', () => {
  Alpine.data('dashboard', () => ({
    async deleteItem(itemId) {
      console.log(itemId);
      const response = await fetch(`http://localhost:3001/api/dashboart/accaunt/delete/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const res = await response.json();
      console.log(res);
      window.location.reload();
      window.location.replace(window.location.href);
    },
  }));
});