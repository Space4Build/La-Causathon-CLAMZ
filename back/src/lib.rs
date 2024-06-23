
#![no_std]
use gstd::{msg,async_main, collections::HashMap , prelude::*,ActorId};
use io::*;

#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));


// 1. Create the main state as a static variable.
static mut STATE:Option<AIPipeliningState> = None;



// 2. Create the mutability function for your state.
fn state_mut() -> &'static mut AIPipeliningState {

    let state = unsafe {  STATE.as_mut()};

    unsafe { state.unwrap_unchecked() }

}

// Create a Main State
#[derive(Clone, Default)]
pub struct AIPipeliningState {
    pub current_light: String,
    pub users: Vec<ActorId>,
    pub querys: HashMap<ActorId, Vec<String>>,
    pub current_score: String,
    pub outputs: HashMap<ActorId, Vec<String>>,

}


// Create a implementation on State
impl AIPipeliningState {
  
    async fn validate_actor(&mut self, actor:ActorId)->Result<AIPipeliningEvent,Errors> {
        if self.users.contains(&actor) {
            Ok(AIPipeliningEvent::ActorValid)
        } else {
           return Err(Errors::NotUser)
        }
    }

    async fn register(&mut self)->Result<AIPipeliningEvent,Errors> {
       
        self.users.push(msg::source());

        Ok(AIPipeliningEvent::UserRegistered)
      
    }

    async fn enable(&mut self)->Result<AIPipeliningEvent,Errors> {
        self.current_light = "Enable".to_string();

                Ok(AIPipeliningEvent::Enable)
    }

    async fn disable(&mut self)->Result<AIPipeliningEvent,Errors> {
        self.current_light = "Disable".to_string();

                Ok(AIPipeliningEvent::Disable)
    }

    async fn add_query(&mut self, infoquery:Vec<String>)->Result<AIPipeliningEvent,Errors> {
        self.querys.insert(msg::source(), infoquery.clone());

                Ok(AIPipeliningEvent::ReplyQuery(infoquery))
    }

    async fn add_score(&mut self, scr:String)->Result<AIPipeliningEvent,Errors> {
        self.current_score = scr.to_string();

               Ok(AIPipeliningEvent::ScoreAdded)
    }
    async fn add_output(&mut self, infooutput:Vec<String>)->Result<AIPipeliningEvent,Errors> {
        self.outputs.insert(msg::source(), infooutput.clone());

                Ok(AIPipeliningEvent::ReplyQuery(infooutput))
    }
    
}


// 3. Create the init() function of your contract.
#[no_mangle]
extern "C" fn init () {


    let state = AIPipeliningState {
        ..Default::default()
    };

    unsafe { STATE = Some(state) };


}


// 4.Create the main() or Async function for your contract.
#[async_main]
async fn main(){
        let action: AIPipeliningAction = msg::load().expect("Could not load Action");
        let main_state = state_mut();
        let reply = match action {
            AIPipeliningAction::RegisterUser => {
                main_state.register().await;
               
           }
            AIPipeliningAction::Enable => {
                main_state.enable().await;
                
            }
            AIPipeliningAction::Disable => {
                main_state.disable().await;
                
            }
            AIPipeliningAction::AddQuery(infoquery) => {
                main_state.add_query(infoquery).await;

                
            }
            AIPipeliningAction::AIValidation(actor) => {
                main_state.validate_actor(actor).await;
            }
            AIPipeliningAction::AddScore(scr) => {
                main_state.add_score(scr).await;
               
           }
           AIPipeliningAction::AddOutput(infooutput) => {
            main_state.add_output(infooutput).await;

            
        }
        };

        msg::reply(reply, 0)
        .expect("Failed to encode or reply with `Result<AIEvents, Errors>`");
    }


// 5. Create the state() function of your contract.
#[no_mangle]
extern "C" fn state() {
   
    let state = unsafe { STATE.take().expect("Unexpected error in taking state") };

    msg::reply::<IoAIPipeliningState>(state.into(), 0)
    .expect("Failed to encode or reply with `<ContractMetadata as Metadata>::State` from `state()`");
    
}


// Implementation of the From trait for converting CustomStruct to IoCustomStruct
impl From<AIPipeliningState> for IoAIPipeliningState {

    // Conversion method
    fn from(value: AIPipeliningState) -> Self {
        // Destructure the CustomStruct object into its individual fields
        let AIPipeliningState {
            current_light,
            users,
            querys,
            current_score,
            outputs
        } = value;

        // Perform some transformation on second field, cloning its elements (Warning: Just for HashMaps!!)
        let querys = querys.iter().map(|(k, v)| (*k, v.clone())).collect();
        let outputs = outputs.iter().map(|(k, v)| (*k, v.clone())).collect();
   
        // Create a new IoCustomStruct object using the destructured fields
        Self {
            users,
            current_light,
            querys,
            outputs,
            current_score
        }
    }
}
