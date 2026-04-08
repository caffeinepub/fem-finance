import List "mo:core/List";
import ContactsLib "../lib/contacts";
import Types "../types/contacts";

mixin (
  messages : List.List<Types.ContactMessage>,
) {
  var nextContactId : Nat = 0;

  public func submitContactMessage(input : Types.ContactMessageInput) : async Types.ContactMessage {
    let (msg, newId) = ContactsLib.add(messages, nextContactId, input);
    nextContactId := newId;
    msg;
  };

  public query func getContactMessages() : async [Types.ContactMessage] {
    ContactsLib.listAll(messages);
  };
};
