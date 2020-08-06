# Progetto cybersecurity
# Tool utilizzati per lo sviluppo

L'app è stata realizzata tramite [Node.js](https://nodejs.org/it/) (un framework Javascript) e [Express](https://expressjs.com/it/) (un framework per applicazioni web) e, per poter funzionare, è necessario che venga eseguito su una distribuzione **GNU/Linux**.

## Creazione del database MongoDB
Avendo l’esigenza di realizzare un database contenente le informazioni di accesso degli utenti, abbiamo utilizzato il servizio Cloud fornito da **MongoDB**.
Tale scelta ci ha permesso di utilizzare un *database*, per definizione di *cloud*, ridondante e affidabile. All'interno del *database* le password sono state salvate criptate tramite *bcrypt*.

## Implementazione di IPFS
**IPFS** (InterPlanetary File System) è un protocollo e una rete peer-to-peer per salvare e condividere dati in un file system distribuito. Ogni file inserito su IPFS dispone di un certo hash e i file sono salvati permanentemente. La conoscenza dell'hash permette di recuperare il file da uno dei nodi che compongono IPFS.

## Caricamento delle immagini su IPFS e Quorum da parte del drone
Per caricare le immagini del drone su IPFS e su *Quorum*, è possibile farlo creando la cartella images all'interno della cartella drone. A questo punto, dalla cartella drone eseguire (necessita del demone IPFS):
```bash
nodejs uploadImages
```

# Funzionamento della web app

# Installazione dipendenze per avviare la web app
Tutte le librerie necessarie all'avvio della web app sono nel *package.json*. Per installarle, aprire il terminale e posizionarsi nella cartella del progetto. A questo punto, dopo essersi assicurato di aver installato npm correttamente, è necessario eseguire questo comando:

```bash
npm install 
```
Inoltre, per la realizzazione di questo progetto è stata la blockchain [Quorum](https://www.goquorum.com/). Per avviare la blockchain in locale, abbiamo usato [quorum-wizard](https://github.com/jpmorganchase/quorum-wizard), realizzato direttamente da **J.P. Morgan**.

È necessario anche aver installato il demone di IPFS.


## Avvio della web app

Una volta che sono state installate correttamente tutte le dipendenze, da terminale bisogna trovarsi nella cartella **./server** ed eseguire il comando 
```
nodejs index
```
A questo punto, andando nel browser e digitando l'indirizzo 
```
http://localhost:3000/
```
è possibile utilizzare la web app.
