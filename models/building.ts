

/**
 * Types
 */
export interface BuildingCost {
  dollars?: number;
  energy?: number;
  sand?: number;
  iron?: number;
}

export interface Building {
  id: string;
  name: string;
  label: string;
  description: string;
  cost: BuildingCost[];
  timeMultiplier?: number;
  upgrades: Building[];
}
export interface BuildingSlot {
  id: string;
  building?: Building;
}

/**
 * Initial building slots
 */

export const buildings: Building[] = [];
