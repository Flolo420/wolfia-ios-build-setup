# Wolfia iOS Build Setup v0.0.6

A GitHub Action to setup the environment for building and signing iOS apps.

Note: this GitHub Action is not dependent on Wolfia, and can be used to build any iOS project.

For uploading built iOS apps (IPAs) to [Wolfia](https://wolfia.com), see the [`wolfia-deploy`](https://github.com/wolfia-app/wolfia-deploy) GitHub Action.

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

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
