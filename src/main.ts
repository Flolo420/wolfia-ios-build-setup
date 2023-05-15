import {getInputs} from './inputs'
import {AppStoreConnectAPI} from './api'
import {fetchProfile} from './profile'
import {fetchCertificate} from './certificate'

async function run(): Promise<void> {
  const {
    appStoreConnectApiKey,
    appStoreConnectApiIssuer,
    appStoreConnectSecret,
    profileName
  } = getInputs()

  const api = new AppStoreConnectAPI({
    appStoreConnectApiKey,
    appStoreConnectApiIssuer,
    appStoreConnectSecret
  })

  const profile = await fetchProfile(api, profileName)
  if (!profile) return

  const certificateId = profile.relationships.certificates.data[0].id
  fetchCertificate(api, certificateId)
}

run()
