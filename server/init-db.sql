CREATE DATABASE animals;

CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    breed VARCHAR(255),
    ownerid INTEGER,
    FOREIGN KEY (ownerid) REFERENCES owners (id) ON DELETE CASCADE
);

INSERT INTO owners (name) VALUES ('Ruslan'), ('Andrey'), ('Nikita');

INSERT INTO pets
    (name, type, breed, ownerid)
VALUES
    ('GavGaviych', 'Dog', 'Beagle', 1),
    ('MyauMyavovna', 'Cat', 'Munchkin', 2),
    ('IgogoIgogovich', 'Horse', 'Mustang', 3);