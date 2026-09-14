import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Code2, Server, Layout, Cpu, Database, Cloud, Zap, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

// Official SVG Logos for Shabeeb's Real Engineering Stack
const LOGOS = {
  python: (
    <svg width="34" height="34" viewBox="0 0 256 255">
      <defs>
        <linearGradient id="pyA" x1="13%" y1="-13%" x2="78%" y2="78%">
          <stop offset="0%" stopColor="#387EB8"/>
          <stop offset="100%" stopColor="#366994"/>
        </linearGradient>
        <linearGradient id="pyB" x1="19%" y1="19%" x2="91%" y2="91%">
          <stop offset="0%" stopColor="#FFE052"/>
          <stop offset="100%" stopColor="#FFC331"/>
        </linearGradient>
      </defs>
      <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.455.145 126.77c0 65.325 36.245 63.003 36.245 63.003h21.61v-30.347s-1.168-36.244 35.666-36.244h61.359s33.927.58 33.927-33.348V28.187S191.748.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pyA)"/>
      <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.605 41.486-60.71c0-65.325-36.245-63.003-36.245-63.003h-21.61v30.347s1.168 36.244-35.666 36.244H100.65s-33.927-.58-33.927 33.348v60.747s-2.784 28.114 62.034 28.114zm34.114-19.588a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pyB)"/>
    </svg>
  ),
  django: (
    <svg width="34" height="34" viewBox="0 0 256 256">
      <rect width="256" height="256" rx="48" fill="#092E20"/>
      <path d="M137.4 56h35.8v94.8c0 23.8-13.6 37.2-37.4 37.2-11.4 0-21.4-2.8-27-6.8l6.8-27.4c4.4 3.2 11 5.4 18.2 5.4 11.8 0 17.6-5.8 17.6-18.4V56zm-50.6 44.4v24.2c-3.8-2.2-8.8-3.4-14.8-3.4-13.8 0-21.6 8.8-21.6 22.8 0 13.8 7.6 22.8 21.6 22.8 5.6 0 10.8-1.4 14.8-3.6v23.8c-5.2 2-12.8 3.2-21.2 3.2-27.4 0-44.6-17.6-44.6-45.8 0-28 17.6-45.8 44.6-45.8 8.8 0 16 2.4 21.2 4.8zm31.8-44.4h29.2v94.8c0 14-6 20.8-18.4 20.8-3.6 0-7.2-.4-10.8-1.2v-26.6c2 .4 3.8.6 5.4.6 4.4 0 6.4-2 6.4-7.6V56h-11.8V56z" fill="#FFFFFF"/>
    </svg>
  ),
  postgres: (
    <svg width="34" height="34" viewBox="0 0 256 264">
      <path d="M128 0C68.6 0 20.3 35.8 12.1 89.2c2.8 2 6.1 3.5 9.7 4.1 6.8-24.8 24.9-43.2 54.4-49.8 19.3-4.3 39.5-2.5 58.4 3.9 14.6 5 28.5 13.2 38.8 24.3 11 11.9 18.7 26.6 22.1 42.4 4.5-1.5 9.2-2.5 14-3-3.6-21.5-14.2-41.2-29.8-56.9C162.7 24.5 145.7 13.2 128 0zm61.7 89.3c-2.4 0-4.8.2-7.1.6-1.5 5.5-3.6 10.9-6.3 16-5.8 11.2-13.8 21-23.4 28.9-8.4 6.9-18.1 12.1-28.5 15.4-8.8 2.8-18 4.1-27.2 3.9-10.1-.2-20.1-2.1-29.5-5.7-10.4-4-19.8-10.1-27.4-18.1-1.3-1.4-2.5-2.8-3.6-4.3-3.7 4.7-6 10.6-6.4 16.8 6.5 9.8 15.3 18 25.7 23.9 11.3 6.4 24 10.3 37.1 11.4 12.8 1.1 25.7-.6 37.9-5 13-4.7 24.7-12.4 34.2-22.4 10.3-10.8 18-23.8 22.4-38 1.2-3.8 1.8-7.7 1.8-11.7l-9.7-11.8z" fill="#336791"/>
    </svg>
  ),
  mongodb: (
    <svg width="34" height="34" viewBox="0 0 256 550">
      <path d="M128.5 0C128.5 0 120.3 7 113.8 18.4C87 65.5 32.2 186.2 32.2 277.6C32.2 380 94.6 476.3 124.9 524.2L128.5 530L132.1 524.2C162.4 476.3 224.8 380 224.8 277.6C224.8 186.2 170 65.5 143.2 18.4C136.7 7 128.5 0 128.5 0Z" fill="#13AA52"/>
      <path d="M128.5 0V530C98.2 482.1 35.8 385.8 35.8 283.4C35.8 192 90.6 71.3 117.4 24.2C123.9 12.8 128.5 0 128.5 0Z" fill="#116149"/>
    </svg>
  ),
  react: (
    <svg width="34" height="34" viewBox="0 0 256 228">
      <circle cx="128" cy="114" r="23" fill="#61DAFB"/>
      <ellipse cx="128" cy="114" rx="124" ry="46" fill="none" stroke="#61DAFB" strokeWidth="12"/>
      <ellipse cx="128" cy="114" rx="124" ry="46" fill="none" stroke="#61DAFB" strokeWidth="12" transform="rotate(60 128 114)"/>
      <ellipse cx="128" cy="114" rx="124" ry="46" fill="none" stroke="#61DAFB" strokeWidth="12" transform="rotate(120 128 114)"/>
    </svg>
  ),
  nextjs: (
    <svg width="34" height="34" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r="88" fill="#0a0a0a" stroke="#ffffff" strokeWidth="4"/>
      <path d="M149.5 157.5L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.3z" fill="#ffffff"/>
      <rect fill="#ffffff" height="72" width="12" x="115" y="54"/>
    </svg>
  ),
  nodejs: (
    <svg width="34" height="34" viewBox="0 0 256 289">
      <path d="M128 0L249.2 69.9V209.6L128 279.5L6.8 209.6V69.9L128 0Z" fill="#333333"/>
      <path d="M128 28.5L224.5 84.1V195.4L128 251L31.5 195.4V84.1L128 28.5Z" fill="#539E43"/>
    </svg>
  ),
  fastapi: (
    <svg width="34" height="34" viewBox="0 0 256 256">
      <circle cx="128" cy="128" r="124" fill="#009688"/>
      <path d="M135.5 32L62 144h56l-14 80 82-120h-57l14-72z" fill="#FFFFFF"/>
    </svg>
  ),
  docker: (
    <svg width="34" height="34" viewBox="0 0 256 182">
      <path d="M86 44h26v26H86zm31 0h26v26h-26zm31 0h26v26h-26zm-93 31h26v26H55zm31 0h26v26H86zm31 0h26v26h-26zm31 0h26v26h-26zm31 0h26v26h-26zm-124 31h26v26H24zm31 0h26v26H55zm31 0h26v26H86zm31 0h26v26h-26zm31 0h26v26h-26zm31 0h26v26h-26z" fill="#2496ED"/>
      <path d="M251 106c-3-2-20-13-46-9-1-11-8-22-17-29l-6 6c8 7 13 16 13 27-7 4-22 5-32 3l-4 8c14 3 32 3 41-3 0 0-1 4-3 7-10 14-25 22-44 24-40 4-82 4-118-19l-4 7c39 25 84 25 127 21 21-2 39-11 51-27 15-2 30-10 39-17l-1-2z" fill="#2496ED"/>
    </svg>
  ),
  claude: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="#D97706">
      <path d="M12 2L14.2 9.4L21.6 7.2L16.6 12.8L22 17.5L14.7 16.5L13.8 24L10.2 16.5L2.9 17.5L8.3 12.8L3.3 7.2L10.7 9.4L12 2Z" />
    </svg>
  ),
  chatgpt: (
    <svg width="34" height="34" viewBox="0 0 256 256">
      <path d="M228.3 103.5c-4.7-27.1-26.6-47.8-53.9-50.7-7-19.8-24.8-34.6-46.4-38.3-25.2-4.3-50.6 5.6-65.5 25.5-19.9 2.5-37.1 14.6-46.1 32.7-14.7 29.5-6.6 65.4 19.4 85.8-2.6 10.3-1.6 21.2 3 30.9 9.3 19.6 28.5 32.5 50.1 33.7 14.3 16.3 35.3 24.6 56.7 22.3 26-2.8 47.9-20.9 55.4-45.8 19.8-2.8 36.8-15.1 45.6-33.1 14.3-29.4 6-64.8-18.7-84z" fill="#10A37F"/>
    </svg>
  ),
  typescript: (
    <svg width="34" height="34" viewBox="0 0 256 256">
      <rect width="256" height="256" rx="36" fill="#3178C6"/>
      <path d="M142.2 179.8c5.4 3 12.1 5.3 19.6 5.3 11.2 0 17.6-5.8 17.6-14.4 0-8.4-5.3-12.8-15.6-17.3-16.7-7.1-26.5-16.7-26.5-31.4 0-16.5 13.5-29 34.6-29 9 0 16.5 2.1 21.6 4.9l-4.7 14.4c-4-2.1-9.9-4.1-16.9-4.1-10.4 0-15.9 5.8-15.9 12.8 0 8.1 5.3 12 16.5 17 17.1 7.3 25.8 16.7 25.8 32.2 0 18.2-14.2 30.3-36.8 30.3-10.7 0-19.8-2.6-25.4-5.8l6.1-14.9zm-46.7-65.7H66.2V100h73v14.1h-29.3v85.2H95.5v-85.2z" fill="#FFFFFF"/>
    </svg>
  ),
  tailwind: (
    <svg width="34" height="34" viewBox="0 0 256 154">
      <path d="M128 0C93.9 0 72.5 17.1 64 51.3c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.8 9.6 24.5 17.5C146 62.5 161.4 78.3 192 78.3c34.1 0 55.5-17.1 64-51.3-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.8-9.6-24.5-17.5C174 15.8 158.6 0 128 0zM64 75.6C29.9 75.6 8.5 92.7 0 126.9c12.8-17.1 27.7-23.5 44.8-19.2 9.8 2.5 16.8 9.6 24.5 17.5 12.7 12.9 28.1 28.7 58.7 28.7 34.1 0 55.5-17.1 64-51.3-12.8 17.1-27.7 23.5-44.8 19.2-9.8-2.5-16.8-9.6-24.5-17.5C110 91.4 94.6 75.6 64 75.6z" fill="#06B6D4"/>
    </svg>
  ),
  redis: (
    <svg width="34" height="34" viewBox="0 0 256 218">
      <path d="M128 0L3 57.5l43.2 24.8L128 47.7l81.8 34.6L253 57.5z" fill="#DC382D"/>
      <path d="M3 57.5v89.2l43.2 24.8V82.3z" fill="#A32422"/>
      <path d="M253 57.5v89.2l-43.2 24.8V82.3z" fill="#B92B27"/>
      <path d="M128 107.5L46.2 72.9v89.2l81.8 34.6z" fill="#D82C20"/>
      <path d="M128 107.5l81.8-34.6v89.2L128 196.7z" fill="#E84435"/>
    </svg>
  ),
  git: (
    <svg width="34" height="34" viewBox="0 0 256 256">
      <path d="M246.7 114.8L141.2 9.3c-12.4-12.4-32.4-12.4-44.8 0L76.1 29.6l31.5 31.5c8.8-3 19.1-.9 26 6 7 7 9 17.5 5.8 26.3l30.4 30.4c8.8-3.1 19.3-1.1 26.3 5.8 9.9 9.9 9.9 25.9 0 35.8-9.9 9.9-25.9 9.9-35.8 0-7.3-7.3-9.1-18.2-5.5-27.3l-28.4-28.4v68.7c2.6 1.4 5 3.3 7 5.8 9.9 9.9 9.9 25.9 0 35.8-9.9 9.9-25.9 9.9-35.8 0-9.9-9.9-9.9-25.9 0-35.8 2.6-2.6 5.8-4.5 9.3-5.7V83.6c-3.5-1.2-6.7-3.1-9.3-5.7-7.4-7.4-9.1-18.4-5.3-27.6L6.9 74.9C-2.3 84.1-2.3 99 6.9 108.2l105.5 105.5c12.4 12.4 32.4 12.4 44.8 0l89.5-89.5c12.4-12.4 12.4-32.4 0-44.8v-.2z" fill="#F05032"/>
    </svg>
  ),
  postman: (
    <svg width="34" height="34" viewBox="0 0 256 256">
      <circle cx="128" cy="128" r="124" fill="#FF6C37"/>
      <path d="M198 128c0-38.7-31.3-70-70-70-38.7 0-70 31.3-70 70 0 38.7 31.3 70 70 70 38.7 0 70-31.3 70-70z" fill="#FFFFFF" opacity="0.2"/>
      <path d="M174 128c-12-8-28-15-46-15-18 0-34 7-46 15 12 8 28 15 46 15 18 0 34-7 46-15z" fill="#FFFFFF"/>
    </svg>
  ),
  linux: (
    <svg width="34" height="34" viewBox="0 0 256 256">
      <circle cx="128" cy="128" r="124" fill="#E95420"/>
      <circle cx="128" cy="128" r="74" fill="none" stroke="#FFFFFF" strokeWidth="24"/>
      <circle cx="218" cy="128" r="22" fill="#E95420" stroke="#FFFFFF" strokeWidth="10"/>
      <circle cx="83" cy="50" r="22" fill="#E95420" stroke="#FFFFFF" strokeWidth="10"/>
      <circle cx="83" cy="206" r="22" fill="#E95420" stroke="#FFFFFF" strokeWidth="10"/>
    </svg>
  ),
  mysql: (
    <svg width="34" height="34" viewBox="0 0 256 256">
      <rect width="256" height="256" rx="48" fill="#00758F"/>
      <path d="M188 160c-15 0-25-8-32-20-10-18-20-30-38-30-15 0-25 10-25 24 0 18 15 28 35 28 8 0 16-2 22-5l4 18c-8 4-18 6-28 6-32 0-53-18-53-47 0-24 16-43 45-43 28 0 45 18 57 40 5 9 12 14 20 14 6 0 12-3 16-7l6 16c-7 6-17 9-29 9z" fill="#F29111"/>
    </svg>
  ),
  gemini: (
    <svg width="34" height="34" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="gemA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1BA1E3"/>
          <stop offset="50%" stopColor="#5E5CE6"/>
          <stop offset="100%" stopColor="#AF52DE"/>
        </linearGradient>
      </defs>
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="url(#gemA)"/>
    </svg>
  ),
  langchain: (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#1C3C3C"/>
      <circle cx="8" cy="12" r="3" stroke="#2DD4BF" strokeWidth="2"/>
      <circle cx="16" cy="12" r="3" stroke="#2DD4BF" strokeWidth="2"/>
      <line x1="11" y1="12" x2="13" y2="12" stroke="#2DD4BF" strokeWidth="2"/>
    </svg>
  )
};

