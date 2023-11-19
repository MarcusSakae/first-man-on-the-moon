export enum StudySubject {
  RocketScience,
  Construction,
  Coding,
  Piloting,
}

export enum Task {
  Work,
  Study,
  Construct,
  MixFuel,
  Pilot,
  Train,
  Drone,
}

export interface Stats {
  strength: number;
  mind: number;
  speed: number;
  charisma: number;
  piloting: number;
  size: number;
}

export interface Astronaut {
  id: string;
  name: string;
  stats: Stats;
  // task: Task;
  // study: StudySubject;
  hire_cost: number;
}
