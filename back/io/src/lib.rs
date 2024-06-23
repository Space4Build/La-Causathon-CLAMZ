#![no_std]

use gstd::{ prelude::*, ActorId };
use gmeta::{Out,InOut,Metadata};


// 1. Create your own Actions
#[derive(Encode, Decode, TypeInfo,  Clone)]
pub enum AIPipeliningAction {
    Enable,
    Disable,
    RegisterUser,
    AddQuery(Vec<String>),
    AddScore(String),
    AddOutput(Vec<String>),
    AIValidation(ActorId)
}


// 2. Create your own Events
#[derive(Encode, Decode, TypeInfo)]
pub enum AIPipeliningEvent {
    Enable,
    Disable,
    ReplyQuery(Vec<String>),
    ScoreAdded,
    UserRegistered,
    OutputReceived,
    ActorValid
}

#[derive(Encode, Decode, TypeInfo)]
pub enum Errors {
   NotUser
}

// 3. Create your own Struct
#[derive(Default, Clone, Encode, Decode, TypeInfo)]
pub struct IoAIPipeliningState {
    pub current_light: String,
    pub users: Vec<ActorId>,
    pub querys:Vec<(ActorId, Vec<String>)>,
    pub current_score: String,
    pub outputs:Vec<(ActorId, Vec<String>)>,
}

pub struct ContractMetadata;

// 5. Define the structure of actions, events and state for your metadata.
impl Metadata for ContractMetadata{
     type Init = ();
     type Handle = InOut<AIPipeliningAction,Result<AIPipeliningEvent,Errors>>;
     type Others = ();
     type Reply=();
     type Signal = ();
     type State = Out<IoAIPipeliningState>;
}
