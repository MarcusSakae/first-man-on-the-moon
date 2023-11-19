use crate::{health_check::health_checker_handler, trace_middleware::add_trace_layer, user::UserData};
use axum::routing::{get, post};
use axum::{Extension, Router};
use darkbird::{Options, Storage, StorageType};
use session::model::SessionInner;
use std::sync::Arc;
use tokio::sync::Mutex;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod astronauts;
mod buildings;
mod health_check;
mod session;
mod trace_middleware;
mod user;
mod lockmacro;

pub type StorageExt = Extension<Arc<Storage<String, UserData>>>;

#[tokio::main]
async fn main() {
    // Init logging
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "server=info,tower_http=debug,axum::rejection=trace".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Init layers
    let state_layer = Extension(Arc::new(Mutex::new(SessionInner::default())));
    let storage_layer = Extension(Arc::new(
        Storage::<String, UserData>::open(Options::new(".", "storage", 1000, StorageType::RamCopies, true))
            .await
            .unwrap(),
    ));

    // Setup routes
    let mut app = Router::new()
        .route("/api", get(health_checker_handler))
        .route("/api/buildings", get(buildings::list))
        .route("/api/buildings/build", post(buildings::build))
        .route("/api/astronauts", get(astronauts::list))
        .route("/api/astronauts/hire", post(astronauts::hire))
        .route("/api/session", get(session::endpoints::get))
        .route("/api/session/generate", get(session::endpoints::generate))
        .route("/api/user/load/:device_id", get(user::endpoints::load))
        .route("/api/user/save/:device_id", post(user::endpoints::save))
        .layer(storage_layer)
        .layer(state_layer);

    app = add_trace_layer(app);

    println!("Starting server on port 8000");
    axum::Server::bind(&"0.0.0.0:8000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
