# A1-MART Workspace Rules & Knowledge Maintenance Instructions

This project is the **A1-MART Enterprise Retail ERP** migrated to React 18, Vite 6, and a Shoplay-inspired design system.

## Mandatory Skill & Knowledge Tracking Protocol
The canonical knowledge base, architecture documentation, module directory, and living change log for this project are maintained in:
👉 **[SKILL.md](./.agents/skills/a1mart-knowledge-tracker/SKILL.md)**

### Rules for all AI Assistants & Agents:
1. **Always Consult the Knowledge Skill**: Before modifying or creating files, review [`.agents/skills/a1mart-knowledge-tracker/SKILL.md`](./.agents/skills/a1mart-knowledge-tracker/SKILL.md) to understand current architecture, existing routes, and data schemas.
2. **Never Fabricate Mock Data**: Real retail ERP datasets for all 63 routes are preserved in `src/data/mockData.js` and `src/data/htmlPagesData.js`. Always reuse and extend these datasets.
3. **Strict Adherence to Shoplay Design System**:
   - Primary: `#7950F2` (Purple), Background: `#F6F5FA`, Elevated Cards: `#FFFFFF` with `18px–22px` border-radius.
   - Use CSS variables defined in `src/styles/index.css`.
   - Use `lucide-react` for all iconography.
4. **Update the Skill File**: Whenever you implement changes, analyze the codebase, add features, or refactor components, you **MUST** update [`.agents/skills/a1mart-knowledge-tracker/SKILL.md`](./.agents/skills/a1mart-knowledge-tracker/SKILL.md) by adding a new log entry to the **Living Change Log & Evolution History** section so knowledge is permanently tracked across sessions.

