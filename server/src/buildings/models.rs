#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub enum CostKind {
    Dollar(i32),
    Energy(i32),
    Sand(i32),
    Iron(i32),
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub enum BuildingKind {
    Housing,
    Launchpad,
    Excavator,
    None,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct AstronautSlot {
    pub id: String,
    pub astronaut_id: Option<String>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct Building {
    pub id: String,
    pub name: String,
    pub kind: BuildingKind,
    pub label: String,
    pub description: String,
    pub cost: Vec<CostKind>,
    pub time_multiplier: Option<i32>,
    pub upgrades: Vec<Building>,
    pub initially_available: bool,
    pub astronaut_slots: Vec<AstronautSlot>,
}
impl Building {
    pub fn new(label: &str, description: &str) -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            name: label.to_ascii_lowercase().replace(" ", ""),
            kind: BuildingKind::None,
            label: label.to_string(),
            description: description.to_string(),
            cost: vec![],
            time_multiplier: None,
            upgrades: vec![],
            initially_available: false,
            astronaut_slots: vec![],
        }
    }
    pub fn upgrades(mut self, upgrades: Vec<Building>) -> Self {
        self.upgrades = upgrades;
        self
    }
    pub fn name(mut self, name: &str) -> Self {
        self.name = name.to_string();
        self
    }
    pub fn kind(mut self, kind: BuildingKind) -> Self {
        self.kind = kind;
        self
    }
    pub fn cost(mut self, cost: CostKind) -> Self {
        self.cost.push(cost);
        self
    }
    pub fn astronat_slots(mut self, num: usize) -> Self {
        self.astronaut_slots = (0..num)
            .map(|_| AstronautSlot {
                id: uuid::Uuid::new_v4().to_string(),
                astronaut_id: None,
            })
            .collect();
        self
    }
    pub fn initially_available(mut self) -> Self {
        self.initially_available = true;
        self
    }
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct BuildingSlot {
    pub id: String,
    pub building: Option<Building>,
}
impl BuildingSlot {
    pub fn new(building: Option<Building>) -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            building: building,
        }
    }
}
