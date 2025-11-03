import { auth } from './firebase'

export async function getCurrentUser() {
  return auth.currentUser
}

export async function isUserAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}

export async function isUserEmailVerified() {
  const user = await getCurrentUser()
  return user?.emailVerified || false
}

export function requireAuth() {
  const user = auth.currentUser

  if (!user) {
    throw new Error('User not authenticated')
  }

  if (!user.emailVerified) {
    throw new Error('Email not verified')
  }

  return user
}
