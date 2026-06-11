SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

ALTER TABLE comercio 
ADD COLUMN usuario_id BIGINT;

ALTER TABLE comercio 
ADD CONSTRAINT fk_comercio_usuario 
FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

ALTER TABLE comercio ALTER COLUMN usuario_id SET NOT NULL;

-- Step 5: Drop old columns
ALTER TABLE comercio 
DROP COLUMN nit,
DROP COLUMN contacto,
DROP COLUMN direccion,
DROP COLUMN horario_atencion;

SELECT * FROM comercio;

UPDATE comercio 
SET usuario_id = 1 
WHERE usuario_id IS NULL;