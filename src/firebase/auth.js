import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./config"

// Sign up with email and password
export const signUpWithEmail = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile
    await updateProfile(user, {
      displayName: userData.name,
    })

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "",
      createdAt: new Date().toISOString(),
      role: "customer",
    })

    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))
    const userData = userDoc.exists() ? userDoc.data() : null

    return {
      success: true,
      user: {
        id: user.uid,
        name: user.displayName || userData?.name,
        email: user.email,
        avatar: user.photoURL,
        ...userData,
      },
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        createdAt: new Date().toISOString(),
        role: "customer",
      })
    }

    return {
      success: true,
      user: {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      },
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
