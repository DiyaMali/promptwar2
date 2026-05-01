import type { RoleId, ScenarioJSON } from '../types/voteflow.types';

type ScenarioBank = Record<RoleId, ScenarioJSON[]>;

export const LOCAL_SCENARIOS: ScenarioBank = {
  voter: [
    {
      scenario: "You've just turned 18 and want to vote in the upcoming election. The registration deadline is in 3 days. You can register online, but you'll need to provide your Social Security number. Alternatively, you can register in person at the county office, which closes at 4:30 PM — right when your shift ends.",
      choice_a: "Register online now using your SSN — it's faster and guaranteed before the deadline.",
      choice_b: "Take a half-day off work to register in person at the county office.",
      civic_fact: "In many states, online voter registration requires a valid driver's license or state ID number to match DMV records.",
      consequence_preview: "Your registration method may affect how quickly your eligibility is confirmed.",
      deltas: { trust: 1, speed: 2, accuracy: 1, trustB: 2, speedB: -1, accuracyB: 2 }
    },
    {
      scenario: "A local nonprofit is hosting a 'meet the candidates' forum, but it's the same evening as your friend's birthday party. You've also seen a viral social media post claiming one candidate has a criminal record — but you're not sure if it's true.",
      choice_a: "Skip the party, attend the candidate forum, and ask about the criminal record claim directly.",
      choice_b: "Go to the party but spend time researching the candidates online using official sources.",
      civic_fact: "Candidate forums organized by nonpartisan groups like the League of Women Voters are one of the most reliable ways to evaluate candidates.",
      consequence_preview: "How you research candidates shapes whether you vote on facts or misinformation.",
      deltas: { trust: 2, speed: -1, accuracy: 2, trustB: 1, speedB: 1, accuracyB: 1 }
    },
    {
      scenario: "Early voting has started. The nearest early voting location is 20 minutes away and has short lines. However, your mail-in ballot just arrived. You've heard news reports about mail-in ballots being rejected for signature mismatches.",
      choice_a: "Vote early in person — you'll know your vote counted immediately.",
      choice_b: "Fill out the mail-in ballot carefully and drop it at the official drop box.",
      civic_fact: "Early voting can reduce Election Day congestion by up to 30%, making the process smoother for everyone.",
      consequence_preview: "Each method has trade-offs between convenience and certainty.",
      deltas: { trust: 1, speed: 2, accuracy: 1, trustB: 1, speedB: 1, accuracyB: 2 }
    },
    {
      scenario: "It's Election Day morning. You check social media and see posts claiming your polling place has moved. The official election website shows no change, but a neighbor confirms they received a text about the 'new location.' You need to leave in 30 minutes.",
      choice_a: "Trust the official election website and go to your assigned polling place.",
      choice_b: "Call the county election office to verify before heading out.",
      civic_fact: "Voter suppression tactics often include spreading false information about polling locations, hours, or ID requirements.",
      consequence_preview: "Misinformation can cost you your vote if you go to the wrong place.",
      deltas: { trust: 2, speed: 1, accuracy: 2, trustB: 2, speedB: -1, accuracyB: 2 }
    },
    {
      scenario: "You arrive at the polls and there's a 90-minute line. A poll worker says the voting machines are running slowly. A man outside is handing out sample ballots with party recommendations. Your boss texts asking when you'll be at work.",
      choice_a: "Stay in line and ignore the sample ballots — make your own choices in the booth.",
      choice_b: "Take the sample ballot for reference, but tell your boss you're exercising your legal right to vote.",
      civic_fact: "Most states have laws protecting employees' right to take time off to vote, though requirements vary.",
      consequence_preview: "Patience at the polls directly impacts whether your voice is heard.",
      deltas: { trust: 2, speed: -1, accuracy: 1, trustB: 1, speedB: 1, accuracyB: 0 }
    },
    {
      scenario: "You're finally in the voting booth. The ballot has 12 races, 3 ballot measures, and 2 judicial retentions. You researched the top races, but you're unfamiliar with the county soil and water conservation board candidates. Time pressure is real — people are waiting.",
      choice_a: "Only vote on races you researched — leave unfamiliar ones blank.",
      choice_b: "Vote on every race, using your best judgment for the unfamiliar ones.",
      civic_fact: "Undervoting — leaving some races blank — is perfectly legal and common. About 20% of voters skip down-ballot races.",
      consequence_preview: "Voting uninformed vs. not voting at all — both have democratic consequences.",
      deltas: { trust: 1, speed: 1, accuracy: 2, trustB: 0, speedB: 2, accuracyB: -1 }
    },
    {
      scenario: "The election is over. Your preferred candidate lost by 847 votes out of 200,000 cast. A recount has been requested. Some friends are sharing conspiracy theories about rigged machines on social media. Others are organizing to volunteer as poll watchers for next election.",
      choice_a: "Wait for the official recount results and consider becoming a poll watcher next time.",
      choice_b: "Share your frustration publicly and call for an investigation into voting irregularities.",
      civic_fact: "Recounts rarely change the outcome of an election — the average recount shifts results by only about 300 votes.",
      consequence_preview: "How you respond to a loss shapes your community's trust in democracy.",
      deltas: { trust: 2, speed: 0, accuracy: 1, trustB: -1, speedB: 1, accuracyB: -1 }
    }
  ],

  candidate: [
    {
      scenario: "You're launching your campaign for city council. You have $5,000 in savings and a small group of volunteers. A local business owner offers $10,000 but expects you to support rezoning his property for a shopping mall — which would displace 30 families.",
      choice_a: "Decline the donation and launch a grassroots fundraising campaign online.",
      choice_b: "Accept the donation but make no promises about the rezoning vote.",
      civic_fact: "Campaign finance laws require all donations over $200 to be publicly disclosed in federal elections.",
      consequence_preview: "Your first funding decision sets the tone for your entire campaign.",
      deltas: { trust: 2, speed: -1, accuracy: 1, trustB: -1, speedB: 2, accuracyB: 0 }
    },
    {
      scenario: "The first debate is tomorrow. Your opponent has more experience but a record of missed votes. Your campaign manager suggests attacking their attendance record aggressively. Your policy advisor says you should focus entirely on your housing plan.",
      choice_a: "Focus on your policy vision — let voters compare records themselves.",
      choice_b: "Open with the attendance record attack, then pivot to your own policies.",
      civic_fact: "Studies show that negative campaigning can increase voter turnout but also increases voter cynicism about politics overall.",
      consequence_preview: "Debate strategy reveals what kind of leader you'll be.",
      deltas: { trust: 2, speed: 0, accuracy: 1, trustB: 0, speedB: 1, accuracyB: 1 }
    },
    {
      scenario: "A major donor threatens to pull funding unless you oppose the new public transit plan. Your internal polling shows 60% of your district supports the transit plan. The donor's PAC spent $50,000 on your campaign ads last month.",
      choice_a: "Support the transit plan publicly — your voters want it, and you ran on representing them.",
      choice_b: "Stay vague on transit until after the election to avoid losing the donor.",
      civic_fact: "Super PACs can spend unlimited amounts on elections but cannot coordinate directly with candidates.",
      consequence_preview: "Money vs. mandate — every candidate faces this tension.",
      deltas: { trust: 2, speed: -1, accuracy: 1, trustB: -1, speedB: 2, accuracyB: -1 }
    },
    {
      scenario: "A photo surfaces online showing you at a college party 15 years ago. It's harmless, but a rival PAC is framing it as evidence of 'poor judgment.' The story is trending locally. Your campaign team is split — half say ignore it, half say get ahead of it.",
      choice_a: "Address it head-on with humor and transparency in a social media video.",
      choice_b: "Ignore it completely and redirect attention to your policy announcements.",
      civic_fact: "Opposition research is a standard practice — campaigns typically spend 5-10% of their budget investigating opponents.",
      consequence_preview: "How you handle adversity defines your public image.",
      deltas: { trust: 1, speed: 2, accuracy: 0, trustB: 0, speedB: 2, accuracyB: 1 }
    },
    {
      scenario: "It's the final week. You're 3 points behind in polls. Your team proposes a door-to-door blitz in swing precincts, but a celebrity endorsement opportunity requires you to fly to a national TV appearance instead.",
      choice_a: "Stay local — knock on doors in the neighborhoods that matter most.",
      choice_b: "Take the TV appearance — the exposure could swing undecided voters district-wide.",
      civic_fact: "Get Out The Vote (GOTV) door-knocking increases voter turnout by an average of 2.5 percentage points in targeted areas.",
      consequence_preview: "Local hustle vs. national spotlight — there's no guaranteed winner.",
      deltas: { trust: 2, speed: 1, accuracy: 0, trustB: 0, speedB: 1, accuracyB: 1 }
    },
    {
      scenario: "It's election night. Early returns show you're behind by 2%, but mail-in ballots haven't been counted. Your campaign manager wants to declare 'we're confident in victory' to the crowd. Your opponent has already given a victory speech to their supporters.",
      choice_a: "Wait for all votes to be counted before making any statement.",
      choice_b: "Give a cautiously optimistic speech to keep your supporters' spirits up.",
      civic_fact: "Election night results are unofficial. Final certified results can take days or weeks depending on the jurisdiction.",
      consequence_preview: "Premature claims can undermine public trust in the process.",
      deltas: { trust: 2, speed: -1, accuracy: 2, trustB: 0, speedB: 2, accuracyB: -1 }
    },
    {
      scenario: "You lost by 1,200 votes. Your supporters are devastated and some are questioning the count. You could request a recount (you're within the margin), or you could concede gracefully and endorse the winner for the good of the community.",
      choice_a: "Concede gracefully, thank your supporters, and pledge to work with the winner.",
      choice_b: "Request the recount — every vote matters, and your supporters deserve it.",
      civic_fact: "Concession speeches have no legal effect — they are a democratic norm that signals respect for the process.",
      consequence_preview: "Your final act as a candidate defines your political legacy.",
      deltas: { trust: 2, speed: 1, accuracy: 1, trustB: 1, speedB: -1, accuracyB: 2 }
    }
  ],

  officer: [
    {
      scenario: "You're the county election director. Federal law requires you to maintain accurate voter rolls. A state audit found 3,200 names of people who may have moved or died. The election is in 6 weeks. Purging names too aggressively could disenfranchise legitimate voters.",
      choice_a: "Send verification postcards to all 3,200 — only remove those who don't respond AND don't vote in the next two elections.",
      choice_b: "Cross-reference with USPS change-of-address data and remove confirmed movers immediately.",
      civic_fact: "The National Voter Registration Act requires states to maintain accurate voter rolls but prohibits removing voters within 90 days of a federal election.",
      consequence_preview: "Accuracy vs. access — the core tension of voter roll maintenance.",
      deltas: { trust: 2, speed: -1, accuracy: 2, trustB: 0, speedB: 2, accuracyB: 1 }
    },
    {
      scenario: "During pre-election testing, one of your 45 voting machines fails the logic and accuracy test. It's miscounting votes in a specific race. You have no spare machines. The vendor says they can fix it in 48 hours, but the election is in 72 hours.",
      choice_a: "Pull the machine entirely and redistribute voters to other precincts — even if it means longer lines.",
      choice_b: "Let the vendor attempt the fix, but prepare paper backup ballots for that precinct.",
      civic_fact: "Every voting machine must pass Logic and Accuracy testing before an election to ensure it correctly records and tallies votes.",
      consequence_preview: "A single malfunctioning machine can undermine trust in thousands of votes.",
      deltas: { trust: 1, speed: -1, accuracy: 2, trustB: 1, speedB: 1, accuracyB: 1 }
    },
    {
      scenario: "You need 200 poll workers but only 140 have signed up. The training session is this Saturday. A local church offers to recruit 80 volunteers from their congregation, but they're predominantly from one political party. A community college offers students but they'd need extra training.",
      choice_a: "Recruit the students and provide extra training — bipartisan representation matters.",
      choice_b: "Accept the church volunteers to hit your numbers — you can pair them with members of the other party.",
      civic_fact: "Poll workers are typically required to represent both major parties at each polling location to ensure bipartisan oversight.",
      consequence_preview: "Who runs the polls shapes public perception of election fairness.",
      deltas: { trust: 2, speed: -1, accuracy: 1, trustB: 0, speedB: 2, accuracyB: 0 }
    },
    {
      scenario: "Early voting starts Monday. A disability rights group reports that 3 of your 12 early voting locations are not wheelchair accessible. Fixing them requires construction that takes 5 days. You can redirect affected voters to accessible locations nearby.",
      choice_a: "Close the 3 inaccessible locations and add extended hours at the accessible ones nearby.",
      choice_b: "Keep all locations open but provide curbside voting assistance at the inaccessible ones.",
      civic_fact: "The Americans with Disabilities Act requires all polling places to be accessible to voters with disabilities.",
      consequence_preview: "Accessibility isn't optional — it's a legal and moral obligation.",
      deltas: { trust: 1, speed: 1, accuracy: 1, trustB: 2, speedB: 0, accuracyB: 1 }
    },
    {
      scenario: "It's 7 AM on Election Day. Three poll workers didn't show up at the busiest precinct. The line is already around the building. A local TV crew is filming frustrated voters. Your office phone is ringing with complaints from both campaigns.",
      choice_a: "Personally go to the precinct, deploy backup staff, and give a brief statement to the media.",
      choice_b: "Send backup staff remotely and issue a public statement via social media explaining the situation.",
      civic_fact: "Long wait times at polls disproportionately affect minority and low-income communities, who are less likely to have flexible work schedules.",
      consequence_preview: "Your crisis response is being watched by the entire county.",
      deltas: { trust: 2, speed: 1, accuracy: 0, trustB: 1, speedB: 2, accuracyB: 0 }
    },
    {
      scenario: "Polls closed at 8 PM. At 8:15 PM, a poll worker discovers a sealed ballot box that wasn't fed through the tabulator. It contains approximately 300 ballots from a precinct where the margin is currently 150 votes. Chain of custody logs show the box was properly sealed.",
      choice_a: "Process the ballots through the tabulator now with bipartisan observers present, documenting everything.",
      choice_b: "Secure the box and schedule processing for tomorrow morning with full media transparency.",
      civic_fact: "Chain of custody protocols — seals, logs, bipartisan handling — are the backbone of ballot security.",
      consequence_preview: "Every ballot deserves to be counted. The question is when and how.",
      deltas: { trust: 1, speed: 2, accuracy: 2, trustB: 2, speedB: -1, accuracyB: 2 }
    },
    {
      scenario: "The unofficial results are in. The margin in the top race is 0.3% — within the automatic recount threshold. One campaign is demanding an immediate hand recount. The other is calling the results 'clear and decisive.' You need to certify within 10 days.",
      choice_a: "Initiate the automatic recount immediately per state law, issuing a calm public statement.",
      choice_b: "Complete the canvass first, then begin the recount — accuracy over speed.",
      civic_fact: "Risk-limiting audits use statistical sampling to provide strong evidence that the reported outcome matches the actual votes.",
      consequence_preview: "Certification is the final step — it must be unimpeachable.",
      deltas: { trust: 2, speed: -1, accuracy: 2, trustB: 1, speedB: 1, accuracyB: 2 }
    }
  ],

  journalist: [
    {
      scenario: "Your editor wants a 'horse race' story — who's up, who's down in the polls. But you've been investigating a genuine policy story about how the leading candidate's tax plan would affect local schools. The poll story will get 10x more clicks.",
      choice_a: "Pitch the policy story — readers need substance, not just entertainment.",
      choice_b: "Write the poll story first to meet your editor's deadline, then work on the investigation.",
      civic_fact: "Studies show that horse-race coverage of elections can reduce voters' sense of political efficacy and increase cynicism.",
      consequence_preview: "What you choose to cover shapes what voters think about.",
      deltas: { trust: 2, speed: -1, accuracy: 2, trustB: 0, speedB: 2, accuracyB: 0 }
    },
    {
      scenario: "An anonymous source inside one of the campaigns sends you documents showing the candidate misused campaign funds. The documents look authentic but you can't verify them independently. The source demands you publish within 24 hours or they'll go to a competitor.",
      choice_a: "Tell the source you need more time to verify — you won't publish unconfirmed claims.",
      choice_b: "Report that 'documents have surfaced' with appropriate caveats while continuing to investigate.",
      civic_fact: "The SPJ Code of Ethics states journalists should verify information before releasing it and use special care when dealing with anonymous sources.",
      consequence_preview: "Speed vs. accuracy — the eternal journalism dilemma.",
      deltas: { trust: 2, speed: -1, accuracy: 2, trustB: 0, speedB: 2, accuracyB: -1 }
    },
    {
      scenario: "A video goes viral showing a poll worker appearing to throw away ballots. You watch it carefully — it looks like they're discarding the privacy sleeves, not actual ballots. But the video already has 2 million views and your newsroom is getting flooded with calls.",
      choice_a: "Contact the election office, get the full context, then publish a fact-check debunking the video.",
      choice_b: "Report on the viral video's spread as a news story while noting the unverified nature of the claims.",
      civic_fact: "Misinformation about elections spreads 6x faster on social media than factual corrections, according to MIT research.",
      consequence_preview: "Your reporting can either fuel panic or restore clarity.",
      deltas: { trust: 2, speed: -1, accuracy: 2, trustB: 1, speedB: 2, accuracyB: 0 }
    },
    {
      scenario: "During debate coverage, your station's political commentator makes an on-air claim that is factually incorrect about one candidate's voting record. You're the producer. You can correct it live or address it after the broadcast.",
      choice_a: "Issue a live on-air correction immediately — accuracy can't wait.",
      choice_b: "Note it for a post-broadcast correction to avoid embarrassing your colleague on air.",
      civic_fact: "Real-time fact-checking during debates has been shown to increase viewer knowledge but also increases partisan accusations of media bias.",
      consequence_preview: "Correcting errors publicly builds trust; ignoring them erodes it.",
      deltas: { trust: 2, speed: 1, accuracy: 2, trustB: 1, speedB: 1, accuracyB: -1 }
    },
    {
      scenario: "It's election night. Your data team is tracking results. With 40% reporting, one candidate has a strong lead. Your competitor just 'called' the race. Your statistical model says it's too early — remaining precincts lean heavily toward the trailing candidate.",
      choice_a: "Wait for more data — your model says this race isn't decided yet.",
      choice_b: "Report the current numbers with strong caveats that the race is 'too early to call.'",
      civic_fact: "Major news networks use decision desks with statisticians who model remaining votes before making any race calls.",
      consequence_preview: "Being first matters less than being right on election night.",
      deltas: { trust: 2, speed: -1, accuracy: 2, trustB: 1, speedB: 2, accuracyB: 1 }
    },
    {
      scenario: "Your statistical model now shows 95% confidence that Candidate B has won. Your competitor called it for Candidate B 30 minutes ago. Candidate A hasn't conceded and is claiming irregularities without evidence. Your audience is split and emotions are high.",
      choice_a: "Call the race based on your data — 95% confidence meets your threshold.",
      choice_b: "Wait until official results are closer to final before making the call.",
      civic_fact: "The Associated Press has called every presidential race correctly since 1848 using a combination of vote counts and statistical analysis.",
      consequence_preview: "Calling a race is one of the most consequential decisions in journalism.",
      deltas: { trust: 1, speed: 2, accuracy: 1, trustB: 2, speedB: -1, accuracyB: 2 }
    },
    {
      scenario: "The election is over. Your editor wants a 'lessons learned' piece. You could write about how misinformation shaped voter behavior, or you could do a lighter retrospective on campaign moments. You also uncovered evidence during the campaign that a local official may have violated ethics rules.",
      choice_a: "Write the misinformation investigation — it's important for future elections.",
      choice_b: "Pursue the ethics violation story — accountability journalism matters most.",
      civic_fact: "Post-election accountability reporting helps establish the public record and prevents the same mistakes from recurring.",
      consequence_preview: "The stories you tell after the election shape the next one.",
      deltas: { trust: 1, speed: 0, accuracy: 2, trustB: 2, speedB: 0, accuracyB: 1 }
    }
  ]
};
