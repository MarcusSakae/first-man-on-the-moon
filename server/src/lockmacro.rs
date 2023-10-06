
macro_rules! lock_session {
    ($session:expr) => {
        $session.try_lock().map_err(|_| {
            return Json(serde_json::json!({"error": "Could not lock session"}));
        })
        .unwrap()
    }
}

pub(crate) use lock_session;