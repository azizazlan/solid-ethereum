import { createSignal, Switch, Match } from 'solid-js';
import { Wallet, HDNodeWallet, ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import { Alert, Button, TextField } from '@suid/material';
import './App.css';

function App() {
  const [step, setStep] = createSignal(1);
  const [password, setPassword] = createSignal('');
  const [phrase, setPhrase] = createSignal('');
  const [wallet, setWallet] = createSignal<Wallet | HDNodeWallet | null>(null);

  const provider = new ethers.JsonRpcProvider('http://192.168.100.28/rpc');

  const createWallet = () => {
    const mnemonic = Wallet.createRandom().mnemonic;
    setPhrase(mnemonic.phrase);
    const wallet = HDNodeWallet.fromMnemonic(mnemonic!);
    wallet.connect(provider);
    setWallet(wallet);
    encryptAndStorePrivateKey();
    setStep(2);
  };

  const restoreWallet = () => {
    const usrPassword = password();
    console.log(usrPassword);
    const encPrivateKey = localStorage.getItem('encryptedPrivateKey');
    console.log(encPrivateKey);
    let privateKey = CryptoJS.AES.decrypt(encPrivateKey, usrPassword);
    privateKey = privateKey.toString(CryptoJS.enc.Utf8);
    console.log(privateKey);
    let encPhrase = localStorage.getItem('encryptedPhrase');
    encPhrase = encPhrase?.toString(CryptoJS.enc.Utf8);
    let tempPhrase = CryptoJS.AES.decrypt(encPhrase, usrPassword);
    tempPhrase = tempPhrase.toString(CryptoJS.enc.Utf8);
    console.log(tempPhrase);
    setPhrase(tempPhrase);
    const tempWallet = HDNodeWallet.fromPhrase(tempPhrase);
    setWallet(tempWallet);
    setStep(2);
  };

  const encryptAndStorePrivateKey = () => {
    const encryptedPrivateKey = CryptoJS.AES.encrypt(
      wallet()!.privateKey,
      password()
    ).toString();

    const encryptedPhrase = CryptoJS.AES.encrypt(
      phrase(),
      password()
    ).toString();

    localStorage.setItem('encryptedPrivateKey', encryptedPrivateKey);
    localStorage.setItem('encryptedPhrase', encryptedPhrase);
  };

  return (
    <div class="container">
      <h1>Ethereum wallet</h1>
      <Switch>
        <Match when={step() === 1}>
          <wallet>
            <TextField
              class="password"
              placeholder="Enter password"
              value={password()}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={createWallet}>
              create
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={restoreWallet}
              sx={{ marginTop: 1 }}
            >
              restore
            </Button>
          </wallet>
        </Match>
        <Match when={step() === 2}>
          <code>{wallet().address}</code>
          <p>Save the following prhase in a secure location</p>
          <Alert icon={false} severity="info">
            {phrase()}
          </Alert>
          <Button
            sx={{ marginTop: 3 }}
            color="secondary"
            variant="contained"
            onClick={() => setStep(3)}
          >
            Done
          </Button>
        </Match>
      </Switch>
      <div class="spacer" />
    </div>
  );
}

export default App;
