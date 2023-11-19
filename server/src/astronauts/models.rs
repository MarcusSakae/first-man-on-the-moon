#[derive(Clone, Debug, serde::Serialize, serde::Deserialize, PartialEq)]
pub struct AstronautStats {
    pub strength: u8,
    pub mind: u8,
    pub speed: u8,
    pub charisma: u8,
    pub piloting: u8,
    pub size: u8, // higher air & food consumption
}
impl AstronautStats {
    // each stat random 1-to-10
    pub fn new() -> Self {
        Self {
            strength: rand::random::<u8>() % 10 + 1,
            mind: rand::random::<u8>() % 10 + 1,
            speed: rand::random::<u8>() % 10 + 1,
            charisma: rand::random::<u8>() % 10 + 1,
            piloting: rand::random::<u8>() % 10 + 1,
            size: rand::random::<u8>() % 10 + 1,
        }
    }
    pub fn sum(&self) -> usize {
        (self.strength + self.mind + self.speed + self.charisma + self.piloting + self.size)
            as usize
    }
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct Astronaut {
    pub id: String,
    pub name: String,
    pub stats: AstronautStats,
    #[serde(skip_deserializing)]
    pub hire_cost: usize,
}
impl PartialEq for Astronaut {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Astronaut {
    pub fn new(name: &str) -> Self {
        let stats = AstronautStats::new();
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            name: name.to_string(),
            stats: stats,
            hire_cost: 100,
        }
    }
    pub fn name(mut self, name: &str) -> Self {
        self.name = name.to_string();
        self
    }
    pub fn cost(mut self, cost: usize) -> Self {
        self.hire_cost = cost;
        self
    }
}
