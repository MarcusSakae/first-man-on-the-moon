use darkbird::document;
use darkbird::document::RangeField;
use serde::Deserialize;
use serde::Serialize;

use crate::buildings::AstronautSlot;
use crate::buildings::BuildingSlot;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct UserData {
    pub device_id: String,
    pub building_slots: Vec<BuildingSlot>,
    pub astronaut_slots: Vec<AstronautSlot>,
}

impl UserData {
    pub fn new(device_id: &str) -> Self {
        UserData {
            device_id: device_id.to_string(),
            building_slots: vec![],
            astronaut_slots: vec![],
        }
    }
    // Recalculates fields that *should* not be stored
    // For now we want astronaut_slots to be an aggregated list of all building_slots->building->astronaut_slots
    pub fn populate(&mut self) {
        self.astronaut_slots = self.building_slots.iter().fold(vec![], |mut acc, slot| {
            if let Some(building) = &slot.building {
                acc.extend(building.astronaut_slots.clone());
            }
            acc
        });
    }
}

// ---------------
//
// Below is not used but to satisfy the document::Document trait
//
// ---------------

impl document::Document for UserData {}

impl document::Indexer for UserData {
    fn extract(&self) -> Vec<String> {
        vec![]
    }
}

impl document::Tags for UserData {
    fn get_tags(&self) -> Vec<String> {
        vec![]
    }
}

impl document::Range for UserData {
    fn get_fields(&self) -> Vec<RangeField> {
        vec![]
    }
}

impl document::MaterializedView for UserData {
    fn filter(&self) -> Option<String> {
        None
    }
}

impl document::FullText for UserData {
    fn get_content(&self) -> Option<String> {
        None
    }
}
