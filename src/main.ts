import {getInputs} from './inputs'
import {AppStoreConnectAPI} from './api'
import {fetchProfile} from './profile'
import {setupBuildEnvironment} from './setup'
import {isPost} from './state'
import {cleanup} from './cleanup'

async function run(): Promise<void> {
  if (isPost) {
    cleanup()
    return
  }

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
