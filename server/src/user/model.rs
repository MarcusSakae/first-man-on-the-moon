use darkbird::document;
use darkbird::document::RangeField;
use serde::Deserialize;
use serde::Serialize;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct User {
    fullname: String,
}

impl User {
    pub fn new(fullname: &str) -> Self {
        User {
            fullname: fullname.to_owned(),
        }
    }
}

impl document::Document for User {}

impl document::Indexer for User {
    fn extract(&self) -> Vec<String> {
        vec![]
    }
}

impl document::Tags for User {
    fn get_tags(&self) -> Vec<String> {
        vec![]
    }
}

impl document::Range for User {
    fn get_fields(&self) -> Vec<RangeField> {
        vec![]
    }
}

impl document::MaterializedView for User {
    fn filter(&self) -> Option<String> {
        None
    }
}

impl document::FullText for User {
    fn get_content(&self) -> Option<String> {
        None
    }
}
