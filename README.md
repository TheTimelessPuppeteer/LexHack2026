# RuleTrace

**Compare rules. Trace conflicts. Verify what matters.**

RuleTrace is an evidence-grounded rule comparison tool built for LexHack 2026.

It helps users identify potential conflicts, exceptions, and relationships between rules without pretending to make a final legal determination.

---

## Problem

People are often governed by multiple overlapping rules:

- university regulations
- instructor policies
- competition rules
- organizer clarifications
- workplace policies
- platform terms

When these rules appear to conflict, users may struggle to determine:

- whether the rules are actually inconsistent,
- which parts of the text create the conflict,
- what practical consequences may follow,
- and what additional information still needs to be verified.

Traditional search or summarization tools can help users find or understand individual rules, but they do not necessarily explain the relationship between them.

---

## Solution

RuleTrace compares two rules and classifies their relationship as:

- `consistent`
- `supplemental`
- `exception`
- `potential_conflict`
- `insufficient_information`

For every analysis, RuleTrace provides:

- a concise summary,
- evidence quoted directly from the supplied rules,
- potential consequences supported by the text,
- and questions that still require verification.

RuleTrace is designed to support issue spotting and rule navigation, not to provide final legal judgments.

---

## How It Works

```text
Rule A + Rule B
        ↓
FastAPI Backend
        ↓
Rule Analysis Engine
        ↓
OpenAI Structured Output
        ↓
Relation Classification
        ↓
Evidence + Consequences + Questions to Verify
        ↓
RuleTrace Interface