use axum::{
    body::Bytes,
    extract::MatchedPath,
    http::{HeaderMap, Request},
    response::Response,
    Router,
};
use std::time::Duration;
use tower_http::{classify::ServerErrorsFailureClass, trace::TraceLayer};
use tracing::{info, info_span, Span};

pub fn add_trace_layer(router: Router) -> Router {
    let trace_layer = TraceLayer::new_for_http()
        .make_span_with(|request: &Request<_>| {
            // Log the matched route's path (with placeholders not filled in).
            // Use request.uri() or OriginalUri if you want the real path.
            let matched_path = request.extensions().get::<MatchedPath>().map(MatchedPath::as_str);

            info_span!(
                "http_request",
                method = ?request.method(),
                matched_path,
                some_other_field = tracing::field::Empty,
            )
        })
        .on_request(|_request: &Request<_>, _span: &Span| {
            // info!("[{}] {}", _request.method(), _request.uri());
        })
        .on_response(|_response: &Response, _latency: Duration, _span: &Span| {
            info!(
                "[{}] bytes: {:?}",
                _response.status(),
                _response
                    .headers()
                    .get("content-length")
                    .unwrap_or(&"0".parse().unwrap())
            );
        })
        .on_body_chunk(|_chunk: &Bytes, _latency: Duration, _span: &Span| {
            // ...
        })
        .on_eos(
            |_trailers: Option<&HeaderMap>, _stream_duration: Duration, _span: &Span| {
                // ...
            },
        )
        .on_failure(|_error: ServerErrorsFailureClass, _latency: Duration, _span: &Span| {
            // ...
        });

    router.layer(trace_layer)
}