// Shabeeb's Real Engineering Tech Ecosystem
const TECH_ECOSYSTEM = [
  // Backend
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    categoryLabel: 'Backend Core',
    desc: 'Core language powering enterprise ERP workflows, Django REST APIs, and YOLOv8 computer vision models.',
    tier: 'Production Core',
    icon: LOGOS.python
  },
  {
    id: 'django',
    name: 'Django & DRF',
    category: 'backend',
    categoryLabel: 'Backend Framework',
    desc: 'Django REST Framework, modular architecture, custom JWT authentication, and transactional ledger controls.',
    tier: 'Enterprise Flagship',
    icon: LOGOS.django
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    categoryLabel: 'Microservices',
    desc: 'High-throughput asynchronous APIs, Pydantic type validation, and OpenAPI documentation pipelines.',
    tier: 'High Performance',
    icon: LOGOS.fastapi
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Async Runtime',
    desc: 'Event-driven server runtimes, Express middleware, and WebSocket integrations for live data sync.',
    tier: 'Runtime & APIs',
    icon: LOGOS.nodejs
  },

  // Databases
  {
    id: 'postgres',
    name: 'PostgreSQL 16',
    category: 'databases',
    categoryLabel: 'Relational Database',
    desc: 'Complex schema indexing, foreign-key constraints, multi-tenant partitioning, and sub-45ms P95 queries.',
    tier: 'Primary Relational DB',
    icon: LOGOS.postgres
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    categoryLabel: 'NoSQL Document',
    desc: 'High-volume document store for flexible JSON aggregates, telemetry streams, and dynamic payloads.',
    tier: 'Document Store',
    icon: LOGOS.mongodb
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    categoryLabel: 'SQL Database',
    desc: 'Structured transactional data management, normalized tables, and legacy schema integrations.',
    tier: 'Relational Engine',
    icon: LOGOS.mysql
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'databases',
    categoryLabel: 'In-Memory Cache',
    desc: 'Sub-millisecond query caching, distributed session storage, and rate-limiting queue processing.',
    tier: 'Cache & Session',
    icon: LOGOS.redis
  },

  // Frontend
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Frontend UI',
    desc: 'Component hierarchies, customized hooks, complex state management, and rich interactive dashboards.',
    tier: 'Component Architecture',
    icon: LOGOS.react
  },
  {
    id: 'nextjs',
    name: 'Next.js 14',
    category: 'frontend',
    categoryLabel: 'Full-Stack React',
    desc: 'App Router, Server-Side Rendering (SSR), API routes, and optimized enterprise user interfaces.',
    tier: 'Full Stack Frontend',
    icon: LOGOS.nextjs
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Typed JavaScript',
    desc: 'Strict type safety, generic interfaces, and reliable refactoring across mission-critical codebases.',
    tier: 'Static Typing',
    icon: LOGOS.typescript
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Design System',
    desc: 'Utility-first modern styling, responsive layouts, glassmorphism, and tailored editorial aesthetics.',
    tier: 'Modern Styling',
    icon: LOGOS.tailwind
  },

  // AI & ML
  {
    id: 'claude',
    name: 'Claude AI',
    category: 'ai',
    categoryLabel: 'Anthropic AI',
    desc: 'Advanced prompt engineering, Anthropic API integrations, and code synthesis orchestration.',
    tier: 'AI Assistant',
    icon: LOGOS.claude
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT / OpenAI',
    category: 'ai',
    categoryLabel: 'OpenAI Ecosystem',
    desc: 'GPT-4o integrations, embeddings for semantic search, and autonomous generative agent flows.',
    tier: 'LLM Orchestration',
    icon: LOGOS.chatgpt
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'ai',
    categoryLabel: 'Multimodal AI',
    desc: 'Gemini API integration for multimodal document analysis, automated summaries, and reasoning.',
    tier: 'Multimodal Models',
    icon: LOGOS.gemini
  },
  {
    id: 'langchain',
    name: 'LangChain & YOLO',
    category: 'ai',
    categoryLabel: 'Vision & Agents',
    desc: 'Custom YOLOv8 object detection pipelines for threat surveillance and LangChain RAG vector workflows.',
    tier: 'Computer Vision / RAG',
    icon: LOGOS.langchain
  },

  // DevOps & Tooling
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    categoryLabel: 'Containerization',
    desc: 'Multi-stage production container builds, Docker Compose service orchestration, and image optimization.',
    tier: 'Containerization',
    icon: LOGOS.docker
  },
  {
    id: 'linux',
    name: 'Linux / Ubuntu',
    category: 'devops',
    categoryLabel: 'Operating Systems',
    desc: 'Server administration, systemd service daemon configuration, Nginx reverse proxy, and Bash automation.',
    tier: 'Server Infrastructure',
    icon: LOGOS.linux
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'devops',
    categoryLabel: 'Version Control',
    desc: 'Collaborative feature branching, rebase strategies, code reviews, and GitHub Actions CI/CD automation.',
    tier: 'Collaborative SCM',
    icon: LOGOS.git
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'devops',
    categoryLabel: 'API Testing',
    desc: 'Automated REST endpoint validation, JWT header automation, environment variables, and webhook mockers.',
    tier: 'API Testing & QA',
    icon: LOGOS.postman
  }
];

