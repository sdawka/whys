## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## DB 
```sql
CREATE TABLE whys (
    why_id TEXT PRIMARY KEY,
    name TEXT DEFAULT 'unnamed', 
    user_email TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch()),
    is_deleted INTEGER DEFAULT 0
);

CREATE TABLE qa_sessions (
    session_id TEXT PRIMARY KEY,
    why_id TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch()),
    FOREIGN KEY (why_id) REFERENCES whys(why_id)
);

CREATE TABLE qa_interactions (
    interaction_id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sequence_number INTEGER NOT NULL,
    created_at INTEGER DEFAULT (unixepoch()),
    FOREIGN KEY (session_id) REFERENCES qa_sessions(session_id)
);

CREATE TABLE key_point_types (
    type_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    parent_type_id TEXT,
    FOREIGN KEY (parent_type_id) REFERENCES key_point_types(type_id)
);

INSERT INTO key_point_types (type_id, name, description) VALUES 
    ('purpose', 'purpose', 'Strong and practical/validated purpose'),
    ('negative_pressure', 'negative_pressure', 'Negative pressures from non-existence'),
    ('direction', 'direction', 'Clear direction, if not destination');

CREATE TABLE key_points (
    key_point_id TEXT PRIMARY KEY,
    why_id TEXT NOT NULL,
    type_id TEXT NOT NULL,
    content TEXT NOT NULL,
    extracted_from_interaction_id TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch()),
    FOREIGN KEY (why_id) REFERENCES whys(why_id),
    FOREIGN KEY (type_id) REFERENCES key_point_types(type_id),
    FOREIGN KEY (extracted_from_interaction_id) REFERENCES qa_interactions(interaction_id)
);

CREATE INDEX idx_whys_user_email ON whys(user_email);
CREATE INDEX idx_qa_sessions_why_id ON qa_sessions(why_id);
CREATE INDEX idx_qa_interactions_session_id ON qa_interactions(session_id);
CREATE INDEX idx_key_points_why_id ON key_points(why_id);
CREATE INDEX idx_key_points_type_id ON key_points(type_id);

PRAGMA foreign_keys = ON;
```
