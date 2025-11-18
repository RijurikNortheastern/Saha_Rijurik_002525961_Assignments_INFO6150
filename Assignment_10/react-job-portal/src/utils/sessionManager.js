const sessionManager = {
    setSession: (token, user) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
  
    getSession: () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      return {
        token,
        user: user ? JSON.parse(user) : null
      };
    },
  
    clearSession: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  
    isSessionValid: () => {
      return !!localStorage.getItem('token');
    }
  };
  
  export default sessionManager;