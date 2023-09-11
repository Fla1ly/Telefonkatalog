const prompt = require('prompt-sync')(); //modul som trengs for å hente input fra teminalen
var mySql = require('sync-mysql'); //modul for å koble til databasen


//lager en konling til databasen
var connection = new mySql({
    host: 'localhost',
    user: 'root',
    password: 'Admin',
    database: 'telefondb'
});


var telefonkatalog = connection.query('SELECT * from telefonkatalog');


function printMeny() {
    console.log("╭───────────────────────────────────────╮");
    console.log("│   Telefonkatalog - Databaste (Admin)  │");
    console.log("├───────────────────────────────────────┤");
    console.log("│         1. Legg til ny person         │");
    console.log("│         2. Søk opp person eller       │");
    console.log("│            telefonnummer              │");
    console.log("│         3. Vis alle personer          │");
    console.log("│         4. Avslutt                    │");
    console.log("│         5. Fjern person               │");
    console.log("│         6. Endre Info                 │");
    console.log("╰───────────────────────────────────────╯");


    const tallFraMeny = prompt('Velg et tall fra menyen: ')
    urfoerMenyvalg(tallFraMeny);
}


printMeny(); // for å starte programmet første gang


function urfoerMenyvalg(tallFraMeny) {
    if (tallFraMeny == 1) {
        leggTilPerson();
    } else if (tallFraMeny == 2) {
        sokPerson();
    } else if (tallFraMeny == 3) {
        visAlle();
    } else if (tallFraMeny == 4) {
        avslutt();
    } else if (tallFraMeny == 5) {
        fjernPerson();
    } else if (tallFraMeny == 6) {
        endrePerson();
    } else {
        console.log("Du må velge et gyldig tall (1-4)");
        printMeny();
    }
}


function leggTilPerson() {
    var inputFornavn = prompt("Skriv inn fornavn: ");
    var inputEtternavn = prompt("Skriv inn etternavn: ");
    var inputTelefonnummer = prompt("Skriv inn telefonnummer: ");

    if (inputTelefonnummer < 8) {
        console.log ("Oppgi et gyldig nummer")
    } else {
        
    }

    var spoerring = "INSERT INTO telefonkatalog(fornavn, etternavn, telefonnummer) VALUES ('" + inputFornavn + "','" + inputEtternavn + "','" + inputTelefonnummer + "');"
    connection.query(spoerring);

    var nyPerson = { fornavn: inputFornavn, etternavn: inputEtternavn, telefon: inputTelefonnummer };
    telefonkatalog.push(nyPerson);

    console.log(nyPerson.fornavn + " " + nyPerson.etternavn + " er registrert med telefonnummer " + nyPerson.telefon);
    console.log("Trykk en tast for å gå tilbake til menyen")
    printMeny()
}


function sokPerson() {

    console.log("╭─────────────────────────────────╮");
    console.log("│  1. Søk på fornavn              │");
    console.log("│  2. Søk på Etternavn            │");
    console.log("│  3. Søk på telefonnummer        │");
    console.log("│  4. Tilbake til hovedmeny       │");
    console.log("╰─────────────────────────────────╯");
    var sokefelt = prompt("Skriv inn ønsket søk 1-3, eller 4 for å gå tilbake:")
    if (sokefelt == "1") {
        navn = prompt("Fornavn:")
        finnPerson("fornavn", navn)
    } else if (sokefelt == "2") {
        navn = prompt("Etternavn:")
        finnPerson("Etternavn", navn)
    } else if (sokefelt == "3") {
        tlfnummer = prompt("Telefonnummer:")
        finnPerson("telefon", tlfnummer)
    } else if (sokefelt == "4") {
        printMeny()
    } else {
        prompt("Ugyldig valg. Velg et tall mellom 1-4.")
        sokPerson()
    }
}


// typeSok angir om man søker på fornavn, etternavn, eller telefonnummer
function finnPerson(typeSok, sokeTekst) {

    var spoerring = "SELECT * from telefonkatalog WHERE " + typeSok + " = '" + sokPerson + "'";
    var resultat = connection.query(spoerring);
    if (resultat.lenght < 1) {
        console.log("Finner ingen treff på det søket.");
    } else {
        for (var i = 0; i < resultat.lenght; i++) {
            console.log(resultat[i].fornavn + " " + resultat[i].etternavn + " er registrert med telefonnummer " + resultat[i].telefonnummer)
        }
    }
    prompt("Trykk en tast for å gå tilbake til menyen")
    printMeny()
}


function visAlle() {
    var result = connection.query('SELECT * from telefonkatalog');
    for (var i = 0; i < result.length; i++) {
        console.log(result[i].fornavn + " " + result[i].etternavn + " er registrert med telefonnummer " + result[i].telefonnummer)
    }
    prompt("Trykk en tast for å gå tilbake til menyen")
    printMeny()
}


