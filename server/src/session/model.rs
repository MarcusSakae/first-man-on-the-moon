use std::sync::Arc;
use tokio::sync::Mutex;

use crate::astronauts::random_selection_from_file;
use crate::astronauts::Astronaut;
use crate::buildings::available_to_build;
use crate::buildings::Building;

pub type Session = Arc<Mutex<SessionInner>>;

#[derive(Debug, Clone)]
pub struct SessionInner {
    pub(crate) id: String,
    pub(crate) available_to_build: Vec<Building>,
    pub(crate) astronauts: Vec<Astronaut>,
}
impl Default for SessionInner {
    fn default() -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            available_to_build: available_to_build(),
            astronauts: random_selection_from_file(),
        }
    }
}
