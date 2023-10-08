use crate::buildings::initial_available_buildings;
use crate::buildings::BuildingSlot;

use super::UserData;

const NUM_INITIAL_BUILDING_SLOTS: usize = 1;

/**
 *
 */
pub async fn create_user_data(
    device_id: String,
    storage: &std::sync::Arc<darkbird::Storage<String, UserData>>,
) -> UserData {
    let mut user_data = UserData::new(&device_id);
    // Add initial buildings
    for building in initial_available_buildings() {
        user_data
            .building_slots
            .push(BuildingSlot::new(Some(building)));
    }

    // Insert empty building slots before the last one (the excavator)
    for index in 0..NUM_INITIAL_BUILDING_SLOTS {
        user_data
            .building_slots
            .insert(index, BuildingSlot::new(None));
    }

    storage
        .insert(device_id.clone(), user_data.clone())
        .await
        .unwrap();
    user_data
}
