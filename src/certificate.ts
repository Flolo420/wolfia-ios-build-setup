import * as core from '@actions/core'
import {AppStoreConnectAPI, Certificate} from './api'

export const fetchCertificate = async (
  api: AppStoreConnectAPI,
  certificateId: string
): Promise<Certificate | undefined> => {
  const {data: certificate} = await api.getCertificate(certificateId)
  core.info(`Fetched associated "${certificate.attributes.name}" certificate.`)

  return certificate
}
