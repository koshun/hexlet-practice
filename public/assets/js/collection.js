document.addEventListener('alpine:init', () => {
  Alpine.data('collection', () => ({
    collections: [],
    protocol: window.location.protocol,
    host: window.location.host,
    form: {
      name: ''
    },
   async getCollections() {
      try {
        url = `http://localhost:3001/api/dashboart/collections`;
        const data = await fetch(url);
        const { collections } = await data.json();
        // return collections;
        this.collections.push(...collections);
        
      } catch (e) {
        console.error('Не могу получить данные по категориям');
      }
    },
    async deleteCollection(id) {
      url = `http://localhost:3001/api/dashboart/collections/${id}/delete`;
      try {
        const response = await fetch(url, {
          method: 'DELETE',
        });
        const res = await response.json();
        console.log(res);
        // window.location.reload(true)
        window.location.replace(window.location.href);
      } catch (e) {
        console.error('Не могу удалить коллекцию', e);
      }
    },
    async updateCollection(id, name) {
      const { href } = new URL(`api/dashboart/collections/${id}/update`, `${this.protocol}//${this.host}`);
      try {
        const response = await fetch(href, {
          method: 'PUT',
          body: JSON.stringify({ name, id }),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const res = await response.json();
        console.log(res);
      } catch (e) {
        console.error('Невозможно обновить', e);
      }
    }
  }));
});