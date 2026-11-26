# Client readiness

**Decision: READY WITH WARNINGS** (as a clickable prototype for client demos, scope = mobile design + theme).

Why ready: every route and screen renders without errors on 320–430px phones, tablet and desktop in three languages; all mobile layout defects found were fixed and re-tested; Light/Dark/Auto works and persists; 0 JavaScript errors across 5 test suites.

Warnings:
1. Only responsive, accessibility (partial, no axe-core) and functional QA were assessed; UX, UI, business, conversion, design-consistency, performance and workflow modules were not run.
2. Chromium emulation only — no real iPhone/Android device test.
3. It is a prototype: no backend; reports do not travel between two different phones; prices are test prices (and the landing page and the "new customer" flow still use two different pricing models).
4. Header buttons are 38–42px (meet WCAG AA 24px, below the 44px advisory).
