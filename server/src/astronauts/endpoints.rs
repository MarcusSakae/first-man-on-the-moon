use crate::{lockmacro::lock_session, session::model::Session};
use axum::{response::IntoResponse, Extension, Json, extract::Path};
use serde_json::json;

pub async fn list(Extension(session): Extension<Session>) -> impl IntoResponse {
    let session = lock_session!(session);
    Json(json!(session.astronauts))
}

pub async fn hire(
    Path(id): Path<String>,
    Extension(session): Extension<Session>,
) -> impl IntoResponse {
    let session = lock_session!(session);
    let astronaut = session.astronauts.iter().find(|a| a.id == id).unwrap();
    Json(json!(astronaut))
}
