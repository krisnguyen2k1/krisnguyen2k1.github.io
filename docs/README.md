# Portfolio project documentation

All project outputs created during the portfolio workflow are stored in this repository.

## Phase records

1. [`phase-0-forensic-audit.md`](project-phases/phase-0-forensic-audit.md)
2. [`phase-1-positioning.md`](project-phases/phase-1-positioning.md)
3. [`phase-2-information-architecture.md`](project-phases/phase-2-information-architecture.md)
4. [`phase-3-complete-copy.md`](project-phases/phase-3-complete-copy.md)
5. [`phase-4-case-studies.md`](project-phases/phase-4-case-studies.md)
6. [`phase-5-design-build.md`](project-phases/phase-5-design-build.md)
7. [`phase-6-verification.md`](project-phases/phase-6-verification.md)
8. [`phase-7-handover.md`](project-phases/phase-7-handover.md)

## Machine-readable evidence

- [`static-qa-results.json`](verification/static-qa-results.json) contains the generated result of 100 static-export checks.

The verification JSON is regenerated with:

```bash
npm run build
npm run verify:static
```
