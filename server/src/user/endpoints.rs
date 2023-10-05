use crate::{buildings::default_buildings, session::Session, StorageExt};
use axum::{response::IntoResponse, Extension, Json};
use serde_json::json;
use uuid::Uuid;

use super::User;

macro_rules! lock_session {
    ($session:expr) => {
        $session.try_lock().map_err(|_| {
            return Json(serde_json::json!({"error": "Could not lock session"}));
        })
        .unwrap()
    }
}

pub async fn load(Extension(storage): StorageExt) -> impl IntoResponse {
    let id = "aaa".to_string();
    match storage.lookup(&id) {
        Some(user) => {
            let a = user.value();
            Json(json!(a))
        }
        None => Json(json!({"error": "Could not find user"})),
    }
}

pub async fn save(Extension(session): Extension<Session>, Extension(storage): StorageExt) -> impl IntoResponse {
    let mut session = lock_session!(session);

    storage.insert("aaa".to_string(), User::new("sometihng")).await.unwrap();

    session.id = Uuid::new_v4().to_string();
    session.available_buildings = default_buildings();
    Json(json!({ "message": "New game session generated!", "session": session.id}))
}
