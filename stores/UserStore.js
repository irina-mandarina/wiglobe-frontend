import {
  login,
  signup,
  getUserDetails,
  authenticateWithGoogle,
  editBio,
  deleteAccount,
  editProfilePicture, editBackgroundPicture, editBirthdate, editGender, editResidence
} from "~~/js/userRequests"
import { cleanLocalStorage, getLocalStorageUsername } from "~~/js/localStorageUtil"
import { defineStore } from "pinia"
import axios from "axios";

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
      residence: null,
      profilePicture: null,
      backgroundPicture: null
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
        this.logInResponseCode = error?.response?.status
      }
    },
    
    async authenticationWithGoogle(token, userData) {
      try {
        const response = await authenticateWithGoogle(token, userData)
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
      this.profilePicture = data.profilePicture
      this.backgroundPicture = data.backgroundPicture
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
    },

    async changeBiography(bio) {
      try {
        const response = await editBio(bio)
        this.biography = response.data.biography
      }
      catch (error) {
        console.log(error)
      }
    },

    async changeProfilePicture(newProfilePicture) {
      const response = await axios.post('/api/users/profile-picture/upload',
          newProfilePicture,
          {
            headers: {
              'Content-Type': 'application/octet-stream'
            }
          }
      )
          .then(async response => {
            await editProfilePicture(response.data)
            this.profilePicture = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    async changeBackgroundPicture(newBackgroundPicture) {
      const response = await axios.post('/api/users/background-picture/upload',
          newBackgroundPicture,
          {
            headers: {
              'Content-Type': 'application/octet-stream'
            }
          }
      )
          .then(async response => {
            await editBackgroundPicture(response.data)
            this.backgroundPicture = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    async changeBirthdate(newBirthdate) {
      try {
        const response = await editBirthdate(newBirthdate)
        this.birthdate = response.data.birthdate
      }
      catch (error) {
        console.warn(error)
      }
    },

    async changeGender(newGender) {
      try {
        const response = await editGender(newGender)
        this.gender = response.data.gender
      }
      catch (error) {
        console.warn(error)

      }
    },

    async changeResidence(newResidence) {
      try {
        const response = await editResidence(newResidence)
        this.residence = response.data.residence
      }
      catch (error) {
        console.warn(error)
      }
    }
    
  }
})