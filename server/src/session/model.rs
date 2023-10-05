use std::sync::Arc;
use tokio::sync::Mutex;

use crate::buildings::Building;
use crate::buildings::default_buildings;

pub type Session = Arc<Mutex<SessionInner>>;

#[derive(Debug, Clone)]
pub struct SessionInner {
    pub(crate) id: String,
    pub(crate) available_buildings: Vec<Building>,
}
impl Default for SessionInner {
    fn default() -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            available_buildings: default_buildings(),
        }
    }
}