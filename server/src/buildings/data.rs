use std::vec;

use crate::buildings::models::BuildingKind;
use crate::buildings::models::CostKind;

use super::Building;

/**
 * Building data
 */
pub fn available_to_build() -> Vec<Building> {
    // Alias Building to B
    type B = Building;
    let [house, house2, house3, house4, launchpad, launchpad2] = [
        B::new("Cabin", "Single unit livingspace for an astronaut.")
            .name("house")
            .astronat_slots(1)
            .kind(BuildingKind::Housing),
        B::new("Duplex", "More livingspace for your astronauts.")
            .name("house2")
            .astronat_slots(2)
            .kind(BuildingKind::Housing),
        B::new("Triplex", "Even more livingspace for your astronauts.")
            .name("house3")
            .astronat_slots(3)
            .kind(BuildingKind::Housing),
        B::new("Fourplex", "Largest space for your astronauts.")
            .name("house4")
            .astronat_slots(4)
            .kind(BuildingKind::Housing),
        // launchpad
        B::new("Launchpad", "A place to launch rockets from.").kind(BuildingKind::Launchpad),
        B::new("Secondary launchpad", "More rockets at the same time.")
            .kind(BuildingKind::Launchpad),
    ];

    use CostKind::Dollar;

    // Set up the upgrades (in reverse)
    let house4 = vec![house4.cost(Dollar(50000))];
    let house3 = vec![house3.cost(Dollar(10000)).upgrades(house4)];
    let house2 = vec![house2.cost(Dollar(1000)).upgrades(house3)];
    let house = house.cost(Dollar(100)).upgrades(house2);

    let launchpad2 = vec![launchpad2.cost(Dollar(10000))];
    let launchpad = launchpad.cost(Dollar(1000)).upgrades(launchpad2);
    vec![house, launchpad]
}

pub fn initial_available_buildings() -> Vec<Building> {
    vec![excavator()]
}

pub fn excavator() -> Building {
    Building::new("Excavator", "Dig up more land.").kind(BuildingKind::Excavator)
}
