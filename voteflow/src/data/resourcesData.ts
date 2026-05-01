export interface Resource {
  id: string;
  title: string;
  category: string;
  readTime: string;
  type: 'guide' | 'article';
  description: string;
  content: {
    sections: {
      heading: string;
      text: string;
    }[];
  };
}

export const RESOURCES_DATA: Resource[] = [
  {
    "id": "first-election-guide",
    "title": "Guide to Your First Election",
    "category": "Voting Rights",
    "readTime": "12 min",
    "type": "guide",
    "description": "A complete walkthrough for first-time voters including registration, voting steps, and rights.",
    "content": {
      "sections": [
        {
          "heading": "Introduction",
          "text": "Voting is a fundamental right in a democracy. This guide helps first-time voters understand the process."
        },
        {
          "heading": "Registration",
          "text": "To vote, you must register with your local election authority. Ensure your ID and address proof are valid."
        },
        {
          "heading": "Voting Process",
          "text": "Visit your polling station, verify identity, receive ballot, and cast your vote privately."
        },
        {
          "heading": "Your Rights",
          "text": "You have the right to vote without intimidation, access assistance, and report irregularities."
        },
        {
          "heading": "Tips",
          "text": "Visit during non-peak hours, carry valid ID, and verify your voter status beforehand."
        }
      ]
    }
  },
  {
    "id": "voting-rights-act",
    "title": "Understanding Voting Rights",
    "category": "Election Law",
    "readTime": "10 min",
    "type": "article",
    "description": "Learn about voter rights, protections, and legal safeguards.",
    "content": {
      "sections": [
        {
          "heading": "Overview",
          "text": "Voting rights ensure fair access to elections for all eligible citizens."
        },
        {
          "heading": "Legal Protections",
          "text": "Laws prevent discrimination and ensure accessibility."
        },
        {
          "heading": "Common Issues",
          "text": "Voter suppression, misinformation, and accessibility barriers."
        }
      ]
    }
  },
  {
    "id": "spotting-disinformation",
    "title": "Spotting Disinformation",
    "category": "Media Literacy",
    "readTime": "8 min",
    "type": "guide",
    "description": "Learn how to identify fake news and misleading political content.",
    "content": {
      "sections": [
        {
          "heading": "What is Disinformation?",
          "text": "False information spread intentionally to mislead."
        },
        {
          "heading": "How to Identify",
          "text": "Check sources, verify facts, and avoid emotional manipulation."
        },
        {
          "heading": "Best Practices",
          "text": "Use trusted platforms and fact-checking websites."
        }
      ]
    }
  }
];
