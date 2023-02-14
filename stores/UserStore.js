import { login, logout, signup, getUserDetails } from "~~/js/userRequests"
import { cleanLocalStorage, getLocalStorageUsername } from "~~/js/localStorageUtil"
import { defineStore } from "pinia"

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      loggedUsername: null,
      logInResponseCode: null,
      signUpResponse: null,
      user: null,
      username: null,
      firstName: null,
      lastName: null,
      birthdate: null,
      biography: null,
      email: null,
      gender: null,
      profilePrivacy: null,
      registrationTimestamp: null,
      residence: null
    }
  },

  actions: {
    async signUp(user) {
        try {
            const response = await signup(user)
            this.setUserDetails(response.data.userDetails)
            localStorage.setItem('username', this.user.username)
            this.signUpResponse = 201
        }
        catch (error) {
          this.signUpResponse = error.response.data
        }
    },

    async logIn(user) {
      try {
        const response = await login(user)
        if (response.status === 200) {
          this.setUserDetails(response.data.userDetails)
          localStorage.setItem('username', this.username)
          localStorage.setItem('jwt', response.data.token)
          this.logInResponseCode = 200
        }
      }
      catch (error) {
        this.logInResponseCode = error.response.status
      }
    },

    async logOut() {
      cleanLocalStorage()
      navigateTo('/login')
      // try {
      //   const response = await logout(this.user.username) 
      //   console.log(response)
      // }
      // catch (error) {
      //   console.log(error)
      // }
    },
    
    async getUserDetails(other) {
      if (other === null || other === undefined || other === '') {
        other = this.loggedUsername
      }
      try {
        const response = await getUserDetails(other)
        this.setUserDetails(response.data)
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

    setUserDetails(data) {
      this.username = data.username
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.birthdate = data.birthdate
      this.biography = data.biography
      this.email = data.email
      this.gender = data.gender
      this.profilePrivacy = data.profilePrivacy
      this.registrationTimestamp = data.registrationTimestamp
      this.residence = data.residence
    },

    async init() {
      if (getLocalStorageUsername() !== null && this.username === null) {
        this.loggedUsername = getLocalStorageUsername()
        await this.getUserDetails()
        if (this.username === null) {
          navigateTo('/login')
        }
        else {
          this.logInResponseCode = 200
        }
      }
      else if (getLocalStorageUsername() === null) (
        navigateTo('/login')
      )
    }
    
  }
})