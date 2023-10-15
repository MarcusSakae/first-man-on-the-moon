/**
 * Types
 */
export interface BuildingCost {
  dollars?: number;
  energy?: number;
  sand?: number;
  iron?: number;
}

export interface AstronautSlot {
  id: string;
  astronaut_id?: string;
}

export interface Building {
  id: string;
  name: string;
  kind: string;
  label: string;
  description: string;
  cost: BuildingCost[];
  time_multiplier?: number;
  upgrades: Building[];
  astronaut_slots: AstronautSlot[];
}

export interface BuildingSlot {
  id: string;
  building?: Building;
}

/**
 * Initial building slots
 */
export const buildings: Building[] = [];
