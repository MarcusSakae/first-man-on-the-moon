use axum::response::IntoResponse;
use axum::Extension;
use axum::Json;
use serde_json::json;

use crate::lockmacro::lock_session;
use crate::session::model::Session;

/// Gets all the buildings available to the current session
pub async fn list(Extension(session): Extension<Session>) -> impl IntoResponse {
    let session = lock_session!(session);
    Json(json!(session.available_buildings))
}
