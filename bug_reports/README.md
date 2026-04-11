# Bug reports

Use a template file as the starting point for each defect:

- **`TEMPLATE.md`** — English headings (default for handoff and many tools).
- **`TEMPLATE_VI.md`** — Same structure, Vietnamese labels (optional).

1. Duplicate the template you prefer to a new file in this folder (e.g. `add-todo-dashboard-missing.md`).
2. Paste your raw notes, screenshot paths, or terminal output into the new file or alongside it.
3. Point your AI at **`TEMPLATE.md` (or `TEMPLATE_VI.md`) + your new file** (and `@` relevant code if needed) so it can pre-fill sections consistently for different bugs.
4. Hand the completed Markdown to your Dev partner; you can still copy the final text into Jira or Azure DevOps if your team uses those tools.

**Example (filled sample):** [`add_todo_list_bug_reports_sample.md`](./add_todo_list_bug_reports_sample.md) — add-todo not appearing on the dashboard (workshop demo bug).
