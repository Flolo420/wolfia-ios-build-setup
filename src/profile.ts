import * as core from '@actions/core'
import {AppStoreConnectAPI, Profile, ProfileState} from './api'

export const fetchProfile = async (
  api: AppStoreConnectAPI,
  profileName: string
): Promise<Profile | undefined> => {
  const profiles = await api.getProfiles()
  const profile = profiles.data.find(
    prof => prof.attributes.name === profileName
  )

  if (!profile) {
    core.setFailed(
      `Profile "${profileName}" not found. Please confirm the profile name is correct and exists.`
    )
    return
  }

  if (profile.attributes.profileState !== ProfileState.ACTIVE) {
    core.setFailed(
      `Profile "${profileName}" is ${profile.attributes.profileState}. Please confirm the profile is active and valid.`
    )
    return
  }
  core.info(`Profile "${profileName}" found.`)

  return profile
}
