export function getProfilePicturePath(profilePicture, gender) {
    profilePicture = profilePicture?.replaceAll('"', '')
    if ( profilePicture !== undefined && profilePicture !== null && profilePicture.length !== 0 ) {
        if (profilePicture.includes("http")) {
            return profilePicture
        }
        else {
            return "/_nuxt/assets/wiglobe/images/users/profile-pictures/" + profilePicture
        }
    }
    else if (gender) {
        return "/_nuxt/assets/wiglobe/images/users/profile-pictures/" + gender.toLowerCase() + ".jpg"
    }
    else {
        return "/_nuxt/assets/wiglobe/images/users/profile-pictures/other.jpg"
    }
}

export function getBackgroundPicturePath(backgroundPicture) {
    backgroundPicture = backgroundPicture?.replaceAll('"', '')
    if (!backgroundPicture || backgroundPicture.length === 0) {
        return "/_nuxt/assets/wiglobe/images/users/background-pictures/default.jpg"
    }
    else return "/_nuxt/assets/wiglobe/images/users/background-pictures/" + backgroundPicture
}