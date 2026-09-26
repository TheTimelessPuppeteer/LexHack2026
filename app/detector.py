ALLOWED_RELATIONS = {
    "consistent",
    "supplemental",
    "exception",
    "potential_conflict",
    "insufficient_information"
}

def analyze_rules(rule_a: str, rule_b: str):
    return {
        "rules": [
            {
                "source": "Rule A",
                "text": rule_a
            },
            {
                "source": "Rule B",
                "text": rule_b
            }
        ],

        "potential_conflicts": [
            {
                "issue": "Possible conflict detected",

                "evidence": [
                    {
                        "source": "Rule A",
                        "quote": rule_a
                    },
                    {
                        "source": "Rule B",
                        "quote": rule_b
                    }
                ],

                "explanation": "These two rules may require further comparison.",

                "confidence": "medium"
            }
        ],

        "consequences": [
            "Further verification is required."
        ],

        "questions_to_verify": [
            "Which authority issued Rule A?",
            "Which authority issued Rule B?",
            "Which rule has higher authority?"
        ]
    }