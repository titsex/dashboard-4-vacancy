CREATE DATABASE animals;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    password VARCHAR
);

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    refresh_token VARCHAR,
    ip VARCHAR(15),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO users
    (name, email)
VALUES
    ('Ruslan', 'ruslan@domain.com'),
    ('Andrey', 'andrey@domain.com'),
    ('Nikita', 'nikita@domain.com');

INSERT INTO pets
    (name, type, userid)
VALUES
    ('Muhtar', 'Dog', 1),
    ('Mila', 'Cat', 2),
    ('Sila', 'Horse', 3);