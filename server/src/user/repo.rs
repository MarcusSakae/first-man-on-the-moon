use crate::buildings::initial_available_buildings;
use crate::buildings::BuildingSlot;

use super::UserData;

/**
 *
 */
pub async fn create_user_data(
    device_id: String,
    storage: &std::sync::Arc<darkbird::Storage<String, UserData>>,
) -> UserData {
    let mut user_data = UserData::new(&device_id);
    for building in initial_available_buildings() {
        user_data
            .building_slots
            .push(BuildingSlot::new(Some(building)));
    }
    storage
        .insert(device_id.clone(), user_data.clone())
        .await
        .unwrap();
    user_data
}
