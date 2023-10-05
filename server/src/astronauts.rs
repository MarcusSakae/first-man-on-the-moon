use axum::{response::IntoResponse, Extension, Json};

use crate::session::model::Session;

pub async fn list(Extension(session): Extension<Session>) -> impl IntoResponse {
    let session = session.try_lock();
    if session.is_err() {
        return Json(serde_json::json!({"error": "Could not lock session"}));
    }
    let mut session = session.unwrap();

    let json_response = serde_json::json!([
        {"id":1, "name": "Niel Armstrong"},
        {"id":2, "name": "Buzz Aldrin"},
        {"id":3, "name": "Sally Ride"},
        {"id":4, "name": "Laika"},
    ]);

    println!("Config: {:?}", session);
    session.id = "11111".to_string();

    Json(json_response)
}
