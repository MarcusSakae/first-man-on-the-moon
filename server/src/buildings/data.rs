use crate::buildings::models::CostKind;

use super::Building;

/**
 * Building data
 */

pub fn default_buildings() -> Vec<Building> {
    // Alias Building to B
    type B = Building;
    let [house, launchpad, basement, attic, cleanup, doghouse, launchpad2, excavator] = [
        B::new("House", "Your house. One room and a kitchen."),
        B::new("Rocket Launchpad", "A place to launch rockets from."),
        B::new("Basement", "With a basement, one more person can live here!"),
        B::new("Attic", "Someone could fit here if you remove some of this wood frame."),
        B::new("Room cleanup", "If I clean my room, one more person could fit in here!"),
        B::new("Doghouse", "Maybe in the doghouse...?"),
        B::new("Secondary Launchpad", "One more place to launch rockets from."),
        B::new("Excavator", "Dig up more land."),
    ];

    use CostKind::Dollar;
    // Set up the upgrades
    let house = house
        .upgrades(vec![
            basement.cost(Dollar(100)),
            attic.cost(Dollar(500)),
            cleanup.cost(Dollar(5000)),
            doghouse.cost(Dollar(10000)),
        ])
        .initially_available();

    let launchpad = launchpad.upgrades(vec![launchpad2]).initially_available();

    vec![house, launchpad, excavator]
}
