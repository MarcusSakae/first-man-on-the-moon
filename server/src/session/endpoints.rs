use axum::{response::IntoResponse, Extension, Json};
use serde_json::json;
use uuid::Uuid;

use crate::buildings::default_buildings;

use super::model::Session;

pub async fn get(Extension(session): Extension<Session>) -> impl IntoResponse {
    let session = session.try_lock();
    if session.is_err() {
        return Json(serde_json::json!({"error": "Could not lock session"}));
    }
    let session = session.unwrap();

    Json(json!(session.id))
}

pub async fn generate(Extension(session): Extension<Session>) -> impl IntoResponse {
    let session = session.try_lock();
    if session.is_err() {
        return Json(serde_json::json!({"error": "Could not lock session"}));
    }
    let mut session = session.unwrap();

    session.id = Uuid::new_v4().to_string();
    session.available_buildings = default_buildings();

    Json(json!({ "message": "New game session generated!", "session": session.id}))
}
