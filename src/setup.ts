import * as core from '@actions/core'
import {exec} from '@actions/exec'
import * as path from 'path'
import * as fs from 'fs'
import * as crypto from 'crypto'
import {Certificate, Profile} from './api'

const CERTIFICATE_PATH = path.join(
  process.env.RUNNER_TEMP!,
  'build_certificate.p12'
)

const PROFILE_PATH = path.join(
  process.env.RUNNER_TEMP!,
  'build_provisioning_profile.mobileprovision'
)

const KEYCHAIN_PATH = path.join(
  process.env.RUNNER_TEMP!,
  'app-signing.keychain-db'
)

const KEYCHAIN_PASSWORD = crypto.randomBytes(64).toString('hex')

const decode = (data: string): string =>
  Buffer.from(data, 'base64').toString('ascii')

export const setupBuildEnvironment = async (
  profile: Profile,
  certificate: Certificate,
  certificatePassword: string
): Promise<void> => {
  core.info(`Importing "${profile.attributes.name}" provisioning profile...`)
  const profileContents = decode(profile.attributes.profileContent)
  fs.writeFileSync(PROFILE_PATH, profileContents)

  core.info(`Importing "${certificate.attributes.name}" certificate...`)
  const certificateContent = decode(certificate.attributes.certificateContent)
  fs.writeFileSync(CERTIFICATE_PATH, certificateContent)

  core.info(`Creating a temporary keychain...`)
  await exec(
    `security import ${CERTIFICATE_PATH} -P "${certificatePassword}" -A -t cert -f pkcs12 -k ${KEYCHAIN_PATH}`
  )
  await exec(`security set-keychain-settings -lut 21600 ${KEYCHAIN_PATH}`)
  await exec(
    `security unlock-keychain -p "${KEYCHAIN_PASSWORD}" ${KEYCHAIN_PATH}`
  )

  core.info(`Importing certificate to keychain...`)
  await exec(
    `security import ${CERTIFICATE_PATH} -P "${certificatePassword}" -A -t cert -f pkcs12 -k ${KEYCHAIN_PATH}`
  )
  await exec(`security list-keychain -d user -s ${KEYCHAIN_PATH}`)

  core.info(`Applying provisioning profile...`)
  await exec(`mkdir -p ~/Library/MobileDevice/Provisioning\\ Profiles`)
  await exec(
    `cp ${PROFILE_PATH} ~/Library/MobileDevice/Provisioning\\ Profiles`
  )

  core.info(`Build environment setup completed.`)
}
