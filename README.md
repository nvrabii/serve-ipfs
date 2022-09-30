# serve-ipfs

Static file serving from IPFS

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

Add paths to SSL certificate and key files if you want to serve your files for `https` additionally to `http`.

## Commands

```bash
npm start
```
