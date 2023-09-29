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

export interface Skills {
  rocketScience: number;
  construction: number;
  coding: number;
  piloting: number;
  fitness: number;
}
export interface Astronaut {
  id: string;
  name: string;
  skills: Skills;
  task: Task;
  study: StudySubject;
}
