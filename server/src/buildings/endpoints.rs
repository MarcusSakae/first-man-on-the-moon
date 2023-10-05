use axum::response::IntoResponse;
use axum::Extension;
use axum::Json;
use serde_json::json;

use crate::session::model::Session;

/// Gets all the buildings available to the current session
pub async fn list(Extension(session): Extension<Session>) -> impl IntoResponse {
    let session = session.try_lock();
    if session.is_err() {
        return Json(serde_json::json!({"error": "Could not lock session"}));
    }
    Json(json!(session.unwrap().available_buildings))
}
