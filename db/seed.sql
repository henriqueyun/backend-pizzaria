INSERT INTO usuarios (username, password, fullName, role, activeSession, createdAt, updatedAt) 
VALUES ('admin', 'admin', 'Administrador', 'admin', '', NOW(), NOW())
,('caique', '123', 'Caique', 'admin', '', NOW(), NOW())
,('isis', '123', 'Isis', 'admin', '', NOW(), NOW())
,('henrique', '123', 'Henrique', 'admin', '', NOW(), NOW());

INSERT INTO pizzas (nome, preco, imgURL, ingredientes, createdAt, updatedAt)
VALUES ('Muçarela', '31', 'https://i.imgur.com/01uIZES.jpeg', 'Queijo muçarela, tomate, azeitona e orégano', NOW(), NOW())
,('Calabresa', '31', 'https://i.imgur.com/D3I47m8.jpeg', 'Calabresa, queijo muçarela, tomate, azeitona e orégano', NOW(), NOW())
,('Margherita', '31', 'https://i.imgur.com/dFFRmUd.png', 'Queijo muçarela, manjericão, tomate, azeitona e orégano', NOW(), NOW())
,('Baiana', '34', 'https://i.imgur.com/gbDbex5.png', 'Queijo muçarela, presunto, calabresa, ovo, pimenta, cebola, tomate, azeitona e orégano', NOW(), NOW())
,('Vegana', '38', 'https://i.imgur.com/L9WqVzD.jpeg', 'Queijo de castanha, tomate, azeitona e orégano', NOW(), NOW())
,('Portuguesa', '34', 'https://i.imgur.com/VDq8tie.jpeg', 'Queijo muçarela, presunto, cebola, pimentão, milho, ervilha, tomate, azeitona e orégano', NOW(), NOW());

INSERT INTO bebidas (nome, preco,imgURL, alcoolica, volume, createdAt, updatedAt)
VALUES ('Garrafa Coca-cola 2L', '11', NULL, true, 2000 NOW(), NOW())
,('Garrafa de Vinho', '80', NULL, true, 1100 NOW(), NOW())
('Garrafa Whisky', '11', NULL, true, 900, NOW(), NOW())
('Lata Coca-cola', '8', NULL, true, 350, NOW(), NOW())