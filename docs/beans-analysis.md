# Beans that apply to the workstreams

An analysis, on 20 October 2026, of the open work items (beans) across the litlfred repositories, and how the ones that apply to the Assured AI workstreams entered the programme. The bean-by-bean classification is [`beans-analysis.json`](beans-analysis.json) (201 open beans, each with a workstream and pipeline stage).

## What was read

1,756 distinct beans (3,951 files with the copies across stores), 201 open: 25 in this repository, 176 in folio-assistant (126), cat-harness (22), folio-assistant-core (14), cat-harness-tools (13) and smart-ra (1). smart-hiv has no beans; its work list is a `todo.md` of FHIR indicator and value-set notes (WS2, L3). smart-immunizations keeps its beans in folio-assistant's store. dth-hrh, smart-base, smart-trust, fhir-harness and who-iris have none.

## What applies

80 of the 176 apply: WS1 Knowledge graph 19, WS2 Authoring 15, WS3 Evaluation 5, WS4 Localization 5, WS5 Governance 5, Platform 35. The other 92 are harness plumbing (repository separation, CI, QA sidecars, state branches, the navbar) or other folios' content.

Gaps no bean covers: CQL authoring, serving health skills over MCP, and adapting a DAK for a country. All five WS3 beans have been idle since September.

## How they entered the programme

Owner, 20 October 2026: all of it, except anything that touches another repository. So the issues are here, and the beans are unchanged: each issue links its bean, read-only, and no bean was given an `issue:` back-link. The issues were created by `scripts/programme/create-items.ts` from a one-off batch spec (in git history at commit 3320822); each carries the `bean-intake` label, its field values as labels, and a hidden `<!-- bean: owner/repo/id -->` line per bean it carries. Those lines are the links: the bean drift check reads them, and nothing else has to be kept in step. The issue text is written for the programme, not copied from the beans (SEC-03).

- **Five epic proposals**, one per workstream with work (LINK-07): labelled `proposal`, not `type:epic`, until the PM accepts them. Listed on the board under "Proposals awaiting the PM".
- **27 features**, as sub-issues of their proposal.
- **Three decisions** (DEC-B1 to DEC-B3) and **two dependencies** (D-B1, D-B2). The numbers are placeholders until the PM numbers them.
- Everything else stays a bean: the smaller steps under these features, and the 92 that do not apply.

