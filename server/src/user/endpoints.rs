use crate::{
    buildings::{default_buildings, BuildingSlot},
    StorageExt,
};
use axum::{extract::Path, response::IntoResponse, Extension, Json};
use serde_json::json;

use super::UserData;

pub async fn load(Path(device_id): Path<String>, Extension(storage): StorageExt) -> impl IntoResponse {
    let user_data = match storage.lookup(&device_id) {
        Some(user_data) => user_data.value().to_owned(),
        None => {
            let mut user_data = UserData::new(&device_id);
            user_data.building_slots = default_buildings()
                .iter()
                .map(|b| BuildingSlot::new(Some(b.to_owned())))
                .collect();

            // add a few empty slots, keep the excavator last
            for _ in 1..5 {
                user_data
                    .building_slots
                    .insert(user_data.building_slots.len() - 1, BuildingSlot::new(None));
            }

            storage.insert(device_id.clone(), user_data.clone()).await.unwrap();
            user_data
        }
    };
    Json(user_data)
}

pub async fn save(
    Path(device_id): Path<String>,
    Extension(storage): StorageExt,
    Json(user_data): Json<UserData>,
) -> impl IntoResponse {
    // let mut session = lock_session!(session);

    storage.insert(device_id, user_data).await.unwrap();

    Json(json!({ "message": "saved"}))
}
