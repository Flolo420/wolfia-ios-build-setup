import * as core from '@actions/core'
import * as fs from 'fs'
import {exec} from '@actions/exec'
import {KEYCHAIN_PATH, PROFILE_PATH} from './setup'

export const cleanup = async (): Promise<void> => {
  core.info('Cleaning up...')

  core.info('Deleting Keychain...')
  await exec(`security delete-keychain ${KEYCHAIN_PATH}`)

  core.info('Removing provisioning profile...')
  fs.unlinkSync(PROFILE_PATH)

  core.info('Cleanup completed.')
}
