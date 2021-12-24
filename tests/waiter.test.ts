import {Waiter} from "../objects/waiters";

// SCOPE Serveur



describe("WAITER TESTS1" , () => {

        it("GIVEN new waiter WHEN created THEN has 0 turnover", () => {
            // 		ÉTANT DONNÉ un nouveau serveur
            const waiter = new Waiter("Charles", 0);
            // 		QUAND on récupére son chiffre d'affaires
            // 		ALORS celui-ci est à 0
            expect(waiter.turnover).toEqual(0)
        });
})

// 		ÉTANT DONNÉ un nouveau serveur
// 		QUAND il prend une commande
// 		ALORS son chiffre d'affaires est le montant de celle-ci

// 		ÉTANT DONNÉ un serveur ayant déjà pris une commande
// 		QUAND il prend une nouvelle commande
// 		ALORS son chiffre d'affaires est la somme des deux commandes

//