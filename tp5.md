
# **TP5 – SQL d’Extraction & Concepts Avancés**  
**(Jointure, Regroupement, Requêtes Imbriquées, Division, Vues, Transactions)**  

---

## **Schéma de la Base de Données**

Soit la base de données relationnelle composée des relations suivantes :

- **Avion**  
  (`IdAvion`, nom, catégorie, NbPlaces, DateConstruction, `#IdConstructeur`)

- **Constructeur**  
  (`IdConstructeur`, nom, pays)

- **Pilote**  
  (`IdPilote`, nom, prénom, nationalité)

- **Piloter**  
  (`#IdAvion`, `#IdPilote`)

- **Aéroport**  
  (`IdAer`, nom, ville)

- **Dessert**  
  (`#IdAer`, `#IdAvion`, NB_Fois_Semaine)

- **Achat**  
  (`IdAchat`, `#IdAvion`, `#IdCompagnie`, DateAchat, Quantité)

- **Compagnie**  
  (`IdCompagnie`, nom, contact)

---

# **Partie 1 — Requêtes SQL**

Exprimer en SQL les requêtes suivantes :

1. Donner les avions **Boeing 777** pilotés par des pilotes **algériens** et apparus **avant 2010**.

2. Donner les avions qui sont **pilotés uniquement** par des pilotes algériens.

3. Donner les compagnies qui **n'ont acheté aucun avion** dont le nom contient *Boeing*  
   → proposer **deux solutions** :  
   - avec `NOT EXISTS`  
   - avec `NOT IN`

4. Donner les pilotes qui ont piloté des avions construits par **Boeing** ou **Airbus**.

5. Donner les pilotes qui ont piloté **à la fois** des avions du constructeur Boeing **et** Airbus.

6. Donner **l’avion le plus acheté** par **Air-Algérie**.

7. Donner les compagnies qui ont acheté **uniquement** des avions **Airbus**.

8. Donner **le prix moyen des avions par catégorie**.

9. Donner les aéroports desservis par **au moins 10 avions Boeing 767 par semaine**.

10. Donner les aéroports desservis par **au moins 10 avions Boeing (tous modèles) par semaine**.

11. Donner le nom des compagnies et le nom des avions pour les compagnies ayant acheté un avion **en quantité supérieure à la moyenne des ventes de ce même avion** parmi toutes les compagnies.

12. Donner pour chaque constructeur :  
   - l’identificateur  
   - le nom  
   - le **total des ventes réalisées**

13. Donner l’identificateur, le nom et le total des achats réalisés pour les compagnies qui ont acheté **plus de 5 avions différents**.

14. Donner les compagnies qui ont acheté **tous les types d’avions du constructeur Boeing**  
   → proposer **deux solutions** :  
   - avec `NOT EXISTS`  
   - avec `GROUP BY`

15. Donner les **avions qui desservent tous les aéroports**  
   → proposer **deux solutions** :  
   - avec `NOT EXISTS`  
   - avec `GROUP BY`

16. Donner les compagnies qui ont acheté **tous les produits achetés** par la compagnie dont l'identificateur est **3**.

---