// Orbiting Celestial Satellites around Shabeeb Cutout
const ORBIT_SATELLITES = [
  { id: 'python', name: 'Python', tech: TECH_ECOSYSTEM[0], top: '8%', left: '8%', angle: 'tilt-left' },
  { id: 'django', name: 'Django', tech: TECH_ECOSYSTEM[1], top: '10%', right: '10%', angle: 'tilt-right' },
  { id: 'postgres', name: 'PostgreSQL', tech: TECH_ECOSYSTEM[4], top: '46%', left: '4%', angle: 'tilt-left' },
  { id: 'react', name: 'React.js', tech: TECH_ECOSYSTEM[8], top: '48%', right: '5%', angle: 'tilt-right' },
  { id: 'nextjs', name: 'Next.js', tech: TECH_ECOSYSTEM[9], bottom: '10%', left: '12%', angle: 'tilt-left' },
  { id: 'claude', name: 'Claude AI', tech: TECH_ECOSYSTEM[12], bottom: '12%', right: '12%', angle: 'tilt-right' },
  { id: 'mongodb', name: 'MongoDB', tech: TECH_ECOSYSTEM[5], top: '26%', left: '20%', angle: 'tilt-straight' },
  { id: 'docker', name: 'Docker', tech: TECH_ECOSYSTEM[16], top: '28%', right: '20%', angle: 'tilt-straight' }
];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState(TECH_ECOSYSTEM[0]); // default to Python
  const canvasRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Stack', count: TECH_ECOSYSTEM.length },
    { id: 'backend', label: 'Backend & APIs', count: TECH_ECOSYSTEM.filter(t => t.category === 'backend').length },
    { id: 'databases', label: 'Databases & Storage', count: TECH_ECOSYSTEM.filter(t => t.category === 'databases').length },
    { id: 'frontend', label: 'Frontend Architecture', count: TECH_ECOSYSTEM.filter(t => t.category === 'frontend').length },
    { id: 'ai', label: 'AI & Machine Learning', count: TECH_ECOSYSTEM.filter(t => t.category === 'ai').length },
    { id: 'devops', label: 'DevOps & Tooling', count: TECH_ECOSYSTEM.filter(t => t.category === 'devops').length }
  ];

  const filteredTech = TECH_ECOSYSTEM.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Ambient Celestial Particles in Orbit Viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Warm Amber Celestial Stardust
    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '#d97706' : '#f59e0b'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;

        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.opacity;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="section editorial-universe-section" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal text-center">
          <span className="section-subtitle">ENTERPRISE ENGINEERING ARSENAL</span>
          <h2 className="section-title">The Engineering Universe</h2>
          <p className="section-description">
            A comprehensive, battle-tested ecosystem of full-stack backend frameworks, high-throughput relational databases, modern reactive interfaces, and production generative AI tools.
          </p>
        </div>

        {/* 1. Center Interactive Orbit Showcase */}
        <div className="universe-stage-card reveal">
          <canvas ref={canvasRef} className="universe-stage-canvas" />

          {/* Luminous Orbital Rings */}
          <div className="orbit-rings-container">
            <div className="orbit-ring orbit-ring-outer"></div>
            <div className="orbit-ring orbit-ring-inner"></div>
          </div>

          {/* Center Standing Portrait Cutout */}
          <div className="universe-center-anchor">
            <div className="portrait-warm-halo"></div>
            <img
              src="/assets/images/shabeeb-standing.png"
              alt="Shabeeb Ahammed KT"
              className="portrait-standing-img"
            />
            <div className="portrait-anchor-badge">
              <span className="portrait-live-beacon"></span>
              <span className="portrait-badge-text">Shabeeb Ahammed • Full Stack Engineer</span>
            </div>
          </div>

          {/* Orbiting Satellites with Official Logos */}
          <div className="satellites-orbit-layer">
            {ORBIT_SATELLITES.map((sat) => {
              const isSelected = selectedTech.id === sat.tech.id;

              return (
                <div
                  key={sat.id}
                  className={`orbit-satellite-pill ${sat.angle} ${isSelected ? 'active-satellite' : ''}`}
                  style={{
                    top: sat.top,
                    left: sat.left,
                    right: sat.right,
                    bottom: sat.bottom
                  }}
                  onClick={() => setSelectedTech(sat.tech)}
                  title={`Click to inspect ${sat.tech.name}`}
                >
                  <div className="satellite-icon-shell">
                    {sat.tech.icon}
                  </div>
                  <div className="satellite-info">
                    <span className="satellite-title">{sat.tech.name}</span>
                    <span className="satellite-category">{sat.tech.categoryLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Inspected Tech Ribbon */}
          {selectedTech && (
            <div className="inspected-tech-ribbon animate-fade-in">
              <div className="inspected-ribbon-icon">
                {selectedTech.icon}
              </div>
              <div className="inspected-ribbon-details">
                <div className="inspected-ribbon-header">
                  <h4 className="inspected-ribbon-name">{selectedTech.name}</h4>
                  <span className="inspected-ribbon-tier">{selectedTech.tier}</span>
                </div>
                <p className="inspected-ribbon-desc">{selectedTech.desc}</p>
              </div>
            </div>
          )}
        </div>

        {/* 2. Category Filter Tabs */}
        <div className="universe-filter-bar reveal" style={{ marginTop: '48px', marginBottom: '28px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="filter-count-badge">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* 3. Comprehensive Technology Bento Grid (All 20+ Skills) */}
        <div className="tech-ecosystem-grid">
          {filteredTech.map((tech) => {
            const isSelected = selectedTech.id === tech.id;

            return (
              <div
                key={tech.id}
                className={`tech-ecosystem-card spotlight-card ${isSelected ? 'selected-card' : ''}`}
                onClick={() => setSelectedTech(tech)}
              >
                <div className="tech-card-top">
                  <div className="tech-icon-container">
                    {tech.icon}
                  </div>
                  <div className="tech-meta">
                    <span className="tech-category-pill">{tech.categoryLabel}</span>
                    <span className="tech-tier-pill">{tech.tier}</span>
                  </div>
                </div>

                <h3 className="tech-card-name">{tech.name}</h3>
                <p className="tech-card-desc">{tech.desc}</p>

                <div className="tech-card-bottom">
                  <span className="tech-inspect-action">
                    <span>Inspect Stack Details</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