function fjernPerson() {

    var result = connection.query('SELECT * from telefonkatalog');
    console.log(result);
    console.log("╭─────────────────────────────────╮");
    console.log("│         Hele Databasen          │");
    console.log("│     Slett personer etter 1-4    │");
    console.log("├─────────────────────────────────┤");
    console.log("│  1. Slett etter fornavn         │");
    console.log("│  2. Slett etter etternavn       │");
    console.log("│  3. Slett etter telefonnummer   │");
    console.log("│  4. Slett etter ID              │");
    console.log("│  5. Gå tilbake til meny         │");
    console.log("╰─────────────────────────────────╯");
    var sokefelt = prompt("Skriv inn 1-4, eller 5 for å gå tilbake:")
    if (sokefelt == "1") {
        inputFornavn = prompt("Fornavn: ")
        var spoerring = "DELETE FROM telefonkatalog WHERE fornavn = ('" + inputFornavn + "');"
        console.log("Personen med fornavn " + inputFornavn + " er slettet fra databasen.");
        connection.query(spoerring);
    } else if (sokefelt == "2") {
        inputEtternavn = prompt("Etternavn: ")
        inputFornavn = prompt("Fornavn: ")
        spoerring = "DELETE FROM telefonkatalog WHERE etternavn = ('" + inputEtternavn + "');"
        console.log("Personen med etternavn " + inputEtternavn + " er slettet fra databasen.");
        connection.query(spoerring);
    } else if (sokefelt == "3") {
        inputTelefonnummer = prompt("Telefonnummer: ")
        spoerring = "DELETE FROM telefonkatalog WHERE telefonnummer = ('" + inputTelefonnummer + "');"
        console.log("Personen med telefonnummer " + inputTelefonnummer + " er slettet fra databasen.");
        connection.query(spoerring);
    } else if (sokefelt == "4") {
        inputId = prompt("Id: ")
        spoerring = "DELETE FROM telefonkatalog WHERE id = " + inputId;
        console.log("Personen med id " + inputId + " er slettet fra databasen.");
        connection.query(spoerring);
    } else if (sokefelt == "5") {
        printMeny()
    } else {
        prompt("Ugyldig valg. Velg et tall mellom 1-5.")
        fjernPerson()
    }
    printMeny()

}



function endrePerson() {
    var result = connection.query('SELECT * from telefonkatalog');
    console.log(result);
    console.log("Her er alle i databasen.");
    var inputUpdate = prompt("Id til personen du vil oppdatere: ")
    console.log("╭──────────────────────────────────────────╮");
    console.log("│ Hva vil du endre/oppdatere på personen?  │");
    console.log("├──────────────────────────────────────────┤");
    console.log("│           1. Endre fornavn               │");
    console.log("│           2. Endre etternavn             │");
    console.log("│           3. Endre telefonnummer         │");
    console.log("│           5. Gå tilbake til meny         │");
    console.log("╰──────────────────────────────────────────╯");
    console.log("Hva vil du endre/oppdatere på personen?");
    console.log("1. Endre fornavn")
    console.log("2. Endre etternavn")
    console.log("3. Endre telefonnummer")
    console.log("4. Gå tilbake til meny")
    var sokefelt = prompt("Skriv inn ønsket søk 1-3, eller 4 for å gå tilbake:")
    if (sokefelt == "1") {
        var nyttnavn = prompt("Skriv inn det nye navnet: ")
        var spoerring = "UPDATE telefonkatalog SET fornavn = '" + nyttnavn + "' WHERE id = '" + inputUpdate + "'";
        connection.query(spoerring);
        console.log("Fornavnet til personen med id " + inputUpdate + " er endret.");
    } else if (sokefelt == "2") {
        var nyttetternavn = prompt("Skriv inn det nye etternavnet: ")
        spoerring = "UPDATE telefonkatalog SET etternavn = '" + nyttetternavn + "' WHERE id = '" + inputUpdate + "'";
        connection.query(spoerring);
        console.log("Etternavnet til personen med id " + inputUpdate + " er endret.");
    } else if (sokefelt == "3") {
        var nytttelefonnummer = prompt("Skriv inn det nye telefonnummeret: ")
        spoerring = "UPDATE telefonkatalog SET telefonnummer = '" + nytttelefonnummer + "' WHERE id = '" + inputUpdate + "'";
        connection.query(spoerring);
        console.log("Telefonnummeret til personen med id " + inputUpdate + " er endret.");
    } else if (sokefelt == "4") {
        printMeny()
    } else {
        prompt("Ugyldig valg. Velg et tall mellom 1-4.")
        endrePerson()
    }
    printMeny()
}


function avslutt() {
    console.log("Takk for i dag");
    connection.dispose(); //lukker databasetilkobling
    process.exit(); //avslutter programmet
}