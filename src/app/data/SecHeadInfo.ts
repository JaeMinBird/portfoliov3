export interface SectionHeaderInfo {
  id: number;
  title: string;
  color: string;
  modelPath: string;
  ascii: {
    characters?: string;
    color?: string;
    inverted?: boolean;
    resolution?: number;
  };
  modelRotation: {
    x: number;
    y: number;
    z: number;
  };
  modelScale?: number;
}

export const sectionHeaders: SectionHeaderInfo[] = [
  {
    id: 1, 
    title: "about",
    color: "#4ecdc4", // teal color
    modelPath: "/models/book.glb",
    ascii: {
      characters: " .:-+*=%@#",
      color: "white",
      inverted: false,
      resolution: 0.4
    },
    modelRotation: {
      x: 0.3,
      y: Math.PI / 4,
      z: 0.1
    },
    modelScale: 2.5
  },
  {
    id: 2,
    title: "career",
    color: "#5a9bd5", // blue color
    modelPath: "/models/briefcase.glb",
    ascii: {
      characters: " .:-+*=%@#",
      color: "white",
      inverted: false,
      resolution: 0.3
    },
    modelRotation: {
      x: 0.5,
      y: Math.PI / -2.5,
      z: 0
    },
    modelScale: 2.0
  },
  {
    id: 3,
    title: "projects",
    color: "#ff6b6b", // coral color
    modelPath: "/models/pc.glb",
    ascii: {
      characters: " .:-+*=%@#",
      color: "white",
      inverted: false,
      resolution: 0.3
    },
    modelRotation: {
      x: -.6,
      y: Math.PI / -2.5,
      z: -.4
    },
    modelScale: 2.5
  },
  {
    id: 4,
    title: "education",
    color: "#a3c644", // green color
    modelPath: "/models/cylinder.glb",
    ascii: {
      characters: " .:-+*=%@#",
      color: "white",
      inverted: false,
      resolution: 0.2
    },
    modelRotation: {
      x: 0.2,
      y: Math.PI / 2,
      z: 0.1
    },
    modelScale: 2.5
  },
  {
    id: 5,
    title: "contact",
    color: "#FFE66A", // naples yellow
    modelPath: "/models/rotary.glb",
    ascii: {
      characters: " .:-+*=%@#",
      color: "#white",
      inverted: false,
      resolution: 0.4
    },
    modelRotation: {
      x: -.2,
      y: Math.PI / -1.5,
      z: -.3
    },
    modelScale: 2.5
  }
]; 