# serve-ipfs

`serve-ipfs` retrieves files from the IPFS network like `serve` does for local files.

Aditionally to fetching files from `IPFS_ROOT_PATH`, `serve-ipfs` works as a readonly IPFS gateway. See [API](#api).

## Configuration

Create a `.env` file at the root of the project and fill up with the proper variable values:

```bash
# IPFS_API=/ip4/127.0.0.1/tcp/5001
IPFS_API=

# IPFS_ROOT_PATH=/ipns/k51qzi5uqu5dh1haxzgpyf7a6ljzmagsriwhirxw3v8d9q8reh8bh7zr7c4wju
IPFS_ROOT_PATH=

# SSL_CERT=ssl/cert.pem [Optional]
SSL_CERT=

# SSL_KEY=ssl/key.pem [Optional]
SSL_KEY=
```

Add paths to SSL certificate and key files if you want to create a secured endpoint.

## How to start

Starting `serve-ipfs` is as simple as running `npm start`.

```bash
npm start
```

## API

By default, the `http` server listens on port `80` and `https` server - on port `443`.

### `GET /[ipfs_path]`

Identical to using an IPFS gateway.

Examples:

```zsh
# HOSTNAME=https://localhost

# GET /index.html (implicit)
curl $HOSTNAME/ipfs/QmdJNCZujcwZK4kt2tVvgshjYwrMj4JF7se729DiGHDxnj/ -v

# GET /index.html (explicit)
curl $HOSTNAME/ipfs/QmdJNCZujcwZK4kt2tVvgshjYwrMj4JF7se729DiGHDxnj/index.html -v

# GET /style.css
curl $HOSTNAME/ipfs/QmdJNCZujcwZK4kt2tVvgshjYwrMj4JF7se729DiGHDxnj/style.css -v

# same for IPNS names
curl $HOSTNAME/ipns/k51qzi5uqu5dk5qz77w2bjfy6vmas8nkl8alkchnfarl9gynls3aiog3n5c1u6/ -v
```

### `GET /*`

Resolves IPFS paths relative to the project root - `IPFS_ROOT_PATH` (read [Configuration](#configuration)).

Examples:

```zsh
# HOSTNAME=https://localhost

# GET /index.html
curl $HOSTNAME -v

# GET /static/css/index.css
curl $HOSTNAME/static/css/index.css -v

# GET /img/logo.svg
curl $HOSTNAME/img/logo.svg -v
```
