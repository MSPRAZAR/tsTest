

// SCOPE DebutService

describe("CATERING SCOPE", () => {
    it("GIVEN a restaurant with 3 tables" + 
    "WHEN shift starts" + 
    "THEN they all are affected to the butler", 
    () => {
// 	ÉTANT DONNE un restaurant ayant 3 tables
// 	QUAND le service commence
// 	ALORS elles sont toutes affectées au Maître d'Hôtel
    });
    it("GIVEN a restaurant with 3 tables and 1 affected to a butler"
    + "WHEN shift starts"
    + "THEN edited table is affected to the waiter and 2 others to the butler", () => {
// 	ÉTANT DONNÉ un restaurant ayant 3 tables dont une affectée à un serveur
// 	QUAND le service débute
// 	ALORS la table éditée est affectée au serveur et les deux autres au maître d'hôtel
    });
    it("GIVEN a restaurant with 3 tables and 1 affected to a waiter" + 
    "WHEN shift starts" 
    + " THEN it is not possible to update the waiter affected to the table", () => {

// 	ÉTANT DONNÉ un restaurant ayant 3 tables dont une affectée à un serveur
// 	QUAND le service débute
// 	ALORS il n'est pas possible de modifier le serveur affecté à la table
    });
    it("GIVEN a restaurant with 3 tables and 1 affected to a waiter AND shift started" + 
    "WHEN shift ends AND a table is affected to a waiter" + 
    "THEN updated table is affected to the waiter and 2 others to the butler", () => {
// 	ÉTANT DONNÉ un restaurant ayant 3 tables dont une affectée à un serveur
// 	ET ayant débuté son service
// 	QUAND le service se termine
// 	ET qu'une table est affectée à un serveur
// 	ALORS la table éditée est affectée au serveur et les deux autres au maître d'hôtel
    });
});





