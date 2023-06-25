document.addEventListener('alpine:init', () => {
  Alpine.data('dropdown', () => ({ 
    open: false, 
    edit: 'readonly',
    message: '',
    errors: false,
    form: {
      login: '',
      email: '',
      password: '',
    },
    async getUserData(userId) {
      try {
        const response = await fetch(`http://localhost:3001/api/dashboart/user/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          const { login, email } = userData.userData;
          this.form.login = login;
          this.form.email = email;
        }
      } catch (e) {
        console.error('Не могу выполнить запрос', e);
      }
    },
    async setUserData (userId) {
      if (this.form.email && this.form.login && this.form.password) {
        const data = {
          id: userId,
          login: this.form.login,
          email: this.form.email,
          password: this.form.password,
        };
        try {
          const response = await fetch(`http://localhost:3001/api/dashboart/user/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(data)
          });
          const json = await response.json();
          this.message = json.message;
          this.errors = false;
          this.resetForm();
        } catch (e) {
          console.error('Не могу обноваить', e);
        }
      } else {
        this.errors = true;
        this.message = 'Все поля должны быть заполнены';
      }
    },
    resetForm() {
      this.form.login = '';
      this.form.email = '';
      this.password = '';
  },
  }));
});