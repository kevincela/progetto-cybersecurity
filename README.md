# Progetto cybersecurity
# Tool utilizzati per lo sviluppo

L'app è stata realizzata tramite [Node.js](https://nodejs.org/it/) (un framework Javascript) e [Express](https://expressjs.com/it/) (un framework per applicazioni web) e, per poter funzionare, è necessario che venga eseguito su una distribuzione **GNU/Linux x64** in quanto il seguente **README** non consente la prova su altri sistemi.

## Creazione del database MongoDB
Avendo l’esigenza di realizzare un database contenente le informazioni di accesso degli utenti, abbiamo utilizzato il servizio Cloud fornito da **MongoDB**.
Tale scelta ci ha permesso di utilizzare un *database*, per definizione di *cloud*, ridondante e affidabile. All'interno del *database* le password sono state salvate criptate tramite [*bcrypt*](https://it.wikipedia.org/wiki/Bcrypt). Per poter effettuare la connessione al database, è necessario che all'interno della cartella *server* sia presente file *config.js* contenente la configurazione necessaria.

## Avvio della blockchain *Quorum*

Una componente chiave del nostro progetto è stato l'uso della blockchain [*Quorum*](https://www.goquorum.com/). Per poter utilizzare la web app, è necessario avviare la blockchain in locale. È possibile farlo facilmente tramite [quorum-wizard](https://github.com/jpmorganchase/quorum-wizard), realizzato direttamente da **J.P. Morgan**. Le dipendenze sono *Node.js*, *npm* e *openjdk-11-jre*.

## Implementazione di IPFS

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

## Caricamento delle immagini su IPFS e Quorum da parte del drone
Per caricare le immagini del drone su IPFS e i loro hash sulla blockchain *Quorum*, è necessario creare una cartella chiamata *images* all'interno della cartella *drone*. A questo punto, dalla cartella *drone* è necessario eseguire:
```bash
nodejs uploadImages
```

# Funzionamento della web app

# Installazione dipendenze per avviare la web app
Tutte le librerie necessarie all'avvio della web app sono nel *package.json*. Per installarle, aprire il terminale e posizionarsi nella cartella del progetto. A questo punto, dopo essersi assicurato di aver installato npm correttamente, è necessario eseguire questo comando (potrebbero servire i privilegi di amministratore):

```bash
npm install 
```

## Avvio della web app

Una volta che sono state installate correttamente tutte le dipendenze della web app, da terminale bisogna trovarsi nella cartella **./server** ed eseguire il comando 
```
nodejs index
```
A questo punto, andando nel browser e digitando l'indirizzo 
```
http://localhost:3000/
```
è possibile utilizzare la web app.
