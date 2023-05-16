import * as core from '@actions/core'
import {exec} from '@actions/exec'
import * as path from 'path'
import * as fs from 'fs'
import * as crypto from 'crypto'
import {Profile} from './api'

const CERTIFICATE_PATH = path.join(
  process.env.RUNNER_TEMP!,
  'build_certificate.p12'
)

const PROFILE_NAME = 'build_provisioning_profile.mobileprovision'

const PROFILE_PATH = path.join(process.env.RUNNER_TEMP!, PROFILE_NAME)

const KEYCHAIN_PATH = path.join(
  process.env.RUNNER_TEMP!,
  'app-signing.keychain-db'
)

const KEYCHAIN_PASSWORD = crypto.randomBytes(64).toString('hex')

const PROFILES_DIRECTORY = path.join(
  process.env.HOME!,
  'Library/MobileDevice/Provisioning Profiles'
)

export const setupBuildEnvironment = async (
  profile: Profile,
  certificate: string,
  certificatePassword: string
): Promise<void> => {
  core.info(`Importing "${profile.attributes.name}" provisioning profile...`)
  const profileContents = Buffer.from(
    profile.attributes.profileContent,
    'base64'
  ).toString('binary')
  fs.writeFileSync(PROFILE_PATH, profileContents, {encoding: 'binary'})

  core.info(`Importing certificate...`)
  fs.writeFileSync(CERTIFICATE_PATH, certificate, {encoding: 'binary'})

  core.info(`Creating a temporary keychain...`)
  await exec(
    `security create-keychain -p "${KEYCHAIN_PASSWORD}" ${KEYCHAIN_PATH}`
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
  fs.mkdirSync(PROFILES_DIRECTORY, {recursive: true})
  fs.copyFileSync(PROFILE_PATH, path.join(PROFILES_DIRECTORY, PROFILE_NAME))

  core.info(`Build environment setup completed.`)
}
