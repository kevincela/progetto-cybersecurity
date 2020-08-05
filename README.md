# Progetto cybersecurity
# Tool utilizzati per lo sviluppo

L'app è stata realizzata tramite [Node.js](https://nodejs.org/it/) (un framework Javascript) e [Express](https://expressjs.com/it/) (un framework per applicazioni web).

## Creazione del database MongoDB
Avendo l’esigenza di realizzare un database contenente le informazioni degli utenti abbiamo utilizzato il servizio Cloud fornito da **MongoDB**.
Tale scelta ci ha permesso di utilizzare un *database*, per definizione di *cloud*, ridondante e affidabile.

## Implementazione di IPFS
**IPFS** (InterPlanetary File System) è un protocollo e una rete peer-to-peer per salvare e condividere dati in un file system distribuito. Ogni file inserito su IPFS dispone di un certo hash e i file sono salvati permanentemente. La conoscenza dell'hash permette di recuperare il file da uno dei nodi che compongono IPFS.

## Caricamento delle immagini su IPFS e Quorum da parte del drone
Per caricare le immagini del drone su IPFS e su *Quorum*, è possibile farlo creando la cartella images all'interno della cartella drone. A questo punto, dalla cartella drone eseguire:
```bash
nodejs uploadImages
```

# Funzionamento della web app

# Guida all'avvio della web app
Tutte le librerie utilizzate sono nel *package.json*. Per installarle, aprire il terminale e posizionarsi nella cartella del progetto. A questo punto, dopo essersi assicurato di aver installato npm correttamente, è necessario eseguire questo comando:

```bash
npm install 
```

Una volta che sono state installate correttamente tutte le dipendenze, da terminale bisogna trovarsi nella cartella **./server** ed eseguire il comando 
```
nodejs index
```
A questo punto, andando nel browser e digitando l'indirizzo 
```
http://localhost:3000/
```
è possibile utilizzare la web app.

## Inizializzazione blockchain Quorum

Per la realizzazione di questo progetto è stata la blockchain [Quorum](https://www.goquorum.com/). Per avviare la blockchain, abbiamo usato [quorum-wizard](https://github.com/jpmorganchase/quorum-wizard), realizzato direttamente da J.P. Morgan e permette di avviare una rete Quorum locale facilmente.
