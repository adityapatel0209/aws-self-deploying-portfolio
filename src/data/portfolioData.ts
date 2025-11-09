/****
 * Portfolio Data File (CLOUD‑FOCUSED)
 * ✅ No React Components inside this file
 * ✅ Only data exports used by UI components
 */

import awsPortfolioImage from '../assets/projects/aws-portfolio.png';

export const skillsData = {
  technicalSkills: [
    { name: 'AWS', level: 85 },
    { name: 'Linux', level: 85 },
    { name: 'Docker', level: 80 },
    { name: 'Terraform', level: 75 },
    { name: 'CI/CD (GitHub Actions)', level: 80 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'React.js', level: 80 }
  ],
  toolsAndTech: [
    { name: 'Cloud (AWS)', skills: ['AWS', 'EC2', 'S3', 'RDS', 'VPC', 'IAM', 'Lambda', 'API Gateway', 'CloudFront', 'Route 53'] },
    { name: 'DevOps & IaC', skills: ['Linux', 'Docker', 'Terraform', 'GitHub Actions', 'Nginx'] },
    { name: 'Monitoring', skills: ['CloudWatch', 'Prometheus', 'Grafana'] },
    { name: 'Backend & APIs', skills: ['Node.js', 'Express.js', 'REST APIs'] },
    { name: 'Frontend', skills: ['React.js', 'Next.js', 'TypeScript'] },
    { name: 'Scripting & Version Control', skills: ['Bash', 'Git', 'GitHub'] }
  ]
};

export const projectsData = [
  
  {
    id: 101,
    title: 'Cloud & DevOps Portfolio (awsadi.com)',
    description: 'This live site showcases AWS-first delivery: S3 origin locked behind CloudFront, ACM TLS, Route 53 DNS, and automated deployments via the AWS CLI. Read the architecture guide linked below.',
    technologies: ['CloudFront', 'S3', 'ACM', 'Route 53', 'Vite'],
    image: awsPortfolioImage,
    liveUrl: 'https://awsadi.com',
    notionUrl: 'https://www.notion.so/Deploying-a-Static-Portfolio-Website-on-AWS-S3-CloudFront-Route53-209e986535d78068a97bdbfdedc7f935?source=copy_link'
  }
];

export const certificationsData = [
  {
    id: 'aws-clf',
    title: 'AWS Certified Cloud Practitioner (CLF‑C02)',
    issuer: 'Amazon Web Services',
    date: 'October 2024',
    verifyUrl: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/daf2862ac9ec4739bb29c0d3e72c7d1e'
  },
  {
    id: 'aws-saa',
    title: 'AWS Solutions Architect — Associate (SAA‑C03) — In Progress',
    issuer: 'Amazon Web Services',
    date: 'Expected 2025'
  }
];

export const aboutData = {
  paragraphs: [
    'Cloud & DevOps engineer focused on AWS — building secure, scalable, automated infrastructure.',
    'I work with VPCs, EC2, RDS, CloudFront, IAM, and CI/CD pipelines using Terraform and GitHub Actions.',
    'Passionate about automation, observability, and high‑availability architectures.'
  ],
  tags: [
    'AWS | Linux | Terraform',
    'Docker & CI/CD',
    'Networking & Security',
    'CloudWatch & Monitoring'
  ]
};

export const educationData = {
  formal: [
    {
      institution: 'Niagara College Canada',
      degree: 'Diploma in Computer Programming',
      period: 'Sept 2023 – Mar 2025',
      description: 'Honours-level program with hands-on focus on software development, web authoring, databases, scripting, and network security.',
      gpa: '80% (Honours)',
      highlights: [
        'President’s Honour Roll – Fall 2023',
        'Winner — Inclusive Communities Hackathon'
      ],
      keyCourses: [
        'Software Development (98%)',
        'Web Authoring (99%)',
        'Database Essentials (92%)',
        'Scripting (89%)',
        'Network Security (90%)'
      ]
    }
  ],
  certifications: certificationsData
};