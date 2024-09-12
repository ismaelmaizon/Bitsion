use ficticiadb;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	email varchar(50) NOT NULL,
	clave varchar(80) NOT NULL,
    rol varchar(5) NOT NULL, 
    Primary key (id)
);

CREATE TABLE Persona (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    identificacion VARCHAR(20) NOT NULL UNIQUE,
    edad INT NOT NULL,
    genero VARCHAR(20) NOT NULL,
    estado INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Atributos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    atributo VARCHAR(100) NOT NULL
);


CREATE TABLE Persona_Atributo (
    id_persona INT,
    id_atributo INT,
    descripcion_adicional VARCHAR(255),
    PRIMARY KEY (id_persona, id_atributo),
    FOREIGN KEY (id_persona) REFERENCES Persona(id),
    FOREIGN KEY (id_atributo) REFERENCES Atributos(id)
);
/*ver tablas*/

SELECT * FROM Persona;
SELECT * FROM Atributos;
SELECT * FROM Persona_Atributo;


/*insert*/

INSERT INTO Persona (nombre_completo, identificacion, edad, genero, estado)
VALUES ('Juan Ignacio', '1444567890', 30, 'Masculino', 1);
INSERT INTO Atributos (atributo)
VALUES ('Usa Lentes');
INSERT INTO Persona_Atributo (id_persona, id_atributo, descripcion_adicional)
VALUES (1, 1, 'pero solo de descanso');


/*buscar*/
SELECT * FROM Persona WHERE identificacion = '1234567333';



/*update*/

UPDATE Persona
SET nombre_completo = 'María López', 
    edad = 28, 
    genero = 'Femenino', 
    estado = 1
WHERE identificacion = '1234567890';