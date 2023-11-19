use crate::StorageExt;
use axum::{extract::Path, response::IntoResponse, Extension, Json};
use serde_json::json;

use super::{repo::create_user_data, UserData};

pub async fn load(
    Path(device_id): Path<String>,
    Extension(storage): StorageExt,
) -> impl IntoResponse {
    let mut user_data = match storage.lookup(&device_id) {
        Some(user_data) => user_data.value().to_owned(),
        None => create_user_data(device_id, &storage).await,
    };
    user_data.populate();
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
