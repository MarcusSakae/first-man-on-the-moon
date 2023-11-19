use axum::{response::IntoResponse, Extension, Json};
use serde_json::json;
use uuid::Uuid;

use crate::{buildings::available_to_build, lockmacro::lock_session, StorageExt};

use super::model::Session;

pub async fn get(Extension(session): Extension<Session>) -> impl IntoResponse {
    let session = lock_session!(session);

    Json(json!(session.id))
}

pub async fn generate(
    Extension(session): Extension<Session>,
    Extension(storage): StorageExt,
) -> impl IntoResponse {
    println!("!!! Generating new session, removing all users!!!");
    let mut session = lock_session!(session);

    // clear all users
    for user in storage.iter() {
        storage.remove(user.key().clone()).await.unwrap();
    }

    session.id = Uuid::new_v4().to_string();
    session.available_to_build = available_to_build();

    Json(json!({ "message": "New game session generated!", "session": session.id}))
}
