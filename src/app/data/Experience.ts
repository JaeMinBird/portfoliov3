export interface Experience {
    id: number;
    name: string;
    description: string;
    skills: string[];
    position: string;
    location: string;
    icon: string;
    color: string;
  }
  
  export const experiences: Experience[] = [
    {
      id: 1,
      name: "UPSTATE ACCOUNTING & TAX",
      description: "BUILT AND PRESENTED A PERFORMANT MOBILE-FIRST WEB PROTOTYPE FOR CLIENTS, BLENDING UI/UX DESIGN WITH CMS AND AGILE WORKFLOWS.",
      position: "FRONTEND DEVELOPER",
      location: "ALBANY, NY",
      skills: [
        "HTML",
        "CSS",
        "JAVASCRIPT",
        "BOOTSTRAP 5",
        "JQUERY",
        "FIGMA",
        "LARAVEL",
        "OCTOBER CMS",
        "JIRA",
        "DOCKER",
        "AGILE METHODOLOGIES"
      ],
      icon: "halftone-grid",
      color: "#FFB347"
    },
    {
      id: 2,
      name: "MINDBURN SOLUTIONS",
      description: "SUPPORTED IT OPERATIONS AND POST-BREACH RECOVERY ACROSS WAREHOUSE ENVIRONMENTS, IMPROVING INFRASTRUCTURE RESILIENCE AND DATA INTEGRITY.",
      position: "IT SPECIALIST",
      location: "REMOTE",
      skills: [
        "MYSQL",
        "SERVER SETUP",
        "NETWORKING",
        "SECURITY",
        "DATA RECOVERY",
        "INVENTORY MANAGEMENT"
      ],
      icon: "ascii-mesh",
      color: "#B0C4DE"
    }    
  ];