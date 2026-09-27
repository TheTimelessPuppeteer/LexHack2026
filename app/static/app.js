const button =
    document.getElementById("analyze-button");

const ruleA =
    document.getElementById("rule-a");

const ruleB =
    document.getElementById("rule-b");

const results =
    document.getElementById("results");

const statusText =
    document.getElementById("status");


button.addEventListener("click", analyzeRules);


async function analyzeRules() {

    const textA = ruleA.value.trim();
    const textB = ruleB.value.trim();


    if (!textA || !textB) {

        statusText.textContent =
            "Please provide both Rule A and Rule B.";

        return;
    }


    button.disabled = true;

    button.textContent = "Analyzing...";

    statusText.textContent =
        "Comparing rules and tracing evidence...";


    try {

        const response = await fetch(
            "/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    rule_a: textA,
                    rule_b: textB
                })
            }
        );


        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }


        const data = await response.json();


        renderResults(data);


        statusText.textContent = "";


    } catch (error) {

        console.error(error);

        statusText.textContent =
            "Analysis failed. Please try again.";

    } finally {

        button.disabled = false;

        button.textContent = "Analyze Rules";

    }
}


function renderResults(data) {

    results.classList.remove("hidden");


    document.getElementById("relation")
        .textContent =
        data.relation.replaceAll("_", " ");


    document.getElementById("summary")
        .textContent =
        data.summary;


    renderEvidence(data.potential_conflicts);


    renderConsequences(data.consequences);


    renderQuestions(data.questions_to_verify);
}


function renderEvidence(conflicts) {

    const container =
        document.getElementById("evidence");

    container.replaceChildren();


    if (!conflicts || conflicts.length === 0) {

        container.textContent =
            "No potential conflict evidence identified.";

        return;
    }


    for (const conflict of conflicts) {

        const issue =
            document.createElement("p");

        issue.textContent =
            conflict.issue;

        issue.className =
            "source";

        container.appendChild(issue);


        for (const evidence of conflict.evidence) {

            const item =
                document.createElement("div");

            item.className =
                "evidence-item";


            const source =
                document.createElement("div");

            source.className =
                "source";

            source.textContent =
                evidence.source;


            const quote =
                document.createElement("div");

            quote.className =
                "quote";

            quote.textContent =
                `"${evidence.quote}"`;


            item.appendChild(source);

            item.appendChild(quote);

            container.appendChild(item);
        }
    }
}


function renderConsequences(consequences) {

    const container =
        document.getElementById("consequences");

    container.replaceChildren();


    if (!consequences || consequences.length === 0) {

        container.textContent =
        "No direct downstream consequence can be determined from the provided rules.";

        return;
    }


    for (const item of consequences) {

        const element =
            document.createElement("div");

        element.className =
            "list-item";

        element.textContent =
        `${item.consequence} — ${item.basis.join(" + ")}`;

        container.appendChild(element);
    }
}


function renderQuestions(questions) {

    const container =
        document.getElementById("questions");

    container.replaceChildren();


    if (!questions || questions.length === 0) {

        container.textContent =
            "No additional verification questions.";

        return;
    }


    for (const question of questions) {

        const item =
            document.createElement("div");

        item.className =
            "list-item";

        item.textContent =
            `• ${question}`;

        container.appendChild(item);
    }
}