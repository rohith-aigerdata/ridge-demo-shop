# Ridge Demo Shop: instructions for coding agents

A small storefront: Express 5 API in `src/`, one static page in `public/`,
tests in `test/` (`node:test`, no extra test libraries). Prices are integers in
cents everywhere.

## How to work an issue

1. **Plan first, then stop.** On your first run for an issue, do not change
   code. Read the relevant files and reply with a plan that starts with the
   exact line `QUESTION: Plan ready for approval`, followed by:
   - the root cause (bugs) or the approach (features), in two or three sentences;
   - the files you will change;
   - the tests you will add.
   A human approves or corrects the plan in a comment; you continue in the same
   session after that.
2. **Ask when the issue leaves a business decision open** (a price, a
   threshold, who qualifies). Put the question in the plan instead of guessing.
3. **Implement exactly the approved plan.** Keep the change small and in the
   existing style. Every bug fix gets a test that fails without the fix.
4. Run `npm test` before you finish. Do not edit `.ridge/`, `Dockerfile` or
   `package.json` unless the plan says so.
5. Finish with a short summary: what changed, why, and the test you added.

## When a reviewer rejects your PR

Read their comment, change only what they asked for, run `npm test` again, and
summarize what you changed in response.
