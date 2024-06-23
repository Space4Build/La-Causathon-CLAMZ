#![no_std]

use gstd::{ prelude::*, ActorId };
use gmeta::{Out,InOut,Metadata};


// 1. Create your own Actions
#[derive(Encode, Decode, TypeInfo,  Clone)]
pub enum TrafficLightAction {
    Enable,
    Disable,
    AddQuery(Vec<String>)
}


// 2. Create your own Events
#[derive(Encode, Decode, TypeInfo)]
pub enum TrafficLightEvent {
    Enable,
    Disable,
    ReplyQuery(Vec<String>)
}

// 3. Create your own Struct
#[derive(Default, Clone, Encode, Decode, TypeInfo)]
pub struct IoTrafficLightState {
    pub current_light: String,
    pub all_users: Vec<(ActorId, String)>,
    pub querys:Vec<(ActorId, Vec<String>)>
}


pub struct ContractMetadata;

// 5. Define the structure of actions, events and state for your metadata.
impl Metadata for ContractMetadata{
     type Init = ();
     type Handle = InOut<TrafficLightAction,TrafficLightEvent>;
     type Others = ();
     type Reply=();
     type Signal = ();
     type State = Out<IoTrafficLightState>;
}