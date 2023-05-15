import * as core from '@actions/core'
import axios from 'axios'
import {TokenOptions, getToken} from './jwt'

const APP_STORE_CONNECT_API_BASE = 'https://api.appstoreconnect.apple.com'

interface APIResponse<Result> {
  data: Result
}

// eslint-disable-next-line no-shadow
export enum ProfileState {
  ACTIVE = 'ACTIVE',
  INVALID = 'INVALID'
}

export interface Certificate {
  attributes: {
    certificateContent: string
    name: string
  }
}

export interface Profile {
  id: string
  attributes: {
    name: string
    profileState: ProfileState
    profileContent: string
  }
  relationships: {
    certificates: {data: {id: string}[]}
  }
}

export class AppStoreConnectAPI {
  token: string

  constructor(tokenOptions: TokenOptions) {
    this.token = getToken(tokenOptions)
  }

  private async get<Result>(resource: string): Promise<Result> {
    const response = await axios.get<Result>(
      `${APP_STORE_CONNECT_API_BASE}${resource}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    )

    return response.data
  }

  async getProfiles(): Promise<APIResponse<Profile[]>> {
    core.info(`Fetching profiles...`)
    return this.get('/v1/profiles?include=certificates')
  }
}
