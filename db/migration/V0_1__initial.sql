CREATE SCHEMA IF NOT EXISTS foobarbazs;

CREATE FUNCTION update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
$$;

CREATE TABLE instances (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE INDEX instances_user_id_idx on "instances"("user_id");
CREATE TRIGGER instances_updated_at_modtime BEFORE UPDATE ON "instances" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
