import * as core from '@actions/core'
import jwt, {SignOptions} from 'jsonwebtoken'

const getNowSeconds = (): number => Math.round(new Date().getTime() / 1000)

const EXPIRATION_TIME = 10 * 60 // 10 minutes

export interface TokenOptions {
  appStoreConnectApiKey: string
  appStoreConnectApiIssuer: string
  appStoreConnectSecret: string
}

export const getToken = ({
  appStoreConnectApiKey,
  appStoreConnectApiIssuer,
  appStoreConnectSecret
}: TokenOptions): string => {
  core.info(`Generating JWT...`)
  const exp = getNowSeconds() + EXPIRATION_TIME

  const payload = {
    iss: appStoreConnectApiIssuer,
    exp,
    aud: 'appstoreconnect-v1'
  }

  const options: SignOptions = {
    algorithm: 'ES256',
    header: {
      typ: 'JWT',
      alg: 'ES256',
      kid: appStoreConnectApiKey
    }
  }

  return jwt.sign(payload, appStoreConnectSecret, options)
}
