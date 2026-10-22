<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Mock content lives in src/lib/data.ts and app state (saved, language, panels) in src/lib/store.tsx — keeps UI swappable for real KURA data later.
- Opportunity lifecycle and source evidence are derived in the shared data module and rendered through shared summary and handoff components, so discovery and detail views use consistent rules.
- Device-only saves and language choice hydrate after mount and persist through guarded browser storage; no account or personal-data service is needed for these preferences.
- Learning and wellness use separate content routes while preserving existing public story and opportunity URLs, so intent-based navigation does not break shared links.
