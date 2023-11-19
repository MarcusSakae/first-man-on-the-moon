use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Extension;
use axum::Json;
use serde::Deserialize;
use serde::Serialize;
use serde_json::json;

use crate::lockmacro::lock_session;
use crate::session::model::Session;
use crate::user::UserData;
use crate::StorageExt;

/// Gets all the buildings available to the current session
pub async fn list(Extension(session): Extension<Session>) -> impl IntoResponse {
    let session = lock_session!(session);
    Json(json!(session.available_to_build))
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct BuildDto {
    device_id: String,
    building_id: String,
}

// Adds a building to a user's UserData
pub async fn build(
    Extension(session): Extension<Session>,
    Extension(storage): StorageExt,
    Json(user_data): Json<BuildDto>,
) -> impl IntoResponse {
    println!("build: {:?}", user_data);
    // find the building from session
    let session = lock_session!(session);
    let building = session
        .available_to_build
        .iter()
        .find(|b| b.id == user_data.building_id);

    // unwrap or return error
    let building = match building {
        Some(building) => building,
        None => {
            return (
                StatusCode::NOT_FOUND,
                Json(json!({ "message": "building not found!" })),
            )
        }
    };

    // find the user data from storage
    let mut user_data = storage
        .lookup(&user_data.device_id)
        .unwrap()
        .value()
        .to_owned();

    // add the building to the user's first empty slot
    let building_slot = user_data
        .building_slots
        .iter_mut()
        .find(|s| s.building.is_none())
        .unwrap();

    println!("found empty building_slot: {:?}", building_slot.id);

    building_slot.building = Some(building.clone());

    // Persist to db
    storage
        .insert(user_data.device_id.clone(), user_data)
        .await
        .unwrap();

    (
        StatusCode::OK,
        Json(json!({ "message": "building built!" })),
    )
}
