# SCRUM-alk-fejl

## A projekt rövid leírása
Egy SCRUM-szerű projektmenedzser aplikáció feladatok szétosztására.

## Követelményelemzés 

### Funkcionális követelmények 
#### Vendégként 

* Regisztráció

#### Regisztrált felhasználóként

* Bejelentkezés
* Profiladatok szerkesztése
* Feladatok megtekintése
* Saját feladatok megtekintéseé és menedzselése
* Feladatok vállalása

#### Adminként

* Bejelentkezés
* Profiladatok szerkesztése
* Feladatok megtekintése
* Saját feladatok megtekintése és menedzselése
* Feladatok vállalása
* Feladatok kiírása

### Nem funkcionális követelmények 

* Felhasználóbarát
* Biztonságos
* Ergonómikus

## Használati esetek 

![alt text](https://github.com/Luminted/SCRUM-alk-fejl/blob/master/Dokumentacio/ScrumUseCase.png "Használati esetek")


## Fogalomtár 

Feladat - Egy az adminisztrátor által meghatározott tevékenység annak leírásával és sprintbe való besorolásával
Sprint - Időintervallum feladatok határidejének meghatározására

## Technikai dokumentáció

### Telepítés

Az állományok letöltése után navigálunk parancssorral a következő mappába ...\SCRUM-alk-fejl\app. A függőségek telepítéséhez adjuk ki a 'npm install' parancsot. Ez után adjuk ki a következő parancsokat a web és adatbázis szerver elindításához:
* npm start
* node_modules\.bin\admin config\express-admin

Ezek rendre a 3333 és 4444 számú portokon lesznek elérhetőek.

Az express szevrer elérhetősége:
Felhasználó: root
Jelszó: ROOTroot123

#### Rendszerkövetelmények
Az alkalmazás platformfüggetlen, szerver oldalon fut. Google Chrome böngészőben tesztelt. Várhatóan minden más nagy böngésző támogatja az itt felhasznált technológiát. Modern, Windows-os rendszeren tesztelt.
A felhasználói felület JavaScriptet használ a felhasználói élmény növelése érdekében. Ha valamilyen okból JavaScript futtatása nem lehetséges, az alkalmazás továbbra is funkcionális marad.

### User Story

Fiókkal nem rendelkező felhasználóként lehetőség van a regisztrációra.

Regisztráció után a felhasználó bejelntkezhet a megfelelő e-mail cím és jelszó párossal.

A hitelesített felhasználó a 'View Tasks' menüpont alatt megtekintheti a kitűzött feladatokat és vállalhatja azokat.

A hitelesített felhasználó a 'Your Tasks' menüpont alatt megtekintheti az általa vállalt feladatokat, teljesítettnek nyilváníthatja azokat vagy leadhatja azokat.

A hitelesített felhasználó a 'Log out' menüponttal kijelentkezhet.

A hitelesített felhasználó a 'SCRUMify' szóra kattintva visszatérhet a főoldalra.

A hitelesített admin felhasználó ezeken felül az 'Add Tasks' menüpont alatt új feladatokat hozhat létre, a 'View Tasks' menüpont alatt feladatokat törölhet.

Az admin felhasználó jelenleg nem procedurálisan generált. Egy ilyen (ScrumMaster69) felhasználó létezik jelenleg az alkalmazásban

E-mail: root@scrum.com

Jelszó: root

### Oldaltérkép

**Publikus:**
* Főoldal
* Bejelentkezés
* Regisztráció

**Bejelentkezett:**
* Főoldal
* Kijelentkezés
* Feladatok megtekintése
  * Feladat vállalása
* Vállalt feladatok megtekintése
  * Feladat teljesításe
  * Feladat leadása

**Admin:**
* Főoldal
* Kijelentkezés
* Feladatok megtekintése
  * Feladat vállalása
  * Feladat törlése
* Vállalt feladatok megtekintése
  * Feladat teljesításe
  * Feladat leadása
* Feladat létrehozása

### Végpontok

* on /: Főoldal

* get /login: Bejelentkezési felület
* post /login: Bejelentkezés feldolgozása

* get /register: Regisztrációs felület
* post /register: Regisztráció feldolgozása

* get /logout: Kijelentkezés

* get /tasks/view: Összes feladat megtekintése
* post /tasks/take: Feladat vállalásának feldolgozása

* get /tasks/userTasks: Felhasználó által vállalt feladatok listázása
* post /tasks/userTasks/abandon: Feladat leadása
* post /tasks/userTasks/complete: Feladat befejeztének jelzése

* get /editUser: Fiók szerkesztési felület
* post /editUser: Fiók szerkesztés feldolgozása

* get /tasks/add: Feladat hozzáadási felület
* post /tasks/add: Feladat hozzáadásának feldolgozása

* post tasks/delete: Feladat törlésének feldolgozása

## Mappaszerkezet

**app/**
* app
  * Https - a szervet oldali logika fájljait tartalmazza(végpontok, kontrollerek, middleware-ek)
    * Controllers - az alkalmazás kontrollerei
  * Model - adatbázis modellek
  * ...
* database - adatbázis és a hozzá tartozó állományok
* node_modules - az alkalmazás dependeniái
* resouces
  * views - template HTML fájlok
* ...

## Kontrollerek

### UserController

#### Függőségek

* Validator
* Hash
* Database 
* User Model
* Undertaking Model
* Category Model


#### Függvények

* renderLogin <- get /login
* renderRegistration <- get /register
* login <-post /login
* register <- post /register
* logout <- get /logout
* abandonTask <- post /tasks/userTasks/abandon
* userTasks <- get /tasks/userTasks
* renderEditPage <- get /editUser
* editUser <- post /editUser

### TaskController

#### Függőségek

* Validator
* Database
* Task Model
* User Model
* Undertaking Model
* Category Model

#### Függvények

* viewTasks <- get /tasks/view
* takeTask <- post /tasks/take
* completeTask <- post /tasks/userTasks/complete
* renderAddTask <- get /tasks/add
* addTask <- post /tasks/add
* deleteTask <- post /tasks/delete

## Adatbázis szerkezet

![alt text](https://github.com/Luminted/SCRUM-alk-fejl/blob/master/Dokumentacio/databaseDiagram.png "Használati esetek")

## Evolúció

* Kliens oldali élmény csiszolása
* Admin felhasználók procedúrális kezelése, hitelesítése
