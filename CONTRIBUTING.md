# Contributing to Naija AI Index

Thank you for helping build the directory of Nigerians in AI. This guide explains how to add a project, report issues, and contribute to the codebase.

## Adding a Project

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io) >= 9

### Steps

1. **Fork** this repository and clone your fork
2. **Install** dependencies: `pnpm install`
3. **Create** a new YAML file at `data/projects/your-project-slug.yaml`
   - The filename must be a URL-safe slug derived from the project name
   - Example: "My AI Tool" → `my-ai-tool.yaml`
4. **Fill in** the required fields using the template below
5. **Validate** your entry: `pnpm validate:data`
6. **Regenerate** the README: `pnpm generate:readme`
7. **Regenerate** site data: `pnpm generate:data`
8. **Commit** all changes and open a Pull Request

### Project Template

```yaml
name: Your Project Name
tagline: A concise tagline (max 120 characters)
description: >
  A longer description of your project. What does it do?
  Why does it matter? Who is it for? (max 600 characters)
website: https://yourproject.com        # optional
demo: https://demo.yourproject.com      # optional
repo: https://github.com/you/project    # optional
docs: https://docs.yourproject.com      # optional
logo: /public/logos/your-project.png    # optional
categories:
  - llm-apps          # at least one required
tags:
  - nlp               # optional, max 10
  - chatbot
team:
  - name: Your Name
    role: Founder
    links:
      github: https://github.com/yourusername
      twitter: https://twitter.com/yourusername
      linkedin: https://linkedin.com/in/yourusername
      website: https://yourwebsite.com
origin:
  nigerian: true       # required, must be true
  based_in: Lagos      # optional
status: active         # required: active | paused | archived
year_started: 2024     # optional
last_updated: "2026-02-09"  # required, ISO date
```

### Allowed Categories

Use exactly these values:

`llm-apps` · `agents` · `developer-tools` · `infra` · `datasets` · `research` · `health` · `fintech` · `education` · `agriculture` · `climate` · `govtech` · `security` · `media`

### Validation Rules

Your submission must pass these checks:

- All required fields are present and correctly typed
- `tagline` is 120 characters or fewer
- `description` is 600 characters or fewer
- At least one of `website`, `demo`, or `repo` is provided
- `origin.nigerian` must be `true`
- Filename slug matches the normalized project name
- No duplicate project names or repository URLs
- Categories are from the allowed list
- Tags array has at most 10 items

## Quality Bar

Entries should meet a minimum quality standard:

- The project should be **real and verifiable** (working website, public repo, or credible demo)
- The description should be **accurate and informative**
- Links should be **working and relevant**
- The project must have a **meaningful connection to AI/ML**

Maintainers reserve the right to request additional evidence or reject low-quality submissions.

## Anti-Spam Policy

The following will result in immediate rejection:

- Submissions with no working links or evidence of a real project
- Duplicate submissions or re-submissions of rejected projects without addressing feedback
- Entries that are primarily advertisements or promotional content
- Projects with no meaningful AI/ML component
- Bulk submissions from a single contributor without prior maintainer approval

Repeated violations may result in a ban from contributing.

## Verification Policy

Maintainers may request:

- Proof of Nigerian origin or team membership
- Evidence that the project is active and functional
- Additional links or documentation
- Clarification on the AI/ML component

Please respond to verification requests within 7 days, or the PR will be closed.

## Reporting Issues

- **Add a project**: Use the "Request: Add Project" issue template
- **Report a bug**: Use the "Bug Report" issue template
- **General questions**: Open a discussion

## Development

```bash
# Install dependencies
pnpm install

# Validate all project data
pnpm validate:data

# Regenerate README directory section
pnpm generate:readme

# Regenerate website data
pnpm generate:data

# Run linter
pnpm lint

# Run type checker
pnpm typecheck

# Build the website
pnpm build

# Start dev server
pnpm dev
```

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you agree to uphold a welcoming and inclusive community.
