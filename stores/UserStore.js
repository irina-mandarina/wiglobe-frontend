import { login, logout, signup } from "~~/js/userRequests"
import { defineStore } from "pinia"

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      loggedUsername: null,
      logInResponseCode: null,
      signUpResponseCode: null,
      user: null,
      password: null
    }
  },

  actions: {
    getLocalStorageUsername() {
      if (this.loggedUsername === null || this.loggedUsername === undefined) {
        if (typeof window !== 'undefined') {
          this.loggedUsername = localStorage.getItem('username')
        }
      }
      return this.loggedUsername
    },
    // DELETE THIS ASAP
    getLocalStoragePassword() {
        if (typeof window !== 'undefined') {
          this.password = localStorage.getItem('password')
        }
        console.log(this.password)
      return this.password
    },
    async signUp(user) {
        try {
            const response = await signup(user)
            this.user = response.data
            localStorage.setItem('username', this.user.username)
            this.signUpResponseCode = 201
        }
        catch (error) {
          this.signUpResponseCode = error.response.status
          console.log(error)
          console.log(error.response.headers)
        }
    },

    async logIn(user) {
      try {
        const response = await login(user)
        if (response.status === 200) {
          this.user = response.data
          localStorage.setItem('username', this.user.username)
          localStorage.setItem('password', user.password)
          this.logInResponseCode = 200
        }
      }
      catch (error) {
        this.logInResponseCode = error.response.status
      }
    },

    async logOut() {
      try {
        const response = await logout(this.user.username) 
        console.log(response)
        this.user = null
      }
      catch (error) {
        console.log(error)
      }
    },
    
    async getUserDetails(other) {
      if (other === null) {
        other = this.loggedUsername
      }
      try {
        const response = await getUserDetails(other) 
        console.log(response)
        this.user = response.data
      }
      catch (error) {
        console.log(error)
      }
    },
    
    async deleteAccount() {
      try {
        const response = await deleteAccount(this.user.username) 
        console.log(response)
        this.user = null
      }
      catch (error) {
        console.log(error)
      }
    },
    
    async editBio() {
      try {
        const response = await editBio(this.user.username, bio) 
        console.log(response)
      }
      catch (error) {
        console.log(error)
      }
    },
    
  }
})