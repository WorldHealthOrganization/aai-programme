# aai-platform work plan (beans)

This branch holds the Platform workstream's beans: one Markdown file per work item, in the layout the [`beans`](https://github.com/hmans/beans) CLI reads. It is kept apart from `main` so that claiming or updating a bean never needs a pull request.

- Beans live in [`beans/defs/`](beans/defs/).
- To work on them from a checkout of `main`, run `scripts/state-mount.sh`. It puts this branch at `.state/`, where `.beans.yml` points the CLI.
- GitHub issues hold programme status. A bean that tracks programme work carries `issue:` with the issue's URL.
- The combined board of every platform repository's beans is `pulled/README.md` on `main`.
