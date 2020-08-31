# Evervault Experiment: `enctool`

Uses evervault cages to manage the encryption/decryption of a master key for
client-side encryption.

Proof of concept for using client-side encryption without having to store a
backup key on one's own servers. The json file output by the `keygen` command
could be safely uploaded to servers as only the cage has permission to decrypt.

## Usage

Set up evervault cages

```sh
> yarn global add @evervault/cli
> ev login
> cd cages/evervault-experiment-decrypt-key
> ev cage:deploy
```

Run the tool to encrypt and decrypt a file

```sh
> yarn
> yarn link

> export EVERVAULT_API_KEY='xxx'
> enctool keygen > key.json
> echo 'hello world!' > message.txt
> enctool encrypt key.json message.txt > cipher.txt
> enctool decrypt key.json cipher.txt
hello world!
```
