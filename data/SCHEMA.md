# Project Data Schema

Each project in the Naija AI Index is stored as a YAML file in `data/projects/`. The filename must be a URL-safe slug matching the project name (e.g., `my-project.yaml` for "My Project").

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Project name |
| `tagline` | string | Yes | Short description, max 120 characters |
| `description` | string | Yes | Detailed description, max 600 characters |
| `website` | URL | No | Project website |
| `demo` | URL | No | Live demo URL |
| `repo` | URL | No | Source code repository |
| `docs` | URL | No | Documentation URL |
| `logo` | string | No | Path to logo in `/public/logos/` |
| `categories` | array of enums | Yes | At least one category from the allowed list |
| `tags` | array of strings | No | Up to 10 free-form tags |
| `team` | array of objects | No | Team members (see below) |
| `origin` | object | Yes | Origin information (see below) |
| `status` | enum | Yes | `active`, `paused`, or `archived` |
| `year_started` | number | No | Year the project started (2010–2026) |
| `last_updated` | date string | Yes | ISO date (YYYY-MM-DD) of last update |
| `deployment` | object | No | Deployment information (see below) |

**At least one of `website`, `demo`, or `repo` must be provided.**

## Categories

Use exactly these values:

- `llm-apps` — Applications built on large language models
- `agents` — Autonomous AI agents and assistants
- `developer-tools` — Tools and libraries for AI developers
- `infra` — AI infrastructure and platforms
- `datasets` — Datasets and data pipelines
- `research` — Academic or applied AI research
- `health` — Healthcare and medical AI
- `fintech` — Financial technology with AI
- `education` — Education and learning platforms
- `agriculture` — Agricultural technology with AI
- `climate` — Climate and environmental AI
- `govtech` — Government and civic technology
- `security` — Cybersecurity and safety
- `media` — Media, content, and creative AI

## Team Member Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Person's name |
| `role` | string | No | Role or title |
| `links` | object | No | Social links (see below) |

### Team Links Object

| Field | Type | Description |
|-------|------|-------------|
| `twitter` | URL | Twitter/X profile |
| `linkedin` | URL | LinkedIn profile |
| `github` | URL | GitHub profile |
| `website` | URL | Personal website |

## Origin Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nigerian` | boolean | Yes | Must be `true` |
| `based_in` | string | No | Location (e.g., Lagos, Abuja, Remote) |

## Deployment Object

| Field | Type | Description |
|-------|------|-------------|
| `railway` | object | Railway deployment info |
| `railway.template_url` | URL | Railway template URL |
| `railway.project_url` | URL | Railway project URL |

## Quality Bar

Entries are expected to meet a minimum standard:

- **Real and verifiable**: Working links, public code, or credible demo
- **Accurate description**: Honest representation of the project
- **Active maintenance**: Regular updates or clear archived status
- **AI/ML relevance**: Meaningful use of artificial intelligence or machine learning
