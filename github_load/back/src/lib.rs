
#![no_std]
use gstd::{msg,async_main, collections::HashMap , prelude::*,ActorId};
use io::*;

#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));


// 1. Create the main state as a static variable.
static mut STATE:Option<TrafficLightState> = None;



// 2. Create the mutability function for your state.
fn state_mut() -> &'static mut TrafficLightState {

    let state = unsafe {  STATE.as_mut()};

    unsafe { state.unwrap_unchecked() }

}

// Create a Main State
#[derive(Clone, Default)]
pub struct TrafficLightState {
    pub current_light: String,
    pub all_users: HashMap<ActorId, String>,
    pub querys: HashMap<ActorId, Vec<String>>
}

// Create a implementation on State
impl TrafficLightState {
    #[allow(dead_code)]
    async fn firstmethod(&mut self) {}
    #[allow(dead_code)]
    async fn secondmethod(&mut self) { }
}


// 3. Create the init() function of your contract.
#[no_mangle]
extern "C" fn init () {


    let state = TrafficLightState {
        ..Default::default()
    };

    unsafe { STATE = Some(state) };


}


// 4.Create the main() or Async function for your contract.
#[async_main]
async fn main(){

        // We load the input message
        let action: TrafficLightAction = msg::load().expect("Could not load Action");

        // We receive an action from the user and update the state. Example:
        match action {
            TrafficLightAction::Enable => {

                // Create a variable with mutable state.
                let main_state = state_mut();


                main_state.current_light = "Enable".to_string();

                // Update your second field in state.
                main_state.all_users.insert(msg::source(), "Enable".to_string());


                 // Generate your event.
                 let _ =msg::reply(TrafficLightEvent::Enable,0);


            }
            TrafficLightAction::Disable => {


                 // Create a variable with mutable state.
                let main_state = state_mut();

                // Update your first field in state.
                main_state.current_light = "Disable".to_string();

                // Update your second field in state.
                main_state.all_users.insert(msg::source(), "Disable".to_string());


                 // Generate your event.
                 let _ =msg::reply(TrafficLightEvent::Disable,0);
            }
            TrafficLightAction::AddQuery(infoquery) => {

                // Create a variable with mutable state.
                let main_state = state_mut();

                // Update your second field in state.
                main_state.querys.insert(msg::source(), infoquery.clone());


                 // Generate your event.
                 msg::reply(TrafficLightEvent::ReplyQuery(infoquery),0);


            }
        };
    }

        


// 5. Create the state() function of your contract.
#[no_mangle]
extern "C" fn state() {
   
    let state = unsafe { STATE.take().expect("Unexpected error in taking state") };

    msg::reply::<IoTrafficLightState>(state.into(), 0)
    .expect("Failed to encode or reply with `<ContractMetadata as Metadata>::State` from `state()`");
    
}


// Implementation of the From trait for converting CustomStruct to IoCustomStruct
impl From<TrafficLightState> for IoTrafficLightState {

    // Conversion method
    fn from(value: TrafficLightState) -> Self {
        // Destructure the CustomStruct object into its individual fields
        let TrafficLightState {
            current_light,
            all_users,
            querys
        } = value;

        // Perform some transformation on second field, cloning its elements (Warning: Just for HashMaps!!)
        let all_users = all_users.iter().map(|(k, v)| (*k, v.clone())).collect();
        let querys = querys.iter().map(|(k, v)| (*k, v.clone())).collect();
   
        // Create a new IoCustomStruct object using the destructured fields
        Self {
            current_light,
            all_users,
            querys
        }
    }
}