| Issue | Title |
|---|---|
| [#13](https://github.com/litlfred/aai-programme/issues/13) | Epic proposal (WS1): WHO guidance into the L1 knowledge graph |
| [#14](https://github.com/litlfred/aai-programme/issues/14) | Epic proposal (WS2): L1 and DAK authoring on the SMART stack |
| [#15](https://github.com/litlfred/aai-programme/issues/15) | Epic proposal (WS3): evaluate outputs across models and routes |
| [#16](https://github.com/litlfred/aai-programme/issues/16) | Epic proposal (WS4): translated renders and their review |
| [#17](https://github.com/litlfred/aai-programme/issues/17) | Epic proposal (Platform): deployment, publishing and the knowledge graph's publication |
| [#18](https://github.com/litlfred/aai-programme/issues/18) | Feature (WS1): Immunizations L1 knowledge graph from DAK Component 1 |
| [#19](https://github.com/litlfred/aai-programme/issues/19) | Feature (WS1): Extract L1 knowledge-graph nodes from guideline documents |
| [#20](https://github.com/litlfred/aai-programme/issues/20) | Feature (WS1): Tabular source data as CSVW, measured on real sources |
| [#21](https://github.com/litlfred/aai-programme/issues/21) | Feature (WS1): One ingestion pipeline from uploaded sources to a complete L1 library |
| [#22](https://github.com/litlfred/aai-programme/issues/22) | Feature (WS1): Ingest the evidence behind a guideline (PICO, reviews, GRADE) |
| [#23](https://github.com/litlfred/aai-programme/issues/23) | Feature (WS1): Check terminology against existing vocabularies, and adjudicate |
| [#24](https://github.com/litlfred/aai-programme/issues/24) | Feature (WS1): Bibliography as knowledge-graph reference nodes |
| [#25](https://github.com/litlfred/aai-programme/issues/25) | Feature (WS2): L1 and DAK as document kinds in smart-base |
| [#26](https://github.com/litlfred/aai-programme/issues/26) | Feature (WS2): The DAK type, with its Logical Model |
| [#27](https://github.com/litlfred/aai-programme/issues/27) | Feature (WS2): Immunizations business processes as BPMN |
| [#28](https://github.com/litlfred/aai-programme/issues/28) | Feature (WS2): Link IG personas to BPMN swimlanes |
| [#29](https://github.com/litlfred/aai-programme/issues/29) | Feature (WS2): Data dictionary as a web annex in the knowledge graph |
| [#30](https://github.com/litlfred/aai-programme/issues/30) | Feature (WS2): Process catalogues: clinical, public health and health system |
| [#31](https://github.com/litlfred/aai-programme/issues/31) | Feature (WS2): Skills and processes for ontologists and terminologists |
| [#32](https://github.com/litlfred/aai-programme/issues/32) | Feature (WS2): Review large documents such as a DAK |
| [#33](https://github.com/litlfred/aai-programme/issues/33) | Feature (WS3): Outcome evaluation of runs across models |
| [#34](https://github.com/litlfred/aai-programme/issues/34) | Feature (WS3): Test data for SME review of decision support and indicators |
| [#35](https://github.com/litlfred/aai-programme/issues/35) | Feature (WS3): Fixed and generated test data sets |
| [#36](https://github.com/litlfred/aai-programme/issues/36) | Feature (WS3): Experiment: a run forced along its process versus one that manages it |
| [#37](https://github.com/litlfred/aai-programme/issues/37) | Feature (WS4): Author the 36 translation catalogues |
| [#38](https://github.com/litlfred/aai-programme/issues/38) | Feature (WS4): Adjudicate the 68 round-trip translation findings |
| [#39](https://github.com/litlfred/aai-programme/issues/39) | Feature (Platform): Deployment topologies and operating modes |
| [#40](https://github.com/litlfred/aai-programme/issues/40) | Feature (Platform): Agent-run publishing for the SMART IG repositories |
| [#41](https://github.com/litlfred/aai-programme/issues/41) | Feature (Platform): Render SMART IG pages with the site's own theme |
| [#42](https://github.com/litlfred/aai-programme/issues/42) | Feature (Platform): Tool contracts as published JSON Schema (the MCP surface) |
| [#43](https://github.com/litlfred/aai-programme/issues/43) | Feature (Platform): Named, versioned tool releases with provenance |
| [#44](https://github.com/litlfred/aai-programme/issues/44) | Feature (Platform): Publish the knowledge graph with a complete JSON-LD context |
| [#45](https://github.com/litlfred/aai-programme/issues/45) | DEC-B1: Which CDN, if any, serves the WHO L1 corpus |
| [#46](https://github.com/litlfred/aai-programme/issues/46) | DEC-B2: Where SPDX licence identifiers are used |
| [#47](https://github.com/litlfred/aai-programme/issues/47) | DEC-B3: Review the sovereign and self-sovereign deployment proposals |
| [#48](https://github.com/litlfred/aai-programme/issues/48) | D-B1: Fetching IRIS PDFs and FHIR packages that the agents' environment cannot reach |
| [#49](https://github.com/litlfred/aai-programme/issues/49) | D-B2: The DAK Logical Model, pending upstream |

## Risks

- **Duplication across stores**: six open pairs are the same work under two ids (e1lo/d5f1, tk99/hf2q, sthf/o7eq, og5t/kx6i, 1as6/6h47, bbnd/shsz). tk99 overlaps this board's metrics; urat and 8pzh overlap the pilot's table extraction.
- **Beans and issues can drift**: a bean can close while its issue stays open, or the reverse. Without touching the beans' repositories, the only check is reading both, which the beans board could add.
- **Stale work**: 26 epics are marked in progress; the WS3 beans have been idle since September.
- **Long links**: a link longer than 140 characters does not survive being written from an agent session, so those beans are named and linked by their folder.
