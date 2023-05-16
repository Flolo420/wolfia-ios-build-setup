# Wolfia iOS Build Setup v0.0.5

A GitHub Action to setup the environment for building and signing iOS apps.

Note: this GitHub Action is not dependent on Wolfia, and can be used to build any iOS project.

For uploading built iOS apps (IPAs) to [Wolfia](https://wolfia.com), see the [`wolfia-deploy`](https://github.com/wolfia-app/wolfia-deploy) GitHub Action.

## How it works

This GitHub Action implements the steps documented for [deploying Xcode applications with GitHub Actions](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development).

Provided with App Store Connect API credentials and a certificate, this GitHub Action will:

- Fetch the relevant provisioning profile from App Store Connect matching the name you provided. The allows editing the provisioning profile in App Store Connect (eg: adding devices to an Ad Hoc profile) and refetching dynamically before it's needed, as opposed to hardcoding it and needing to update it after every change.
- Create a temporary Keychain and import the certificate into it to use for signing the app.
- Install the provisioning profile into the correct location to use for signing the app.

## Usage

See [action.yml](action.yml).

| Key                               | Value                                                                                                                                                                         | Suggested Type | Required |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------- |
| `app-store-connect-api-key-id`    | [App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api) Key ID.                                     | vars           | Yes      |
| `app-store-connect-api-issuer`    | [App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api) Issuer.                                     | vars           | Yes      |
| `app-store-connect-secret-base64` | [App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api) private key file contents (base64 encoded). | secret         | Yes      |
| `certificate-base64`              | The contents of the certificate associated with the provisioning profile used to sign the app (base64 encoded).                                                               | secret         | Yes      |
| `certificate-password`            | The password for the certificate associated with the provisioning profile used to sign the app.                                                                               | secret         | Yes      |
| `profile-name`                    | The name of the provisioning profile to fetch and use.                                                                                                                        | secret         | Yes      |

## Configuration

```yaml
steps:
  - name: Setup iOS build environment
    uses: wolfia-app/wolfia-ios-build-setup@v0.0.5
    with:
      app-store-connect-api-key-id: ${{ vars.APP_STORE_CONNECT_API_KEY_ID }}
      app-store-connect-api-issuer: ${{ vars.APP_STORE_CONNECT_API_ISSUER }}
      app-store-connect-secret-base64: ${{ secrets.APP_STORE_CONNECT_SECRET_BASE64 }}
      certificate-base64: ${{ secrets.CERTIFICATE_BASE64 }}
      certificate-password: ${{ secrets.CERTIFICATE_PASSWORD }}
      profile-name: 'Profile Name'
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
