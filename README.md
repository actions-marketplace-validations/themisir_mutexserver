# mutexserver
Simple http service for setting up mutex service. For example set mutex for parallel GitOps repository commits.

## Docs

| Url                 | Description                                  |
|---------------------|----------------------------------------------|
| **POST** `/<key>`   | Waits for _key_ unlock then locks the mutex. |
| **DELETE** `/<key>` | Unlocks mutex.                               |

You can use `curl` command to simply lock and unlock mutex. You can also use the server on your CI workflow.
