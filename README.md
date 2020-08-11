# Progetto cybersecurity

# Tool utilizzati per lo sviluppo e setup delle dipendenze

L'app è stata realizzata tramite [Node.js](https://nodejs.org/it/) (un framework Javascript) e [Express](https://expressjs.com/it/) (un framework per applicazioni web) e, per poter funzionare, è consigliato che venga eseguito su una distribuzione **GNU/Linux x64** in quanto il seguente **README** non consente la prova su altri sistemi.

## Installazione dipendenze per avviare la web app
Tutte le librerie necessarie all'avvio della web app sono nel file *package.json*. Per installarle, aprire il terminale e posizionarsi nella cartella del progetto. A questo punto, dopo essersi assicurato di aver installato npm correttamente, è necessario eseguire questo comando (potrebbero servire i privilegi di amministratore):

```bash
npm install 
```

## Utilizzo del database MongoDB
Avendo l’esigenza di realizzare un database contenente le informazioni di accesso degli utenti, abbiamo utilizzato il servizio Cloud fornito da **MongoDB**.
Tale scelta ci ha permesso di utilizzare un *database*, per definizione di *cloud*, ridondante e affidabile. All'interno del *database* le password sono state salvate criptate tramite [*bcrypt*](https://it.wikipedia.org/wiki/Bcrypt). Per poter effettuare la connessione al database, è necessario che all'interno della cartella *server* sia presente file *config.js* contenente la configurazione necessaria.

## Inizializzazione del file di configurazione

Prima di procedere con le fasi successive per l'avvio dell'applicazione, è necessario creare il file *config.js* all'interno della cartella *server*, usato per ottenere informazioni di rilievo quali l'URL del servizio MongoDB e la stringa usata per cifrare i cookie. Il file ha la seguente struttura:

```javascript
let config = {
    mongoURL: "<URL mongodb>",
    secret: "<secret>"
};

module.exports = config;
```

## Avvio della blockchain *Quorum*

Una componente chiave del nostro progetto è stato l'uso della blockchain [*Quorum*](https://www.goquorum.com/). Per poter utilizzare la web app, è necessario avviare la blockchain in locale. È possibile farlo facilmente tramite [quorum-wizard](https://github.com/jpmorganchase/quorum-wizard), realizzato direttamente da **J.P. Morgan**. Le dipendenze sono *Node.js*, *npm* e *openjdk-11-jre*. Nel caso del progetto è stata usata una blockchain composta da 4 nodi, generata tramite il tool.

## Inizializazione di IPFS

**IPFS** (InterPlanetary File System) è un protocollo e una rete peer-to-peer per salvare e condividere dati in un file system distribuito. Ogni file inserito su IPFS dispone di un certo hash e i file sono salvati permanentemente. La conoscenza dell'hash permette di recuperare il file da uno dei nodi che compongono IPFS. In virtù di queste pecularità, in fase di progettazione abbiamo deciso di integrarlo nella nostra web app.
Come prerequisito al caricamento delle immagini su IPFS e degli hash sulla blochchain *Quorum*, è necessario scaricare e lanciare nel proprio sistema il demone di IPFS. Per scaricare il demone, posizionarsi tramite il terminale in una cartella a scelta ed eseguire il seguente comando:
```bash
wget https://github.com/ipfs/go-ipfs/releases/download/v0.6.0/go-ipfs_v0.6.0_linux-amd64.tar.gz
```
A questo punto, è necessario decomporre il file tramite:   
```bash
tar -xvzf go-ipfs_v0.6.0_linux-amd64.tar.gz
```
ed eseguire quest'ultimo comando:
```bash
cd go-ipfs && sudo bash install.sh && ipfs init && ipfs daemon
```
Ulteriori informazioni sono disponibili al seguente [link](https://docs.ipfs.io/how-to/command-line-quick-start/#install-ipfs).

## Truffle

Per effettuare il *deploy* dei contratti sulla blockchain *Quorum* abbiamo utilizzato [*Truffle*](https://www.trufflesuite.com/). 

### Uso di Truffle

Per utilizzare *Truffle*, è necessario installarlo tramite il comando:
```bash
npm install -g truffle
```
Dopo averlo installato, è necessario posizionarsi nella cartella principale del progetto ed eseguire il comando:
```bash
truffle migrate
```
NOTA: per poter eseguire la migrazione è necessario aver settato correttamente il file di configurazione, così come il database MongoDB, in quanto gli indirizzi dei contratti verranno salvati in esso. Alternativamente, è possibile reperire l'indirizzo in cui il contratto è stato dispiegato utilizzando la console di truffle:
```bash
truffle console
```

# Funzionamento della web app

Una volta eseguito il setup dei tool richiesti dall'applicazione, descritti nella sezione precedente, è possibile utilizzare la web app con i relativi script di supporto.

## Caricamento delle immagini su IPFS e Quorum da parte del drone
Per caricare le immagini del drone su IPFS e i loro hash sulla blockchain *Quorum*, è necessario creare una cartella chiamata *images* all'interno della cartella *drone*, in cui devono essere inserite le immagini. A questo punto, dalla cartella *drone* è necessario eseguire:
```bash
node uploadImages.js
```
per effettuare il caricamento delle immagini all'interno della cartella su IPFS, e salvare i relativi hash all'interno della blockchain. Per l'inserimento delle immagini all'interno della blockchain viene fatto uso dell'account associato al secondo nodo, che rappresenta l'account del drone. 

## Creazione di un account associato al direttore dei lavori

Prima di poter avviare la web app è necessario innanzitutto creare uno o più account che possano essere utilizzati, da parte del direttori dei lavori, per il corretto funzionamento del servizio. Nella cartella di root del progetto è presente uno script, denominato `createUser.js`, che consente la creazione di un account per l'utente. Dati lo username e la password, lo script procederà all'inserimento dell'utente, con la password opportunamente criptata tramite la funzione di hash bcrypt, e inserirà, assieme all'utente, anche il rispettivo account della blockchain, corrispondente di default all'account associato al primo nodo della rete. Il comando per eseguire lo script è il seguente:
```
node createUser.js <username> <password>
```

## Avvio della web app

Una volta che sono state installate correttamente tutte le dipendenze della web app, e dopo aver caricato le immagini e creato gli account, da terminale bisogna trovarsi nella cartella **./server** ed eseguire il comando 
```
node index.js
```
per l'avvio del server. A questo punto, andando nel browser e digitando l'indirizzo 
```
http://localhost:3000/
```
è possibile utilizzare la web app.
