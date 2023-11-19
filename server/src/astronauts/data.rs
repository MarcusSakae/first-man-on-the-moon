use super::Astronaut;
use anarchist_readable_name_generator_lib::readable_name;
use rand::Rng;

/**
 * Building data
 */
pub fn generate_astronauts() -> Vec<Astronaut> {
    // generate 100 astronauts
    let mut astronauts: Vec<Astronaut> = Vec::new();
    for _ in 0..1000 {
        let pascal_name = to_pascal_case(&readable_name());
        let astronaut = Astronaut::new(&pascal_name);
        astronauts.push(astronaut);
    }
    astronauts
}

pub fn astronauts_from_file() -> Vec<Astronaut> {
    let file = "./astronauts.json";
    let contents = std::fs::read_to_string(file).expect("Something went wrong reading the file");
    let astronauts: Vec<Astronaut> = serde_json::from_str(&contents).unwrap();
    astronauts
}

// Creates a random selection of UNIQUE astronauts from the file
pub fn random_selection_from_file() -> Vec<Astronaut> {
    let num_astronauts = 30;
    let all_astronauts = astronauts_from_file();
    let mut rng = rand::thread_rng();
    let mut unique_selected_astronauts: Vec<Astronaut> = Vec::new();
    while unique_selected_astronauts.len() < num_astronauts {
        let random_index = rng.gen_range(0..all_astronauts.len());
        let random_astronaut = &all_astronauts[random_index];
        if !unique_selected_astronauts.contains(random_astronaut) {
            unique_selected_astronauts.push(random_astronaut.clone());
        }
    }
    let astronauts = unique_selected_astronauts
        .iter_mut()
        .enumerate()
        .map(|(index, a)| a.clone().cost(a.stats.sum() * usize::pow(index + 1, 3)))
        .collect();

    astronauts
}

// PascalCase but with spaces, hello_world -> Hello World
fn to_pascal_case(snake_name: &str) -> String {
    let mut pascal_name = String::new();
    for word in snake_name.split("_") {
        let mut chars = word.chars();
        if let Some(first_char) = chars.next() {
            pascal_name.push(first_char.to_ascii_uppercase());
        }
        for c in chars {
            pascal_name.push(c);
        }
        pascal_name.push(' ');
    }
    pascal_name.trim().to_owned()
}
