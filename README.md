# mutexserver
Simple http service for setting up mutex service. For example set mutex for parallel GitOps repository commits.

## Server

To start mutex server you need to install Node.js and simply run `node server.js`. You can customize mutex lifetime using `TTL` and server port using `PORT` environment variable. You can also use docker image for running mutex server.

```sh
docker pull themisir/mutexserver
docker run -p 5000:80 themisir/mutexserver
```

| URI                 | Description                                  |
|---------------------|----------------------------------------------|
| **POST** `http://localhost:5000/<key>`   | Waits for _key_ unlock then locks the mutex. |
| **DELETE** `http://localhost:5000/<key>` | Unlocks mutex.                               |

## cURL

Using curl commands you can easily lock/unlock mutexes.

```sh
# Will lock the mutex, if mutex is already locked the command will wait until mutex becomes unlocked
curl -XPOST http://localhost:5000/key

# Unlocks mutex
curl -XDELETE http://localhost:5000/key
```

## Github Actions

You can use GitHub actions jobs to queue parallel jobs.

```yaml
- name: Create mutex
  uses: themisir/mutexserver@master
  with:
    server: http://example.com
    key: my-mutex-key
```