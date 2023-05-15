import {getInputs} from './inputs'
import {AppStoreConnectAPI} from './api'
import {fetchProfile} from './profile'
import {setupBuildEnvironment} from './setup'

async function run(): Promise<void> {
  const {
    appStoreConnectApiKey,
    appStoreConnectApiIssuer,
    appStoreConnectSecret,
    certificate,
    certificatePassword,
    profileName
  } = getInputs()

  const api = new AppStoreConnectAPI({
    appStoreConnectApiKey,
    appStoreConnectApiIssuer,
    appStoreConnectSecret
  })

  const profile = await fetchProfile(api, profileName)
  if (!profile) return

  await setupBuildEnvironment(profile, certificate, certificatePassword)
}

run()
