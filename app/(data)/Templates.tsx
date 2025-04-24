export default [
 {
    name: "Blog Title",
    description:
      "An AI tool that generates compelling blog titles based on your blog niche.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4186/4186534.png",
    aiPrompt:
      "Based on the provided blog niche, generate 5 compelling and creative blog titles that are attention-grabbing and relevant to the niche. Format the titles in a rich text editor format, using bullet points.",
    slug: "generate-blog-title",
    premium: false,
    form: [
      {
        label: "🤖 Enter your Blog Niche",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Auto InstaPost",
    description: "An AI tool that generates images and automatically posts them to Instagram based on your content niche.",    
    category: "Post",
    icon: "https://cdn-icons-png.flaticon.com/128/2111/2111463.png",
    aiPrompt:
      "",
    slug: "generate-image-content",
    premium: false,
    form: [
      {
        label: "Generate image which you can automatically Post",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
    outputType: "image"
  },
  {
    name: "Blog Content",
    description:
      "An AI tool that crafts engaging blog content tailored to your chosen language and outline.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/6114/6114045.png",
    slug: "generate-blog-content",
    premium: false,
    aiPrompt:
      "Using the given blog title and outline, generate engaging and well-structured blog content. Ensure the content is relevant, informative, and formatted for easy reading in a rich text editor format.",
    form: [
      {
        label: "🤖 Enter your Blog Title",
        field: "input",
        name: "title",
        required: true,
      },
      {
        label: "🤖 Enter blog Outline here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Code Documentation Generator",
    description: "An AI tool that generates comprehensive code documentation from your source code.",
    icon: "https://cdn-icons-png.flaticon.com/128/3271/3271343.png",
    category: "Coding",
    slug: "code-documentation-generator",
    premium: true,
    aiPrompt: "Generate detailed and accurate documentation based on the provided source code. Ensure the documentation includes descriptions of functions, classes, and methods, and is formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Source Code",
        field: "textarea",
        name: "sourceCode",
        required: true
      }
    ]
  },
  {
    name: "Write Code",
    description: "An AI tool that generates code in any programming language based on your requirements.",
    icon: "https://cdn-icons-png.flaticon.com/128/6062/6062646.png",
    category: "Coding",
    premium: false,
    slug: "write-code",
    aiPrompt:
      "Generate a well-structured and efficient code snippet based on the provided description and programming language. Include comments where necessary and format the output in a code block within a rich text editor format.",
    form: [
      {
        label: "🤖 Enter description of code you want along with Programming Language",
        field: "textarea",
        name: "codeDesscripton",
        required: true,
      },
    ],
  },
  {
    name: "Explain Code",
    description: "An AI tool that explains code line-by-line to help you understand complex programming.",
    icon: "https://cdn-icons-png.flaticon.com/128/8488/8488751.png",
    category: "Coding",
    premium: false,
    slug: "explain-code",
    aiPrompt:
      "Provide a detailed line-by-line explanation of the provided code. Clarify complex logic and ensure the explanation is clear and easy to understand, formatted in a code block within a rich text editor.",
    form: [
      {
        label: "🤖 Enter code which you want to Understand",
        field: "textarea",
        name: "codeDesscripton",
        required: true,
      },
    ],
  },
  {
    name: "Code Bug Detector",
    description:
      "An AI tool that identifies and suggests solutions for bugs in your code.",
    icon: "https://cdn-icons-png.flaticon.com/128/4426/4426267.png",
    category: "Coding",
    premium: true,
    slug: "code-bug-detector",
    aiPrompt:
      "Analyze the provided code for bugs, identify issues, and suggest effective solutions. Provide detailed explanations of the fixes, formatted in a code block within a rich text editor.",
    form: [
      {
        label: "🤖 Enter code which you want to Test Bug",
        field: "textarea",
        name: "codeInput",
        required: true,
      },
    ],
  },
  {
    name: "Dockerfile Generator",
    description: "An AI tool that generates optimized Dockerfiles based on your application requirements.",
    icon: "https://cdn-icons-png.flaticon.com/128/919/919853.png",
    category: "Coding",
    slug: "dockerfile-generator",
    premium: true,
    aiPrompt: "Generate an optimized Dockerfile based on the provided application requirements and environment details. Ensure the Dockerfile follows best practices and is formatted for rich text editors.",
    form: [
      {
        label: "🤖 Describe Application Requirements",
        field: "textarea",
        name: "appRequirements",
        required: true
      }
    ]
  },
  {
    name: "Regex Pattern Generator",
    description: "An AI tool that generates regular expressions based on your text pattern requirements.",
    icon: "https://cdn-icons-png.flaticon.com/128/14200/14200558.png",
    category: "Coding",
    slug: "regex-pattern-generator",
    premium: false,
    aiPrompt: "Generate a regular expression pattern based on the provided text pattern description. Ensure the regex is optimized and formatted for rich text editors.",
    form: [
      {
        label: "🤖 Describe the Text Pattern",
        field: "textarea",
        name: "patternDescription",
        required: true
      }
    ]
  },
  {
    name: "SQL Query Generator",
    description: "An AI tool that generates SQL queries based on natural language descriptions.",
    icon: "https://cdn-icons-png.flaticon.com/128/4492/4492311.png",
    category: "Coding",
    slug: "sql-query-generator",
    premium: false,
    aiPrompt: "Generate an SQL query based on the provided natural language description. Ensure the query is optimized, follows best practices, and is formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Natural Language Description",
        field: "textarea",
        name: "description",
        required: true
      },
      {
        label: "🤖 Specify the Database/Table Name (Optional)",
        field: "input",
        name: "tableName",
        required: false
      }
    ]
  },
  {
    name: "SQL Query Optimizer",
    description: "An AI tool that optimizes your SQL queries for better performance.",
    icon: "https://cdn-icons-png.flaticon.com/128/9517/9517791.png",
    category: "Database",
    slug: "sql-query-optimizer",
    premium: true,
    aiPrompt: "Optimize the provided SQL query for better performance. Ensure the optimized query maintains the same functionality and is formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter SQL Query",
        field: "textarea",
        name: "sqlQuery",
        required: true
      }
    ]
  },
  {
    name: "Test Case Generator",
    description: "An AI tool that generates comprehensive test cases based on your code or requirements.",
    icon: "https://cdn-icons-png.flaticon.com/128/10492/10492963.png",
    category: "Testing",
    slug: "test-case-generator",
    premium: true,
    aiPrompt: "Generate detailed test cases based on the provided code or requirements. Ensure the test cases cover various scenarios and edge cases, and are formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Code/Requirements",
        field: "textarea",
        name: "requirements",
        required: true
      }
    ]
  },
  {
    name: "API Mock Data Generator",
    description: "An AI tool that generates realistic mock data for API testing.",
    icon: "https://cdn-icons-png.flaticon.com/128/8297/8297437.png",
    category: "API Testing",
    slug: "api-mock-data-generator",
    premium: false,
    aiPrompt: "Generate realistic mock data based on the provided API schema or data model. Format the output for easy integration into API tests.",
    form: [
      {
        label: "🤖 Enter API Schema/Data Model",
        field: "textarea",
        name: "apiSchema",
        required: true
      }
    ]
  },
  {
    name: "Facebook Ad Copy Generator",
    description: "An AI tool that creates persuasive ad copy for Facebook ads.",
    icon: "https://cdn-icons-png.flaticon.com/128/3712/3712605.png",
    category: "Facebook",
    slug: "facebook-ad-copy-generator",
    premium: false,
    aiPrompt: "Generate persuasive and high-converting Facebook ad copy based on the provided product or service details. Ensure the copy is concise, impactful, and formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Product/Service Details",
        field: "textarea",
        name: "productDetails",
        required: true
      }
    ]
  },
  {
    name: "Instagram Hash Tag Generator",
    description:
      "An AI tool that creates effective hashtags for your Instagram posts to boost engagement.",
    icon: "https://cdn-icons-png.flaticon.com/128/3437/3437343.png",
    category: "Instagram",
    slug: "instagram-hash-tag-generator",
    premium: false,
    aiPrompt:
      "Create 15 effective and trending Instagram hashtags based on the provided keywords. Ensure the hashtags are relevant and optimize them for maximum engagement, formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Keywords for your Instagram Hastag",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post/Reel Idea",
    description:
      "An AI tool that suggests new and trending Instagram post or reel ideas based on your niche.",
    icon: "https://cdn-icons-png.flaticon.com/128/15713/15713420.png",
    category: "Instagram",

    slug: "instagram-post-idea-generator",
    premium: false,
    aiPrompt:
      "Generate 5-10 innovative and trending Instagram post or reel ideas based on the given niche. Incorporate the latest social media trends, and format the ideas for rich text editors.",
    form: [
      {
        label: "🤖 Enter Keywords/Niche for your Instagram Idea",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "LinkedIn Profile Optimizer",
    description: "An AI tool that optimizes LinkedIn profiles for better visibility and networking.",
    icon: "https://cdn-icons-png.flaticon.com/128/3536/3536505.png",
    category: "LinkedIn",
    slug: "linkedin-profile-optimizer",
    premium: true,
    aiPrompt: "Enhance the provided LinkedIn profile by optimizing the headline, summary, and job descriptions for better visibility and networking. Format the output in a rich text editor format.",
    form: [
      {
        label: "🤖 Enter LinkedIn Profile Details",
        field: "textarea",
        name: "profileDetails",
        required: true
      }
    ]
  },
  {
    name: "Rewrite Article (Plagiarism Free)",
    description:
      "An AI tool that rewrites articles to make them plagiarism-free while bypassing AI detectors.",
    icon: "https://cdn-icons-png.flaticon.com/128/3131/3131607.png",
    category: "Writing Assistant",
    slug: "rewrite-article",
    premium: false,
    aiPrompt:
      "Rewrite the provided article or blog post to ensure it is plagiarism-free and bypasses AI detection tools. Maintain the original meaning and format the output in a rich text editor format.",
    form: [
      {
        label:
          "🤖 Provide your Article/Blogpost or any other content to rewrite.",
        field: "textarea",
        name: "article",
        required: true,
      },
    ],
  },
  {
    name: "English Grammer Check",
    description:
      "An AI tool that corrects grammar mistakes in your English text for polished writing.",
    icon: "https://cdn-icons-png.flaticon.com/128/12596/12596700.png",
    category: "Writing Assistant",
    premium: false,
    slug: "english-grammer-checker",
    aiPrompt:
      "Correct the grammar in the provided English text, ensuring it is free of errors and flows smoothly. Present the revised text in a polished and professional manner, formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter text to correct the Grammar",
        field: "input",
        name: "inputText",
        required: true,
      },
    ],
  },
  {
    name: "Add Emojis to Text",
    description:
      "An AI tool that adds emojis to your text, making it more engaging and expressive.",
    icon: "https://cdn-icons-png.flaticon.com/128/2584/2584602.png",
    category: "Writing Assistant",
    slug: "add-emoji-to-text",
    premium: false,
    aiPrompt:
      "Integrate relevant and expressive emojis into the provided text. Maintain the text's original meaning while making it more engaging. Format the output for rich text editors.",
    form: [
      {
        label: "🤖 Enter your text to add Emojis",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Podcast Script Generator",
    description: "An AI tool that generates engaging podcast scripts based on your chosen topics.",
    icon: "https://cdn-icons-png.flaticon.com/128/831/831299.png",
    category: "Podcast",
    slug: "podcast-script-generator",
    premium: true,
    aiPrompt: "Create an engaging and well-structured podcast script based on the provided topic and outline. Ensure the script is tailored to the intended audience and formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Podcast Topic",
        field: "input",
        name: "topic",
        required: true
      },
      {
        "label": "🤖 Enter Podcast Outline",
        "field": "textarea",
        "name": "outline",
        "required": true
      }
    ]
  },
  {
    name: "Pinterest Pin Description Generator",
    description: "An AI tool that generates catchy and optimized descriptions for Pinterest pins.",
    icon: "https://cdn-icons-png.flaticon.com/128/3536/3536559.png",
    category: "Pinterest",
    slug: "pinterest-pin-description-generator",
    premium: false,
    aiPrompt: "Create catchy and SEO-optimized descriptions for Pinterest pins based on the provided keywords and content. Ensure the descriptions are engaging and formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Keywords/Content for Pin",
        field: "textarea",
        name: "pinContent",
        required: true
      }
    ]
  },
  {
    name: "Quora Answer Generator",
    description: "An AI tool that crafts insightful and detailed answers for Quora questions.",
    icon: "https://cdn-icons-png.flaticon.com/128/3938/3938093.png",
    category: "Quora",
    slug: "quora-answer-generator",
    premium: true,
    "aiPrompt": "Generate a detailed, insightful, and engaging answer for the provided Quora question. Ensure the answer is informative, well-structured, and formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Quora Question",
        field: "input",
        name: "question",
        required: true
      }
    ]
  },
  {
    name: "Reddit Post Generator",
    description: "An AI tool that generates engaging and discussion-provoking Reddit posts.",
    icon: "https://cdn-icons-png.flaticon.com/128/3536/3536761.png",
    category: "Reddit",
    slug: "reddit-post-generator",
    premium: true,
    aiPrompt: "Generate an engaging and discussion-provoking Reddit post based on the provided topic or niche. Ensure the post is formatted for rich text editors and suitable for the target subreddit.",
    form: [
      {
        label: "🤖 Enter Reddit Post Topic/Niche",
        field: "input",
        name: "topic",
        required: true
      }
    ]
  },
  {
    name: "Survey Question Generator",
    description: "An AI tool that creates targeted survey questions to gather valuable feedback.",
    icon: "https://cdn-icons-png.flaticon.com/128/6728/6728483.png",
    category: "Marketing",
    slug: "survey-question-generator",
    premium: false,
    aiPrompt: "Generate 10 targeted and insightful survey questions based on the provided topic or product. Ensure the questions are clear, concise, and designed to gather valuable feedback, formatted for rich text editors.",
    form: [
      {
        label: "🤖 Survey Topic/Product",
        field: "input",
        name: "topic",
        required: true
      }
    ]
  },
  {
    name: "Product Description",
    description:
      "An AI tool that writes compelling product descriptions for your e-commerce business.",
    icon: "https://cdn-icons-png.flaticon.com/128/679/679922.png",
    category: "Marketing",
    premium: false,
    slug: "product-description",
    aiPrompt:
      "Craft a concise and persuasive product description based on the provided product name and details. Ensure the description is SEO-friendly and optimized for e-commerce platforms, formatted for rich text editors.",
    form: [
      {
        label: "🤖 Product Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "🤖 Product Details",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Tagline Generator",
    description:
      "An AI tool that creates catchy taglines for your brand or product.",
    icon: "https://cdn-icons-png.flaticon.com/128/4213/4213199.png",
    category: "Marketing",
    premium: false,
    slug: "tagline-generator",
    aiPrompt:
      "Generate 5-10 catchy and memorable taglines for the provided product or brand. Ensure the taglines are creative and aligned with the product's marketing goals, formatted for rich text editors.",
    form: [
      {
        label: "🤖 Product/Brand Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "🤖 What you are Selling/Marketing",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Workout Routine Generator",
    description: "An AI tool that creates personalized workout routines based on your fitness goals.",
    icon: "https://cdn-icons-png.flaticon.com/128/10580/10580933.png",
    category: "Health & Wellness",
    slug: "workout-routine-generator",
    premium: false,
    aiPrompt: "Create a personalized workout routine based on the provided fitness goals and preferences. Ensure the routine is effective, balanced, and formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter Fitness Goals",
        field: "input",
        name: "fitnessGoals",
        required: true
      },
      {
        label: "🤖 Enter Workout Preferences (e.g., types of exercises)",
        field: "textarea",
        name: "preferences",
        required: false
      }
    ]
  },
  {
    name: "Youtube SEO Title",
    description:
      "An AI tool that creates SEO-optimized YouTube titles for better visibility and ranking.",
    category: "Youtube",
    icon: "https://cdn-icons-png.flaticon.com/128/402/402075.png",
    slug: "youtube-seo-title",
    premium: true,
    aiPrompt:
      "Create 5 high-ranking, SEO-optimized YouTube video titles based on the provided keywords and outline. Ensure the titles are concise, impactful, and formatted in HTML tags for easy integration.",
    form: [
      {
        label: "🤖 Enter your youtube video topic keyowords",
        field: "input",
        name: "keywords",
        required: true,
      },
      {
        label: "🤖 Enter youtube description Outline here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Youtube Description",
    description:
      "An AI tool that generates concise and catchy YouTube descriptions with emojis, tailored to your video topic.",
    category: "Youtube",
    icon: "https://cdn-icons-png.flaticon.com/128/2111/2111748.png",
    slug: "youtube-description",
    premium: false,
    aiPrompt:
      "Craft a catchy and concise YouTube description using the provided topic and outline. Include relevant emojis and keep the description within 4-5 lines, formatted for rich text editors.",
    form: [
      {
        label: "🤖 Enter your blog topic/title",
        field: "input",
        name: "topic",
        required: true,
      },
      {
        label: "🤖 Enter youtube Outline here",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "Youtube Tags",
    description:
      "An AI tool that generates relevant YouTube tags to improve your video’s discoverability.",
    category: "Youtube",
    icon: "https://cdn-icons-png.flaticon.com/128/10884/10884883.png",
    slug: "youtube-tag",
    premium: false,
    aiPrompt:
      "Generate 10 relevant and optimized YouTube tags based on the given video title and outline. Present the tags in bullet points and format them for rich text editors.",
    form: [
      {
        label: "🤖 Enter your youtube title",
        field: "input",
        name: "title",
        required: true,
      },
      {
        label: "🤖 Enter youtube video Outline here (Optional)",
        field: "textarea",
        name: "outline",
      },
    ],
  },
];
