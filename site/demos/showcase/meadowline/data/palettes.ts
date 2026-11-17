export type SceneImage = {
  /** File in `public/showcase/meadowline/`, without extension. */
  file: string;
  width: number;
  height: number;
  /** `object-position` used when the frame crops the picture. */
  position: string;
};

/** Landscape photographs, keyed by the mood each section asks for. */
export const palettes = {
  golden: { file: "alpine-valley-golden", width: 1920, height: 1279, position: "50% 100%" },
  valley: { file: "alpine-meadow-sunrise", width: 1920, height: 1280, position: "50% 100%" },
  spring: { file: "lake-daisies", width: 1200, height: 800, position: "50% 60%" },
  lake: { file: "forest-lake-fireweed", width: 1200, height: 900, position: "50% 70%" },
  amber: { file: "autumn-hillside", width: 1200, height: 800, position: "60% 80%" },
  indigo: { file: "blue-peak", width: 1200, height: 800, position: "50% 30%" },
  violet: { file: "violet-valley", width: 1200, height: 800, position: "70% 30%" },
  forest: { file: "green-valley-firs", width: 1200, height: 800, position: "70% 70%" },
  mistGreen: { file: "mist-green", width: 1000, height: 665, position: "50% 100%" },
  mistBlue: { file: "mist-blue", width: 1000, height: 665, position: "50% 100%" },
  mistLilac: { file: "mist-lilac", width: 1000, height: 665, position: "50% 100%" },
  mistPeach: { file: "mist-peach", width: 1400, height: 869, position: "50% 100%" },
  fog: { file: "mist-peach", width: 1400, height: 869, position: "50% 70%" },
  pastoral: { file: "rhododendron-tarn", width: 1200, height: 800, position: "50% 45%" },
} satisfies Record<string, SceneImage>;

export type PaletteName = keyof typeof palettes;
