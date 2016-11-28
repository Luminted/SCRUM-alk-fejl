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

Navigálunk parancssorral a következő mappába ...\SCRUM-alk-fejl\app. A függőségek telepítéséhez adjuk ki a 'npm install' parancsot. Ez után adjuk ki a következő parancsokat a web és adatbázis szerver elindításához:
* npm start
* node_modules\.bin\admin config\express-admin

Ezek rendre a 3333 és 4444 számú portokon lesznek elérhetőek.

### Végpontok

* on / :Főoldal

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

## Kontrollerek

### UserController

const Validator = use('Validator')
const User = use('App/Model/User')
const Undertaking = use('App/Model/Undertaking')
const Category = use('App/Model/Category')
const Database = use('Database')
const Hash = use('Hash')

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

![alt text](https://github.com/Luminted/SCRUM-alk-fejl/blob/master/Dokumentacio/ScrumUseCase.png "Használati esetek")