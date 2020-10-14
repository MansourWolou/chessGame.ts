# Online Chess

Ce projet consiste à déployer une application web de jeu d'échecs jouable en multijoueur.

## Objectifs

La fin du semestre approche, il est temps de montrer tout ce que vous avez appris et de proposer au monde entier votre première application web (webapp) !
L'objectif de ce mini-projet est d'intégrer et adapter tout le travail réalisé lors des TP et TD précédents, afin de réaliser une application de jeu d'échecs jouable (et observable) en multijoueur réseau.

## Préparation

1. Créez une divergence (en anglais, *fork*) du projet sur votre compte GitLab: [Cliquez ici pour créer le Fork](https://gitlab.univ-nantes.fr/naomod/software-development-course/onlineChess/forks/new) (Éventuellement, Gitlab vous demandera de vous connecter).

2. Créez et configurez une copie locale du projet. Ouvrez le **Terminal** et exécutez les commandes suivantes:

```bash
git clone https://gitlab.univ-nantes.fr/${USER}/onlineChess.git
cd onlineChess
npm install
```

3. Regardez la structure du projet. Le projet est organisé en différents dossiers:

```txt
    |-- onlineChess
      |-- client
         |-- index.html
         |-- script.js
         |-- style.css
      |-- src
         |-- chessboard.ts
         |-- main.ts
         |-- move-validation.ts
         |-- movements.ts
         |-- piece.ts
         |-- position.ts
      |-- spec
         |-- move-validation-spec.ts
         |-- movements-spec.ts
         |-- support
            |-- jasmine.json
      |-- node_modules
      |-- package.json
      |-- tsconfig.json
```

- `client` contient le code Javascript qui sera exécuté sur le browser. Vous ne devez pas modifier le contenu de ce dossier.
  - `index.html` : page principale de l'application
  - `style.css` : mise en forme de l'application
  - `script.js` : algorithme(s) JavaScript côté client (affichage de l'échiquier)
- `src` contient le code source du serveur.
  - `main.ts` : programme principal de création et gestion du serveur web
- `spec` contient les tests unitaires du serveur.
- `node_modules` contient les modules Node.js utilisés dans le projet. Vous ne devez pas modifier le contenu de ce dossier.
- `package.json` est le fichier de configuration de **npm**. Vous n'avez pas besoin de le modifier.
- `tsconfig.json` est le fichier de configuration de **TypeScript**. Vous n'avez pas besoin de le modifier.

## Test et lancement

- Le projet utilise l'outil de construction et de gestion de modules **npm**.
- Pour lancer tous les tests unitaires du projet avec Jasmine, exécutez: `npm test`.
- Pour lancer le serveur en mode développement, exécutez: `npm run dev`.
- Pour accéder à l'application, ouvrez l'URL suivante: [http://localhost:8080](http://localhost:8080).
- Pour accéder au contenu JSON de l'échiquier en cours, utilisez l'URL suivante:  [http://localhost:8080/status.js](http://localhost:8080/status.js).

## Manuel d'utilisation

Pour déplacer les pièces sur l'échiquier, indiquez dans le formulaire en bas de page la pièce à déplacer et sa destination.
Utilisez la notation par coordonnées, qui inclut la place à partir de laquelle la pièce se déplace, ainsi que sa destination.
Par exemple:

| Coup | Coordonnées | Description |
| --- | --- | --- |
| 1. | E2-E4 E7-E5 | Pion blanc en E2 se déplace à E4. Pion noir en E7 se déplace à E5.
| 2. | G1-F3 B8-C6 | Cheval blanc en G1 se déplace à F3. Cheval noir en B8 se déplace à C6.

## Fonctionnement de l'application

Le programme principal du serveur (`main.ts`) est chargé de démarrer un mini-serveur web capable de recevoir les différentes requêtes provenant des navigateurs connectés à l'application :

- GET "`/`" : distribue le fichier `views/index.ejs`;
- GET "`/status.js`" : génère et distribue l'échiquier en cours au format JSON.
- POST "`/`" : reçoit et traite un coup à jouer;


Ces trois traitements correspondent aux différents appels à `app.get()` et `app.post()` du programme principal.
  
## Chronologie d'une partie

1. Lorsqu'un utilisateur se connecte à l'application (adresse **"/"**), le serveur distribue alors la page html principale composée d'un échiquier vierge et d'une zone de saisie permettant à l'utilisateur de remplir le coup à jouer.

2. Le navigateur internet récupère immédiatement les informations de la partie en cours présentes à l'adresse `/status.js` et remplit l'échiquier à l'aide d'un script situé dans le fichier `script.js`. Ces deux scripts se trouvent dans le dossier `client`.

3. Un clic sur le bouton "Envoyer" effectue une requête de type **POST** au à l'adresse **"/"** du serveur, contenant les informations du champs de texte associé.
Le serveur traite alors la requête afin de jouer le coup demandé.

4. La page internet du joueur est alors rechargée automatiquement, affichant ainsi le nouvel état de la partie.

5. etc...

## Travail à réaliser

### Validation des mouvements

La version actuelle permet le déplacement libre des pièces, sans respecter les règles des échecs. 
Pour l'instant, seuls les déplacements des pions sont validés.
Vous devez mettre en oeuvre la validations des déplacements des autres pièces: le Roi, la Dame, le Cavalier, le Fou et la Tour. 

Le traitement des déplacements se fait de la façon suivante:

1. Lorsqu'une requête **POST** arrive, le serveur extrait la valeur du champ envoyé et appelle la fonction `processMove()` du module `movements`.

2. La fonction `processMove()` appelle une autre fonction, `parseMoveString()`, qui transforme une chaîne de caractères en un déplacement (`interface Move`) entre 2 positions (`interface Position`).

3. La fonction `processMove()` appelle ensuite la fonction `isMovePossible()`, qui fait appel à différentes fonctions de validation spécifiques aux pièces de l'échiquier (une par type de pièce). Le module `move-validation` contient toutes les fonctions de validation de déplacements.

4. Par exemple, lorsqu'il s'agit d'un Pion blanc, la fonction `isMovePossible()` appelle la fonction `whitePawnMove()`, qui retourne `true` si le déplacement est possible ou `false` si ce n'est pas le cas.

5. Si le mouvement est possible, c'est à dire la fonction `isMovePossible()` retourne `true`, la fonction  `processMove()` appelle la fonction `performMove(), qui effectue le déplacement.


Vous devez donc parcourir le module `move-validation` et implémenter les fonctions de validation contenant le commentaire "`// #TODO:`". 


### Tests unitaires

Pour vérifier que les fonctions du module `move-validation` fonctionnent correctement, vous devez écrire des tests unitaires, qui vont vérifier que les fonctions acceptent les mouvements possibles et n'acceptent pas les mouvements impossibles.
Les mouvements sont possibles (ou impossibles) en accord avec les [règles des échecs](https://fr.wikipedia.org/wiki/Échecs). 
Comme ces règles sont complexes, vous serez mené à écrire plusieurs tests unitaires pour vérifier les mouvements possibles et impossibles d'une même pièce.

Les signatures des fonctions du module `move-validation` suivent la même convention :

```ts
function colorPieceMove(board: Chessboard, move: Move): boolean
```

Le paramètre `board` contient l'échiquier de la partie en cours et `move` contient le déplacement demandé par le joueur à travers le browser.
Le paramètre `move` contient 2 coordonnées de type `Position`, représentant le début et la fin du déplacement.
Les coordonnées indiquent **toujours** des cases à l'intérieur de l'échiquier, c'est à dire, une colonne entre `A` et `H` et une ligne entre `1` et `8`.
Donc, il n'y a pas besoin de vérifier si un déplacement conduit une pièce à l'extérieur de l'échiquier.

Les tests unitaires des fonctions `blackPawnMove()` et `whitePawnMove()` ont déjà été implémentés, vous les trouverez dans le fichier `./spec/move-validation-spec.ts`.
**Vous devez compléter tous les squelettes de tests unitaires fournis à l'intérieur de ce fichier !** 

Vous devez procéder par itérations successives, n'essayez pas d'implémenter les fonctions d'un seul trait. Observez le cycle de développement suivant:

1. Implémentez une fonctionnalité  simple.
2. Écrivez le ou les tests unitaires qui vérifient cette fonctionnalité.
3. Exécutez les tests pour vérifier que la fonctionnalité marche correctement et la non-régression. 
4. Recommencez avec la fonctionnalité suivante.

Par exemple, lorsque vous allez implémenter les fonctions qui valident le mouvement des tours (`blackRookMove()` et `whiteRookMove()`) ,  vous pouvez subdiviser leurs comportements  en différentes fonctionnalités: 

- Validation des mouvements horizontaux, sans se préoccuper des autres pièces.
- Validation des mouvements verticaux, toujours sans se préoccuper des autres pièces.
- Invalidation d'des mouvements (horizontaux et verticaux)  lorsque la case finale contient une pièce de même couleur.
- Validation des mouvements (horizontaux et verticaux) qui se terminent sur une case contenant une pièce d'une couleur différente.
- Invalidation des mouvements (horizontaux et verticaux) lorsque toutes les cases intermédiaires ne sont pas vides.

### Exemple: validation des mouvements  d'une tour en plusieurs étapes

#### Etape 1

Commencez par la 1e fonctionnalité, la validation des déplacements horizontaux:

```ts
// Dans le fichier "move-validation.ts"
export function rookMove(board: Chessboard, move: Move): boolean {
    return move.from.rank === move.to.rank; // Si les lignes de début de fin sont les mêmes, le déplacement est horizontal
}
```

Écrivez ensuite le test unitaire pour cette fonctionnalité:

```ts
// Dans le fichier "move-validation-spec.ts"
describe("Test rookMove()", () => {
    // Fonction exécutée avant chaque test unitaires:
    beforeEach( () => {
        // Création d'un échiquier vide:
        chessboard = createEmptyChessboard();

        // La variable "positionE4" a été créée au début du module pour simplifier le code des tests
        // Place une tour sur la case E4 d'un échiquier vide:
        putPiece(chessboard, positionE4, pieces.blackPawn);
    });

    it("A roock can move horizontally", () => {
        // Les variable "moveE4_H4" et "moveE4_14" ont été créées au début 
        // du module pour simplifier le code des tests.
        // Le déplacement doit être possible:
        expect(isPossible.rookMove(chessboard, moveE4_H4)).toBeTruthy();
        expect(isPossible.rookMove(chessboard, moveE4_A4)).toBeTruthy();
    });
```

#### Etape 2

Nouvelle fonctionnalité à implémenter: la validation des déplacements verticaux. Modifiez la fonction `rookMove()`:

```ts
// Dans le fichier "move-validation.ts"
export function rookMove(board: Chessboard, move: Move): boolean {
    return move.from.rank === move.to.rank || // Si les lignes de début de fin sont les mêmes, le déplacement est horizontal
        move.from.file === move.to.file;  // Si les colonnes de début de fin sont les mêmes, le déplacement est vertical
}
```

Écrivez ensuite un nouveau test unitaire pour cette nouvelle fonctionnalité:

```ts
// Dans le fichier "move-validation-spec.ts"
describe("Test rookMove()", () => {
    beforeEach( () => { // Fonction exécutée avant chaque test unitaires
        chessboard = createEmptyChessboard(); // Création d'un échiquier vide
    });

    it("A roock can move horizontally", () => { // (...)
    });

    it("A roock can move vertically", () => {
        expect(isPossible.rookMove(chessboard, moveE4_E8)).toBeTruthy();
        expect(isPossible.rookMove(chessboard, moveE4_E1)).toBeTruthy();
    });
```

#### Autres étapes

Suivez la même démarche pour implémenter et tester les autres fonctionnalités, c'est à dire, les autres mouvements possibles des tours.

### Rendu

Vous allez pouvoir effectuer le rendu directement depuis l'interface de Gitlab, en réalisant ce qu'on appelle une **demande de fusion**.
Cela permet de nous envoyer tous les changements que vous avez effectué sur le projet en quelques clics.

0. Assurez vous d'avoir effectué tous les *commits* et *pushs* nécessaires avec git.
1. Dans le panneau de gauche, cliquez sur "Demandes de fusion".
2. Cliquez sur "Nouvelle demande de fusion".
3. Vérifiez que dans la partie droite on trouve bien `naomod/software-development-course/onlineChess` et `master`.
4. Dans la partie gauche, choisissez `<votre nom d'utilisateur>/onlineChess` (normalement déjà choisi) et également `master`.
5. Cliquez sur "Compare branches and continue".
6. Comme titre pour la demande de fusion, indiquez "Rendu NOM1 NOM2".
7. Enfin, cliquez en bas sur "Submit demande de fusion"

Vous atteignez alors une page qui résume la demande effectuée.
Nous vous recommandons alors de cliquer sur l'onglet "*Changes*" afin d'avoir accès une une représentation visuelle de tous les changements que vous avez effectué.
Les lignes rouges indiques ce que vous avez retiré, les lignes vertes indiquent ce que vous avez ajouté.
Vérifiez si tout votre travail réalisé est bien présent sous la forme de lignes vertes.

Si vous le souhaitez, vous pouvez ajouter un fichier "`RENDU.md`" à la racine du projet, afin de décrire les spécificités de votre projet (choix techniques, parties non traitées, extensions non demandées, etc.).

### Derniers conseils

- Rappelez-vous que « *Une fonction sans test unitaire ne fonctionne pas* » ! 

- Rappelez-vous aussi que «*N'importe qui peut écrire du code compréhensible par les ordinateurs, mais seulement les bon développeurs parviennent à écrire du code intelligible par les humains* » !

- Écrivez les tests unitaires avant ou en même temps que les fonctions. Ne les laissez pas pour la fin, les test unitaires sont très utiles pendant le développement et vous feront gagner du temps.

- Faites bon usage de `git` : effectuez des *commits* et des *pushs* régulièrement ! Cela vous permet d'éviter de perdre votre travail, et de mieux collaborer en équipe.




