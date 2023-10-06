use darkbird::document;
use darkbird::document::RangeField;
use serde::Deserialize;
use serde::Serialize;

use crate::buildings::BuildingSlot;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct UserData {
    device_id: String,
    pub building_slots: Vec<BuildingSlot>,
}

impl UserData {
    pub fn new(device_id: &str) -> Self {
        UserData {
            device_id: device_id.to_string(),
            building_slots: vec![],
        }
    }
}

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
